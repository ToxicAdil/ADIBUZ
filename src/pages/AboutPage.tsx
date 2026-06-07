import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CustomCursor from '../components/CustomCursor';
import AboutProcess from '../components/AboutProcess';
import AboutTeam from '../components/AboutTeam';
import WhoWeWorkWith from '../components/WhoWeWorkWith';
import ImpactStatement from '../components/ImpactStatement';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';
import { SEO } from '@/components/SEO';
import { DeferredRender } from '@/components/DeferredRender';

const AboutPage = () => {
  return (
    <div className="min-h-screen adibuz-page selection:bg-primary selection:text-white relative">
      <SEO 
        title="About Adibuz | Our Mission & Team" 
        description="Learn about the team behind Adibuz. We are a premium digital marketing agency focused on strategic AI automation, creative design, and data-driven growth."
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adibuz.com/" },
              { "@type": "ListItem", "position": 2, "name": "About", "item": "https://adibuz.com/about" }
            ]
          })}
        </script>
      </Helmet>
      <CustomCursor />
      
      <SimpleHeader />

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden px-5 pb-12 pt-30 md:px-8 md:pb-16 md:pt-36 lg:min-h-[720px]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.14),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(58,15,99,0.11),transparent_32%)]" />
          <div className="relative z-10 mx-auto grid w-full max-w-[1320px] items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-[720px]"
            >
              <h1 className="adibuz-gradient-text text-[clamp(3.35rem,7.45vw,7.25rem)] font-[950] leading-[0.9] tracking-[-0.058em]">
                Growth systems with premium execution.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="relative lg:pb-0"
            >
              <div className="mb-8 overflow-hidden rounded-[34px] border border-[rgba(58,15,99,0.12)] bg-white/74 p-6 shadow-[0_24px_80px_rgba(22,8,43,0.08)] backdrop-blur-xl md:p-8">
                <div className="relative aspect-[16/10] min-h-[300px] overflow-hidden rounded-[28px] bg-[#12091f] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                  <img
                    src="/images/about-brand-demand-scale.png"
                    alt="Adibuz Method brand demand scale growth visual"
                    width={943}
                    height={579}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <p className="max-w-xl text-base font-semibold leading-relaxed text-[#6f667d] md:text-xl">
                Adibuz helps ambitious brands turn scattered marketing into one connected growth engine: strategy, website, SEO, ads, content, automation, and analytics.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact" className="adibuz-button-primary w-full px-7 sm:w-auto">
                  Book Strategy Call <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/work" className="adibuz-button-secondary w-full px-7 sm:w-auto">
                  View Work
                </Link>
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
