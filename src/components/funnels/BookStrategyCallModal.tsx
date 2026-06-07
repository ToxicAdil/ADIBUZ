import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Loader2, AlertCircle, X, Calendar,
  ArrowRight, ShieldCheck, ChevronLeft,
} from 'lucide-react';
import { supabase } from '@/services/supabase';
import { trackConversionEvent } from '@/lib/tracking';

// ─── Constants ────────────────────────────────────────────────────────────────
const CALENDLY_URL =
  'https://calendly.com/kr6744173/30min?hide_gdpr_banner=1&hide_event_type_details=1&hide_landing_page_details=1&primary_color=3A0F63&text_color=0f172a&background_color=ffffff';

const SUPABASE_EDGE_URL =
  'https://tscqsbhrtfgadbinbpzy.supabase.co/functions/v1/send-booking-email';

const REVENUE_OPTIONS = [
  'Under $10k / mo',
  '$10k – $50k / mo',
  '$50k – $100k / mo',
  '$100k – $500k / mo',
  '$500k+ / mo',
];

const BUDGET_OPTIONS = [
  'Under $1,000 / mo',
  '$1,000 – $5,000 / mo',
  '$5,000 – $15,000 / mo',
  '$15,000+ / mo',
];

type Step = 'calendly' | 'form' | 'success';
type FormState = 'idle' | 'submitting' | 'error';

interface CalendlyPayload {
  event: { uri?: string; start_time?: string };
  invitee: { uri?: string; name?: string; email?: string };
}

interface LeadForm {
  name: string;
  email: string;
  business_name: string;
  website: string;
  revenue_range: string;
  budget_range: string;
  biggest_challenge: string;
}

// ─── Hook: body scroll lock ───────────────────────────────────────────────────
function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [active]);
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function BookStrategyCallModal({
  children,
  sourcePage = 'hero',
}: {
  children: React.ReactNode;
  sourcePage?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('calendly');
  const [calendlyData, setCalendlyData] = useState<CalendlyPayload | null>(null);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [mounted, setMounted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  useScrollLock(isOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Calendly postMessage listener ──
  useEffect(() => {
    if (!isOpen) return;
    const onMessage = (e: MessageEvent) => {
      if (e.data?.event !== 'calendly.event_scheduled') return;
      const payload = e.data.payload as CalendlyPayload;
      setCalendlyData(payload);
      setStep('form');
      // Pre-fill name/email from Calendly if available
      if (formRef.current && payload?.invitee) {
        const nameEl = formRef.current.elements.namedItem('name') as HTMLInputElement | null;
        const emailEl = formRef.current.elements.namedItem('email') as HTMLInputElement | null;
        if (nameEl && payload.invitee.name) nameEl.value = payload.invitee.name;
        if (emailEl && payload.invitee.email) emailEl.value = payload.invitee.email;
      }
      trackConversionEvent('booking_completed', { form_name: 'strategy_call', source_cta: sourcePage });
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [isOpen, sourcePage]);

  const open = useCallback(() => {
    setStep('calendly');
    setCalendlyData(null);
    setFormState('idle');
    setErrorMsg('');
    setIsOpen(true);
    trackConversionEvent('modal_open', { form_name: 'strategy_call', source_cta: sourcePage });
    trackConversionEvent('calendly_open' as any, { form_name: 'strategy_call', source_cta: sourcePage });
  }, [sourcePage]);

  const close = useCallback(() => setIsOpen(false), []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMsg('');
    const fd = new FormData(e.currentTarget);

    // Honeypot
    if (fd.get('hp_field')) { setFormState('idle'); return; }

    const lead: LeadForm = {
      name: (fd.get('name') as string).trim(),
      email: (fd.get('email') as string).trim(),
      business_name: (fd.get('business_name') as string).trim(),
      website: (fd.get('website') as string).trim(),
      revenue_range: fd.get('revenue_range') as string,
      budget_range: fd.get('budget_range') as string,
      biggest_challenge: (fd.get('biggest_challenge') as string).trim(),
    };

    const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
    const referralSource = document.referrer || 'direct';

    try {
      if (!supabase) {
        throw new Error('Booking backend is not configured');
      }

      const { error: dbError } = await supabase.from('strategy_call_leads').insert([{
        ...lead,
        calendly_event_uri: calendlyData?.event?.uri ?? null,
        calendly_invitee_uri: calendlyData?.invitee?.uri ?? null,
        booking_time: calendlyData?.event?.start_time ?? null,
        source_page: sourcePage,
        device_type: deviceType,
        referral_source: referralSource,
      }]);
      if (dbError) throw dbError;

      // Fire & forget email (non-blocking)
      fetch(SUPABASE_EDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          booking_time: calendlyData?.event?.start_time ?? null,
          source_page: sourcePage,
        }),
      }).catch(() => {}); // graceful ignore

      setStep('success');
      trackConversionEvent('lead_created', { form_name: 'strategy_call', source_cta: sourcePage });
      trackConversionEvent('conversion_success', { form_name: 'strategy_call', source_cta: sourcePage });
    } catch (err: any) {
      setFormState('error');
      setErrorMsg(err.message ?? 'Something went wrong. Please try again.');
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-md"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Book a Strategy Call"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={[
              'fixed z-[10000] inset-x-3 sm:inset-x-auto',
              'sm:left-1/2 sm:-translate-x-1/2',
              'top-[50%] -translate-y-1/2',
              step === 'calendly'
                ? 'sm:w-[min(1060px,96vw)] h-[min(750px,94vh)]'
                : 'sm:w-[min(640px,96vw)]',
              'bg-white/95 backdrop-blur-2xl',
              'rounded-[24px] sm:rounded-[32px]',
              'shadow-[0_32px_80px_rgba(58,15,99,0.18),0_2px_8px_rgba(58,15,99,0.08)]',
              'border border-white/60',
              'flex flex-col overflow-hidden',
            ].join(' ')}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                {step === 'form' && (
                  <button
                    onClick={() => setStep('calendly')}
                    className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
                    aria-label="Go back"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  {step === 'calendly' && 'Select a Time'}
                  {step === 'form' && 'Tell Us About Your Business'}
                  {step === 'success' && 'You\'re All Set!'}
                </span>
              </div>
              <button
                onClick={close}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step indicator */}
            {step !== 'success' && (
              <div className="flex items-center gap-2 px-6 pt-3 pb-1 shrink-0">
                {(['calendly', 'form'] as Step[]).map((s, i) => (
                  <React.Fragment key={s}>
                    <div className={`h-1.5 rounded-full transition-all duration-500 ${
                      step === s ? 'w-8 bg-primary' : (s === 'calendly' && step === 'form')
                        ? 'w-8 bg-primary/40' : 'w-8 bg-slate-200'
                    }`} />
                    {i === 0 && <div className="w-3 h-px bg-slate-200" />}
                  </React.Fragment>
                ))}
                <span className="ml-2 text-xs text-slate-400 font-medium">
                  Step {step === 'calendly' ? 1 : 2} of 2
                </span>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">

                {/* ── STEP 1: Calendly ── */}
                {step === 'calendly' && (
                  <motion.div
                    key="calendly"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full w-full"
                  >
                    <iframe
                      src={CALENDLY_URL}
                      width="100%"
                      height="100%"
                      style={{ border: 'none' }}
                      title="Book a Strategy Call with Adibuz"
                      loading="lazy"
                      allow="fullscreen"
                    />
                  </motion.div>
                )}

                {/* ── STEP 2: Qualification Form ── */}
                {step === 'form' && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="p-6 sm:p-8"
                  >
                    {/* Booking confirmed notice */}
                    <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 mb-6">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <p className="text-sm text-emerald-700 font-medium">
                        Your time slot is reserved! Just a few quick questions to personalise your call.
                      </p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
                      {/* Honeypot */}
                      <input type="text" name="hp_field" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label htmlFor="sc-name" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Full Name *</label>
                          <input id="sc-name" name="name" type="text" required
                            defaultValue={calendlyData?.invitee?.name ?? ''}
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                            placeholder="Jane Smith" />
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="sc-email" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Business Email *</label>
                          <input id="sc-email" name="email" type="email" required
                            defaultValue={calendlyData?.invitee?.email ?? ''}
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                            placeholder="jane@company.com" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label htmlFor="sc-biz" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Business Name</label>
                          <input id="sc-biz" name="business_name" type="text"
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                            placeholder="Acme Inc." />
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="sc-web" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Business Website</label>
                          <input id="sc-web" name="website" type="url"
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                            placeholder="https://yoursite.com" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label htmlFor="sc-rev" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Monthly Revenue</label>
                          <select id="sc-rev" name="revenue_range"
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm appearance-none cursor-pointer">
                            <option value="">Select range...</option>
                            {REVENUE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="sc-bud" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Marketing Budget</label>
                          <select id="sc-bud" name="budget_range"
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm appearance-none cursor-pointer">
                            <option value="">Select range...</option>
                            {BUDGET_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="sc-challenge" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Biggest Growth Challenge</label>
                        <textarea id="sc-challenge" name="biggest_challenge" rows={2}
                          className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none text-sm"
                          placeholder="e.g. High customer acquisition cost, low ROAS, scaling past $50k/mo…" />
                      </div>

                      {formState === 'error' && (
                        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-600">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {errorMsg}
                        </div>
                      )}

                      <div className="pt-2 space-y-3">
                        <button type="submit" disabled={formState === 'submitting'}
                          className="w-full bg-primary text-white py-4 rounded-full font-bold text-base shadow-lg shadow-primary/20 hover:bg-[#310A56] hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 group relative overflow-hidden">
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          {formState === 'submitting'
                            ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Confirming…</span></>
                            : <><span>Confirm My Strategy Call</span><ArrowRight className="w-5 h-5" /></>}
                        </button>
                        <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                          <ShieldCheck className="w-4 h-4 text-primary" />
                          <span>100% private & confidential. No spam.</span>
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* ── STEP 3: Success ── */}
                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center py-12 px-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-4 ring-primary/10">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">You're on the calendar!</h3>
                    <p className="text-slate-500 text-base max-w-sm mx-auto mb-8 leading-relaxed">
                      A confirmation email is on its way. Our growth specialist will review your details and prepare a custom strategy before your call.
                    </p>
                    <div className="bg-slate-50 rounded-2xl p-5 w-full max-w-sm mb-8 text-left space-y-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">What to prepare</p>
                      {[
                        'Your current monthly revenue & ad spend',
                        'Top 2–3 growth bottlenecks you\'re facing',
                        'Target markets or audience segments',
                      ].map(item => (
                        <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={close}
                      className="px-8 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors text-sm">
                      Close
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Trigger */}
      <span onClick={open} style={{ display: 'contents' }}>{children}</span>
      {mounted && typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
}
