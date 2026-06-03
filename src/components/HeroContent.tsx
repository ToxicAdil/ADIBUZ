import React, { Suspense } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import MagneticButton from './MagneticButton';
import { BookStrategyCallModal } from '@/components/funnels/BookStrategyCallModal';

interface HeroContentProps {
  heroScale: ReturnType<typeof import('motion/react').useTransform>;
  heroY: ReturnType<typeof import('motion/react').useTransform>;
}

export function HeroContent({ heroScale, heroY }: HeroContentProps) {
  return (
    <motion.div
      style={{ scale: heroScale, y: heroY }}
      className="flex flex-col items-center justify-center w-full h-full relative z-10"
    >
      {/* Hero Content Centered */}
      <div className="flex flex-col items-center justify-center text-center w-full max-w-[960px] mx-auto px-5">
        {/* Main Headline Wrapper */}
        <div className="text-center w-full flex flex-col items-center">
          <motion.p
            className="mb-6 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.035em] text-[#4d5d74]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            Scale Smarter.
          </motion.p>

          <div className="relative w-full flex flex-col items-center">
            <motion.h1
              className="relative z-10 bg-gradient-to-r from-[#6D28D9] via-[#4B1480] to-[#2E0B50] bg-clip-text text-[clamp(3.1rem,6.25vw,6.35rem)] font-[780] leading-[0.94] tracking-[-0.045em] text-transparent md:whitespace-nowrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            >
              Grow Your Brand Faster
            </motion.h1>

            {/* Animated Underline */}
            <motion.div
              className="h-[1.5px] w-full max-w-[72%] md:max-w-[760px] bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent mt-4 mb-8"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.4, scaleX: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
              style={{ transformOrigin: 'center' }}
            />
          </div>
        </div>

        {/* Subtext */}
        <motion.p
          className="adibuz-subheading mx-auto mb-10 w-full max-w-[650px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          We build high-performing marketing systems that drive{' '}
          <span className="text-primary font-bold">real revenue</span>, not just clicks.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-[14px] md:gap-[20px] flex-wrap mt-0 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
        >
          <MagneticButton>
            <BookStrategyCallModal sourcePage="hero">
              <motion.button
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                data-cursor-text="Book"
                className="adibuz-button-primary w-full md:w-auto px-9 py-4 text-[15px]"
              >
                Book a Strategy Call <ArrowRight className="w-5 h-5" />
              </motion.button>
            </BookStrategyCallModal>
          </MagneticButton>

          <MagneticButton>
            <motion.a
              href="/insights"
              whileHover={{ x: 4 }}
              data-cursor-text="Read"
              className="adibuz-button-secondary w-full md:w-auto px-8 py-4 text-[15px]"
            >
              <Sparkles className="w-5 h-5 text-primary" /> View Insights
            </motion.a>
          </MagneticButton>
        </motion.div>
      </div>
    </motion.div>
  );
}
