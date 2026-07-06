import React from 'react';
import { motion } from 'motion/react';
import EarbudShowcase from './ui/spatial-product-showcase';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

const AboutAdibuz: React.FC = () => {
  return (
    <section className="py-8 relative overflow-hidden">
      <div className="container-custom">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="premium-card mx-auto max-w-[1060px] rounded-3xl md:rounded-[32px] overflow-hidden relative min-h-[400px] lg:min-h-[600px] p-0"
        >
          <EarbudShowcase />
        </motion.div>


        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
           className="premium-card mx-auto max-w-[1060px] rounded-3xl md:rounded-[32px] mt-16 overflow-hidden relative min-h-[400px] lg:min-h-[600px] p-6 md:p-12 flex flex-col bg-white/40 backdrop-blur-sm"
        >
          <h2 className="adibuz-heading border-b border-[rgba(58,15,99,0.10)] pb-4 w-full text-center mb-2">
            <span className="adibuz-gradient-text">WORK</span>
          </h2>

          <div className="flex-1 flex flex-col lg:flex-row items-start justify-center lg:justify-between gap-4 lg:gap-24 relative z-10 pt-4">
            {/* Text Content - Left Side */}
            <div className="flex-1 w-full lg:max-w-[500px] space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <div className="space-y-4">
                  <span className="adibuz-kicker mx-auto lg:mx-0">Case Study Systems</span>
                  <h2 className="adibuz-heading !text-3xl md:!text-[42px]">
                    Real Results. <span className="adibuz-gradient-text">Real Growth.</span>
                  </h2>
                  <p className="adibuz-subheading max-lg:max-w-lg max-lg:mx-auto">
                    We don’t just build campaigns — we build systems that generate consistent growth. From high-converting funnels to performance-driven ads, every project is designed to deliver real business results.
                  </p>
                </div>
              </div>
            </div>

            {/* Video Box - Square (now slightly wider) */}
            <div className="w-full lg:w-auto flex justify-center lg:mt-10">
              <div className="relative w-full max-w-[320px] md:max-w-[420px] aspect-[16/10] rounded-[24px] overflow-hidden shadow-2xl ring-1 ring-black/5">
                <video
                  src="https://res.cloudinary.com/dtzo88csm/video/upload/v1783368501/From_Klickpin.com-_Try_Cozy_meal_prep_recipes_that_feel_fresh_practical_and_surprisingly_easy_to_try_for_ideas_worth_saving_right_now-pin-id-10752_fvznho.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover"
                />
                
                {/* Subtle Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A0F63]/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/20 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Centered CTA Button */}
          <div className="mt-6 md:mt-8 flex justify-center w-full relative z-20">
            <MagneticButton>
              <button className="adibuz-button-primary px-10 py-4 text-[15px]">
                View Case Studies <ArrowRight className="w-5 h-5" />
              </button>
            </MagneticButton>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutAdibuz;
