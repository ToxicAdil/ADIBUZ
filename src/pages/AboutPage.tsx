import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import { BarChart3, ArrowRight } from 'lucide-react';
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
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.adibuz.com/" },
              { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.adibuz.com/about" }
            ]
          })}
        </script>
      </Helmet>
      <CustomCursor />
      
      <SimpleHeader />

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden px-5 pb-12 pt-32 md:px-8 md:pb-18 md:pt-40 lg:min-h-[760px]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.14),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(58,15,99,0.11),transparent_32%)]" />
          <div className="relative z-10 mx-auto grid w-full max-w-[1320px] items-end gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-[720px]"
            >
              <h1 className="adibuz-gradient-text text-[clamp(3.8rem,8.7vw,8.7rem)] font-[950] leading-[0.88] tracking-[-0.065em]">
                Growth systems with premium execution.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="relative lg:pb-8"
            >
              <div className="mb-8 overflow-hidden rounded-[34px] border border-[rgba(58,15,99,0.12)] bg-white/74 p-6 shadow-[0_24px_80px_rgba(22,8,43,0.08)] backdrop-blur-xl md:p-8">
                <div className="relative min-h-[300px] rounded-[28px] bg-[#12091f] p-7 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(168,85,247,0.45),transparent_32%),radial-gradient(circle_at_76%_72%,rgba(109,40,217,0.34),transparent_34%)]" aria-hidden="true" />
                  <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:54px_54px]" aria-hidden="true" />
                  <div className="relative flex h-full min-h-[246px] flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/72">
                        Adibuz Method
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/12">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <p className="text-5xl font-black leading-none tracking-[-0.045em] md:text-6xl">Brand</p>
                      <p className="mt-2 text-5xl font-black leading-none tracking-[-0.045em] text-white/68 md:text-6xl">Demand</p>
                      <p className="mt-2 text-5xl font-black leading-none tracking-[-0.045em] text-white/38 md:text-6xl">Scale</p>
                    </div>
                  </div>
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
        <ImpactStatement />

        {/* 2. OUR TEAM SECTION */}
        <AboutTeam />

        {/* 3. OUR PROCESS */}
        <AboutProcess />

        {/* 4. WHO WE WORK WITH SECTION */}
        <WhoWeWorkWith />
      </main>

      {/* Footer */}
      <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default AboutPage;
