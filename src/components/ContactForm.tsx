import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/services/supabase';

export function ContactForm() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);

    const name    = (data.get('name')    as string).trim();
    const email   = (data.get('email')   as string).trim();
    const company = (data.get('company') as string).trim();
    const message = (data.get('message') as string).trim();

    // Basic client-side guard (HTML validation handles most cases)
    if (!name || !email || !message) {
      setFormState('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      if (!supabase) {
        throw new Error('Contact backend is not configured');
      }

      const { error } = await supabase
        .from('contact_submissions')
        .insert([{ name, email, company: company || null, message }]);

      if (error) throw error;

      setFormState('success');
      form.reset();
    } catch (err) {
      console.error('Contact form error:', err);
      setFormState('error');
      setErrorMessage(
        'There was a problem sending your message. Please try again or email us at hello@adibuz.com'
      );
    }
  };

  return (
    <div className="premium-card rounded-3xl p-6 md:p-10">
      {/* Screen-reader live region for status announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {formState === 'success' && 'Your message has been sent successfully.'}
        {formState === 'error' && errorMessage}
      </div>

      {formState === 'success' ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center py-12"
          role="status"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" aria-hidden="true" />
          </div>
          <h2 className="adibuz-gradient-text text-2xl font-bold mb-2">Message Sent!</h2>
          <p className="text-[#6f667d]">
            Thank you for reaching out. Our team will get back to you within 24 hours.
          </p>
          <button
            onClick={() => setFormState('idle')}
            className="mt-8 text-[#3A0F63] font-bold hover:underline focus:outline-none focus:underline"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          noValidate
          aria-label="Contact Adibuz form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-[#201a2b]">
                Full Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="name"
                aria-required="true"
                className="adibuz-input px-4 py-3"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-[#201a2b]">
                Email Address <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                aria-required="true"
                className="adibuz-input px-4 py-3"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-bold text-[#201a2b]">
              Company / Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              autoComplete="organization"
              className="adibuz-input px-4 py-3"
              placeholder="Your Company Ltd."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-bold text-[#201a2b]">
              How can we help you? <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              aria-required="true"
              className="adibuz-input px-4 py-3 resize-none"
              placeholder="Tell us about your project, goals, or timeline..."
            />
          </div>

          {formState === 'error' && (
            <div
              role="alert"
              className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={formState === 'submitting'}
            className="adibuz-button-primary w-full px-8 py-4 text-sm disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#3A0F63] focus:ring-offset-2"
          >
            {formState === 'submitting' ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                <span>Sending…</span>
              </>
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>

          <p className="text-xs text-center text-slate-400 mt-4">
            By submitting this form, you agree to our{' '}
            <a href="/privacy-policy" className="underline hover:text-slate-600 transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      )}
    </div>
  );
}
