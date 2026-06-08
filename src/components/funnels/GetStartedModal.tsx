import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
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

const SERVICES = [
  'SEO',
  'Meta Ads',
  'Google Ads',
  'Web Development',
  'Branding',
  'AI Automation',
  'Social Media Marketing',
  'Full Growth System',
];

export function GetStartedModal({ 
  children, 
  sourceCta = 'nav_get_started',
  openSignal = 0,
}: { 
  children: React.ReactNode, 
  sourceCta?: string,
  openSignal?: number,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      trackConversionEvent('modal_open', { form_name: 'get_started', source_cta: sourceCta });
      // Reset state if reopening after a success
      if (formState === 'success') {
        setFormState('idle');
        setSelectedServices([]);
      }
    }
  };

  React.useEffect(() => {
    if (openSignal > 0) handleOpenChange(true);
  }, [openSignal]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackConversionEvent('form_submit', { form_name: 'get_started', source_cta: sourceCta });
    setFormState('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check (anti-spam)
    if (data.get('website_url_honeypot')) {
      console.warn('Bot detected via honeypot');
      setFormState('error');
      setErrorMessage('Verification failed.');
      return;
    }

    const payload = {
      name: (data.get('name') as string).trim(),
      email: (data.get('email') as string).trim(),
      company: (data.get('company') as string).trim(),
      phone: (data.get('phone') as string).trim(),
      budget: (data.get('budget') as string),
      website: (data.get('website') as string).trim(),
      message: (data.get('message') as string).trim(),
      services: selectedServices,
      source_cta: sourceCta,
    };

    try {
      if (!supabase) {
        throw new Error('Lead backend is not configured');
      }

      const { error } = await supabase.from('cta_leads').insert([payload]);

      if (error) throw error;

      setFormState('success');
      trackConversionEvent('lead_created', { form_name: 'get_started', source_cta: sourceCta, value: payload.budget });
      trackConversionEvent('conversion_success', { form_name: 'get_started', source_cta: sourceCta });
    } catch (err: any) {
      console.error('Lead submission error:', err);
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
                <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Growth System Initiated</h3>
                <p className="text-slate-500 text-lg max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you for reaching out. A growth specialist will review your details and contact you within 24 hours.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
                >
                  Return to Site
                </button>
              </motion.div>
            ) : (
              <>
                <ModalHeader>
                  <ModalTitle>Let's Build Your Growth System</ModalTitle>
                  <ModalDescription>
                    Tell us about your business and we'll create a custom strategy to scale your brand globally.
                  </ModalDescription>
                </ModalHeader>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Honeypot */}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Company Name *</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Services of Interest</label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map(service => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                            selectedServices.includes(service)
                              ? 'bg-primary border-primary text-white shadow-md'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-primary/30 hover:bg-slate-50'
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <div className="space-y-1.5">
                      <label htmlFor="budget" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Monthly Marketing Budget</label>
                      <select
                        id="budget"
                        name="budget"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none cursor-pointer"
                      >
                        <option value="">Select a range...</option>
                        <option value="<$1k">Less than $1,000</option>
                        <option value="$1k-$5k">$1,000 - $5,000</option>
                        <option value="$5k-$10k">$5,000 - $10,000</option>
                        <option value="$10k+">$10,000+</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="website" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Current Website</label>
                      <input
                        id="website"
                        name="website"
                        type="url"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Project Details</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none custom-scrollbar"
                      placeholder="Tell us about your growth goals..."
                    />
                  </div>

                  {formState === 'error' && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full bg-primary text-white px-8 py-4.5 rounded-full text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:bg-[#310A56] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      {formState === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>Request Custom Strategy</span>
                      )}
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-4 font-medium">
                      Your information is 100% secure. We never share your data.
                    </p>
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
