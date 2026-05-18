import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '@/components/SEO';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#fdfaff] flex flex-col">
      <SEO
        title="404 — Page Not Found | Adibuz"
        description="The page you're looking for doesn't exist. Return to Adibuz and explore our AI marketing, SEO, and web development services."
      />
      <SimpleHeader />

      <main className="flex-1 flex items-center justify-center px-6 py-24">
        {/* Background gradient */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(167,139,250,0.12) 0%, transparent 50%),
                              radial-gradient(circle at 80% 30%, rgba(109,40,217,0.08) 0%, transparent 50%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 404 number */}
            <div className="mb-8">
              <span
                className="block font-black tracking-tighter text-[clamp(6rem,20vw,12rem)] leading-none select-none"
                style={{
                  background: 'linear-gradient(135deg, #3A0F63 0%, #7c3aed 50%, #c084fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                aria-hidden="true"
              >
                404
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Page Not Found
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-md mx-auto">
              The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-[#3A0F63] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#2A0A4A] transition-colors shadow-lg hover:shadow-xl"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white/80 text-slate-700 px-7 py-3.5 rounded-full font-semibold hover:bg-white hover:border-[#3A0F63] hover:text-[#3A0F63] transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Contact Us
              </Link>
            </div>

            {/* Quick links */}
            <div className="mt-14">
              <p className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-widest">
                Popular Pages
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { label: 'Services', to: '/#services' },
                  { label: 'Work', to: '/work' },
                  { label: 'Insights', to: '/insights' },
                  { label: 'About', to: '/about' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-medium hover:border-[#3A0F63] hover:text-[#3A0F63] transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
