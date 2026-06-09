import React, { Suspense } from 'react';
import { motion } from 'motion/react';
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
        
        {/* 1. HERO SECTION */}
        <section className="relative isolate overflow-hidden px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36 lg:min-h-[760px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(124,58,237,0.16),transparent_32%),linear-gradient(180deg,#fffdf8_0%,#f5efff_58%,rgba(251,248,255,0)_100%)]" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-0 top-[43%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden="true" />

          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-8rem)] w-full max-w-[1440px] flex-col justify-center gap-8 md:min-h-[620px]">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="mx-auto max-w-[15ch] bg-gradient-to-r from-[#5b1794] via-[#37105f] to-[#8b45e6] bg-clip-text text-[clamp(4.4rem,17vw,15.5rem)] font-[950] uppercase leading-[0.78] tracking-[-0.075em] text-transparent drop-shadow-[0_26px_46px_rgba(58,15,99,0.16)] sm:max-w-none sm:whitespace-nowrap">
                About Us
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
              className="mx-auto w-full max-w-5xl"
            >
              <div className="mx-auto mt-16 max-w-3xl text-center md:mt-20">
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
              </div>
            </motion.div>
          </div>
        </section>

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

