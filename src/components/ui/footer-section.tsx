'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, LinkedinIcon } from 'lucide-react';
import AdibuzLogo from '@/components/AdibuzLogo';

export function Footer() {
  return (
    <footer className="relative w-full border-t border-[rgba(58,15,99,0.10)] bg-white/75 backdrop-blur-xl px-5 py-10 md:px-8 md:py-12">
      <div
        className="absolute top-0 left-1/2 h-px w-1/2 max-w-md -translate-x-1/2 rounded-full blur"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(58,15,99,0.35), transparent)' }}
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <div className="flex w-full flex-col items-center gap-7 border-b border-[rgba(58,15,99,0.10)] pb-8 md:pb-10">
          <AdibuzLogo height={74} />

          <div className="flex w-full flex-col items-center gap-5 md:flex-row md:justify-center md:gap-8">
            <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center">
              <a href="/privacy-policy" className="inline-flex min-h-5 items-center text-sm font-semibold leading-none text-[#5f6f88] transition-colors hover:text-[#3A0F63]">
                Privacy Policy
              </a>
              <a href="/terms" title="Adibuz Terms of Use" className="inline-flex min-h-5 items-center text-sm font-semibold leading-none text-[#5f6f88] transition-colors hover:text-[#3A0F63]">
                Terms of Use
              </a>
              <Link
                to="/cookie-preferences"
                id="cookie-preferences-btn"
                aria-label="Cookie preferences page"
                title="Cookie preferences page"
                className="inline-flex min-h-5 min-w-0 items-center border-none bg-transparent p-0 text-sm font-semibold leading-none text-[#5f6f88] transition-colors hover:text-[#3A0F63]"
                style={{ cursor: 'pointer' }}
              >
                Cookie Preferences
              </Link>
            </nav>

            <a
              href="mailto:hello@adibuz.com"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(58,15,99,0.14)] bg-white/80 px-5 text-sm font-bold text-[#45698f] shadow-sm transition-all hover:bg-white hover:text-[#3A0F63] hover:shadow-md"
            >
              hello@adibuz.com
            </a>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 items-center gap-5 pt-7 text-center md:grid-cols-[1fr_auto_1fr]">
          <p className="text-sm font-semibold text-[#7b98b8] md:text-left">
            &copy; {new Date().getFullYear()} Adibuz. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/adibuz_agency/"
              aria-label="Follow Adibuz on Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(58,15,99,0.10)] bg-white/70 text-[#7b98b8] transition-colors hover:text-[#3A0F63]"
            >
              <InstagramIcon className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="https://x.com/Adibuz_agency"
              aria-label="Follow Adibuz on X (Twitter)"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(58,15,99,0.10)] bg-white/70 text-[#7b98b8] transition-colors hover:text-[#3A0F63]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/adibuz"
              aria-label="Follow Adibuz on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(58,15,99,0.10)] bg-white/70 text-[#7b98b8] transition-colors hover:text-[#3A0F63]"
            >
              <LinkedinIcon className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>

          <div className="hidden md:block" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
