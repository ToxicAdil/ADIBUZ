import React, { lazy, Suspense, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';

const BookStrategyCallModal = lazy(() =>
  import('@/components/funnels/BookStrategyCallModal').then((m) => ({
    default: m.BookStrategyCallModal,
  }))
);

interface HeroContentProps {
  className?: string;
}

function LazyBookStrategyCall({ children }: { children: React.ReactNode }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [openSignal, setOpenSignal] = useState(0);

  const open = () => {
    setShouldLoad(true);
    setOpenSignal((value) => value + 1);
  };

  if (!shouldLoad) {
    return (
      <span onClick={open} style={{ display: 'contents' }}>
        {children}
      </span>
    );
  }

  return (
    <Suspense fallback={<span style={{ display: 'contents' }}>{children}</span>}>
      <BookStrategyCallModal sourcePage="hero" openSignal={openSignal}>
        {children}
      </BookStrategyCallModal>
    </Suspense>
  );
}

export function HeroContent({ className = '' }: HeroContentProps) {
  return (
    <div className={`adibuz-hero-content flex flex-col items-center justify-center w-full h-full relative z-10 ${className}`}>
      <div className="flex flex-col items-center justify-center text-center w-full max-w-[960px] mx-auto px-5">
        <div className="text-center w-full flex flex-col items-center">
          <p className="adibuz-hero-sub mb-6 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.035em] text-[#4d5d74]">
            Scale Smarter.
          </p>

          <div className="relative w-full flex flex-col items-center">
            <h1 className="adibuz-hero-title relative z-10 bg-gradient-to-r from-[#6D28D9] via-[#4B1480] to-[#2E0B50] bg-clip-text text-[clamp(3.1rem,6.25vw,6.35rem)] font-[780] leading-[0.94] tracking-[-0.045em] text-transparent md:whitespace-nowrap">
              Grow Your Brand Faster
            </h1>

            <div className="adibuz-hero-underline h-[1.5px] w-full max-w-[72%] md:max-w-[760px] bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent mt-4 mb-8" />
          </div>
        </div>

        <p className="adibuz-hero-copy adibuz-subheading mx-auto mb-10 w-full max-w-[650px]">
          We build high-performing marketing systems that drive{' '}
          <span className="text-primary font-bold">real revenue</span>, not just clicks.
        </p>

        <div className="adibuz-hero-actions flex flex-col md:flex-row items-center justify-center gap-[14px] md:gap-[20px] flex-wrap mt-0 w-full">
          <MagneticButton>
            <LazyBookStrategyCall>
              <button
                data-cursor-text="Book"
                className="adibuz-button-primary w-full md:w-auto px-9 py-4 text-[15px] hover:scale-[1.03] transition-transform duration-200"
              >
                Book a Strategy Call <ArrowRight className="w-5 h-5" />
              </button>
            </LazyBookStrategyCall>
          </MagneticButton>

          <MagneticButton>
            <a
              href="/insights"
              data-cursor-text="Read"
              className="adibuz-button-secondary w-full md:w-auto px-8 py-4 text-[15px] hover:translate-x-1 transition-transform duration-200"
            >
              <Sparkles className="w-5 h-5 text-primary" /> View Insights
            </a>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
