import React, { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';
import AboutProcess from '../components/AboutProcess';
import AboutTeam from '../components/AboutTeam';
import WhoWeWorkWith from '../components/WhoWeWorkWith';
import ImpactStatement from '../components/ImpactStatement';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';
import { JsonLd, SEO } from '@/components/SEO';
import { DeferredRender } from '@/components/DeferredRender';

const AboutPage = () => {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen adibuz-page selection:bg-primary selection:text-white relative">
      <SEO 
        title="About Adibuz | Our Mission & Team" 
        description="Learn about the team behind Adibuz. We are a premium digital marketing agency focused on strategic AI automation, creative design, and data-driven growth."
      />
      <JsonLd
        id="breadcrumb-about"
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.adibuz.com/' },
            { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.adibuz.com/about' },
          ],
        }}
      />
      <CustomCursor />
      
      <SimpleHeader />

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* 1. HERO SECTION (CINEMATIC) */}
        <motion.section 
          style={{ scale: heroScale }}
          className="relative w-full min-h-[70vh] md:min-h-screen bg-transparent overflow-hidden flex flex-col items-center justify-center transform-gpu origin-center"
        >
          {/* BIG TEXT (Layer 2) */}
          <motion.div 
            style={{ opacity: textOpacity }}
            className="relative z-10 w-full flex justify-center items-center pointer-events-none mt-8 md:mt-12"
          >
            <div className="relative inline-block px-6">
              {/* Blur Glow duplicate layer */}
              <motion.span
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{ opacity: 0.6, filter: "blur(30px)" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 text-[13vw] md:text-[12.5vw] adibuz-gradient-text leading-none tracking-[-0.04em] select-none whitespace-nowrap pointer-events-none drop-shadow-[0_8px_24px_rgba(58,15,99,0.08)] drop-shadow-[0_0_30px_rgba(124,58,237,0.35)]"
                style={{
                  fontFamily: '"Syncopate", sans-serif',
                  fontWeight: 700,
                  transform: 'scaleX(1.15) scaleY(0.95)',
                  transformOrigin: 'center'
                }}
                aria-hidden="true"
              >
                ABOUT US
              </motion.span>
              
              {/* Main clear gradient layer */}
              <motion.h1 
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-[13vw] md:text-[12.5vw] adibuz-gradient-text leading-none tracking-[-0.04em] select-none whitespace-nowrap relative z-10 opacity-90 drop-shadow-[0_8px_24px_rgba(58,15,99,0.08)] drop-shadow-[0_0_30px_rgba(124,58,237,0.35)]"
                style={{
                  fontFamily: '"Syncopate", sans-serif',
                  fontWeight: 700,
                  transform: 'scaleX(1.15) scaleY(0.95)',
                  transformOrigin: 'center'
                }}
              >
                ABOUT US
              </motion.h1>
            </div>
          </motion.div>

          {/* Subtext & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4, ease: "easeOut" }}
            className="relative z-20 mx-auto mt-20 max-w-3xl text-center px-5 md:mt-28"
          >
            <p className="text-[clamp(1.25rem,2.4vw,2.15rem)] font-[800] leading-[1.12] tracking-[-0.03em] text-[#251033]">
              We build connected growth systems for ambitious brands.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/contact" className="adibuz-button-primary w-full px-7 sm:w-auto">
                Book Strategy Call <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/work" className="adibuz-button-secondary w-full px-7 sm:w-auto">
                View Work
              </Link>
            </div>
          </motion.div>

        </motion.section>

        {/* 1.5 IMPACT STATEMENT */}
        <DeferredRender minHeight={360} rootMargin="1000px 0px">
          <ImpactStatement />
        </DeferredRender>

        {/* 2. OUR TEAM SECTION */}
        <DeferredRender minHeight={560} rootMargin="1000px 0px">
          <AboutTeam />
        </DeferredRender>

        {/* 3. OUR PROCESS */}
        <DeferredRender minHeight={780} rootMargin="1000px 0px">
          <AboutProcess />
        </DeferredRender>

        {/* 4. WHO WE WORK WITH SECTION */}
        <DeferredRender minHeight={480} rootMargin="1000px 0px">
          <WhoWeWorkWith />
        </DeferredRender>
      </main>

      {/* Footer */}
      <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default AboutPage;

