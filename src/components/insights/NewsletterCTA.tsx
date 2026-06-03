import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { insightService } from '../../services/insightService';

export function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      await insightService.subscribeNewsletter(email);
      setStatus('success');
      setMessage('Welcome aboard. You are subscribed.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="relative z-10 py-14 md:py-24">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[32px] border border-[#6D28D9]/20 bg-[linear-gradient(135deg,#4A1278_0%,#3A0F63_48%,#2E1065_100%)] px-6 py-12 text-center shadow-[0_28px_90px_rgba(58,15,99,0.24)] md:px-12 md:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.24),transparent_46%)]" aria-hidden="true" />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/70">
              Weekly strategy notes
            </span>
            <h2 className="mt-6 text-3xl font-black tracking-tight text-white md:text-5xl">
              Stay ahead of the growth curve.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-white/66 md:text-lg">
              Receive concise insights on AI, search, funnels, and digital strategy. Built for founders and marketing operators.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-lg">
              <div className="grid gap-3 rounded-[24px] border border-white/10 bg-white/8 p-2 sm:grid-cols-[1fr_auto]">
                <input
                  type="email"
                  required
                  disabled={status === 'loading' || status === 'success'}
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-h-12 rounded-[18px] bg-transparent px-4 text-sm font-semibold text-white outline-none placeholder:text-white/42 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[18px] bg-white px-5 text-sm font-black text-primary transition-colors hover:bg-[#f4ecff] disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <span className="h-5 w-5 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                  ) : (
                    <>Subscribe <Send className="h-4 w-4" /></>
                  )}
                </button>
              </div>

              {status === 'success' && (
                <p className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" /> {message}
                </p>
              )}
              {status === 'error' && (
                <p className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-red-300">
                  <AlertCircle className="h-4 w-4" /> {message}
                </p>
              )}
            </form>

            <p className="mt-5 text-xs font-semibold text-white/38">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
