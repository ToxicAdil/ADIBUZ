import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from '@/components/ui/modal';
import { supabase } from '@/services/supabase';
import { trackConversionEvent } from '@/lib/tracking';

export function FreeAuditModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      trackConversionEvent('modal_open', { form_name: 'free_audit', source_cta: 'work_page' });
      if (formState === 'success') setFormState('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackConversionEvent('form_submit', { form_name: 'free_audit', source_cta: 'work_page' });
    setFormState('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get('website_url_honeypot')) {
      console.warn('Bot detected via honeypot');
      setFormState('error');
      setErrorMessage('Verification failed.');
      return;
    }

    const payload = {
      name: (data.get('name') as string).trim(),
      email: (data.get('email') as string).trim(),
      website: (data.get('website') as string).trim(),
      industry: (data.get('industry') as string).trim(),
      revenue_range: (data.get('revenue_range') as string),
      main_challenge: (data.get('main_challenge') as string).trim(),
      goals: (data.get('goals') as string).trim(),
    };

    try {
      const { error } = await supabase.from('audit_requests').insert([payload]);

      if (error) throw error;

      setFormState('success');
      trackConversionEvent('lead_created', { form_name: 'free_audit', source_cta: 'work_page' });
      trackConversionEvent('conversion_success', { form_name: 'free_audit', source_cta: 'work_page' });
    } catch (err: any) {
      console.error('Audit request error:', err);
      setFormState('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={handleOpenChange}>
      <ModalTrigger asChild>
        {children}
      </ModalTrigger>

      <AnimatePresence>
        {isOpen && (
          <ModalContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16 px-4"
              >
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Audit Requested Successfully</h3>
                <p className="text-slate-500 text-lg max-w-md mx-auto mb-8 leading-relaxed">
                  Our growth engineers are analyzing your website. Expect a comprehensive strategy report in your inbox within 24 hours.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <>
                <ModalHeader>
                  <ModalTitle className="text-3xl">Request Your Free Growth Audit</ModalTitle>
                  <ModalDescription className="text-base">
                    Discover hidden revenue bottlenecks and actionable scaling strategies tailored specifically for your brand.
                  </ModalDescription>
                </ModalHeader>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <input type="text" name="website_url_honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Business Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="website" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Website URL *</label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      placeholder="https://yourbrand.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="industry" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Industry</label>
                      <input
                        id="industry"
                        name="industry"
                        type="text"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="e.g., E-commerce, SaaS, Healthcare"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="revenue_range" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Monthly Revenue</label>
                      <select
                        id="revenue_range"
                        name="revenue_range"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none cursor-pointer"
                      >
                        <option value="">Select range...</option>
                        <option value="<$10k">Under $10k</option>
                        <option value="$10k-$50k">$10k - $50k</option>
                        <option value="$50k-$100k">$50k - $100k</option>
                        <option value="$100k+">$100k+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="main_challenge" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Biggest Marketing Challenge</label>
                    <textarea
                      id="main_challenge"
                      name="main_challenge"
                      rows={2}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none custom-scrollbar"
                      placeholder="e.g., High CAC, low conversion rate, scaling past $50k..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="goals" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Primary Goal for Next 6 Months</label>
                    <input
                      id="goals"
                      name="goals"
                      type="text"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      placeholder="Double MRR, reduce CPA by 20%..."
                    />
                  </div>

                  {formState === 'error' && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-4 flex flex-col gap-4">
                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full bg-primary text-white px-8 py-4.5 rounded-full text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:bg-[#310A56] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      {formState === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Initializing Audit...</span>
                        </>
                      ) : (
                        <span>Start My Free Audit</span>
                      )}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-medium">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span>Enterprise-grade security. 100% confidential.</span>
                    </div>
                  </div>
                </form>
              </>
            )}
          </ModalContent>
        )}
      </AnimatePresence>
    </Modal>
  );
}
