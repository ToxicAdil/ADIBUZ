import React, { lazy, Suspense, memo, useRef, useEffect, useState } from 'react';

import ScrollIndicator from './components/ScrollIndicator';

import { FloatingPurpleShapes } from '@/components/ui/floating-purple-shapes';
import { BackgroundGradientGlow } from '@/components/ui/background-gradient-glow';
import { SimpleHeader } from '@/components/ui/simple-header';
import { SEO } from '@/components/SEO';
import { DeferredRender } from '@/components/DeferredRender';

// ====================================================================
// PERFORMANCE: Lazy-load ALL components that use framer-motion / heavy deps
// ====================================================================
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const InteractiveServices = lazy(() =>
  import('./components/InteractiveServices').then((m) => ({ default: m.InteractiveServices }))
);
const AboutAdibuz = lazy(() => import('./components/AboutAdibuz'));
const AboutPreviewCard = lazy(() =>
  import('./components/AboutPreviewCard').then((m) => ({ default: m.AboutPreviewCard }))
);
const InsightPreviewCard = lazy(() =>
  import('./components/InsightPreviewCard').then((m) => ({ default: m.InsightPreviewCard }))
);
const CircularTestimonials = lazy(() =>
  import('./components/ui/circular-testimonials').then((m) => ({
    default: m.CircularTestimonials,
  }))
);
const GlobalGrowthSection = lazy(() =>
  import('@/components/sections/GlobalGrowthSection').then((m) => ({
    default: m.GlobalGrowthSection,
  }))
);

const LogoCloud = lazy(() =>
  import('./components/ui/logo-cloud-4').then((m) => ({ default: m.LogoCloud }))
);
const Footer = lazy(() =>
  import('./components/ui/footer-section').then((m) => ({ default: m.Footer }))
);
const FAQSection = lazy(() =>
  import('@/components/FAQSection').then((m) => ({ default: m.FAQSection }))
);

import { ServiceDetailSection } from '@/components/ServiceDetailSection';
import { HeroContent } from '@/components/HeroContent';

// Lazy-load Three.js globe — deferred via requestIdleCallback inside globe-hero
const DotGlobeHero = lazy(() =>
  import('@/components/ui/globe-hero').then((m) => ({ default: m.DotGlobeHero }))
);

// ====================================================================
// PERFORMANCE: Detect mobile once
// ====================================================================
const isMobile =
  typeof window !== 'undefined' &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768);

const isLowPowerDevice =
  typeof window !== 'undefined' &&
  isMobile &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4) <= 3 ||
    (navigator.hardwareConcurrency ?? 4) <= 4);

// ====================================================================
// CLOUDINARY VIDEO HELPERS
// Auto-select WebM (smaller) on desktop; use poster JPG on mobile
// ====================================================================
/**
 * Returns an optimised Cloudinary video URL.
 * Applies: WebM format, auto quality, capped width for mobile.
 */
function cloudinaryVideo(publicId: string, mobile = false): string {
  const base = `https://res.cloudinary.com/dtzo88csm/video/upload`;
  const transforms = mobile
    ? `f_webm,q_auto:low,w_480,so_0`
    : `f_webm,q_auto:good,w_800`;
  return `${base}/${transforms}/${publicId}`;
}

/**
 * Returns a Cloudinary poster image URL (first frame, compressed JPG).
 */
function cloudinaryPoster(publicId: string): string {
  return `https://res.cloudinary.com/dtzo88csm/video/upload/f_jpg,q_auto:low,w_640,so_0/${publicId}`;
}

// Video asset definitions
const VIDEOS = {
  marketing: 'v1774899653/marketing_video_yes6gn.mp4',
  social:    'v1774898952/management_video_j9vvld.mp4',
  automation:'v1774897694/automation_video_eevmht.mp4',
  webdev:    'v1774898094/web_dev_video_hoheur.mp4',
  seo:       'v1774897169/seo_video_dgkbor.mp4',
  branding:  'v1774896151/visual_branding_video_vv9gci.mp4',
};

const services = [
  'Web Development',
  'AI Automation',
  'Social Media Marketing',
  'Performance Ads',
  'Lead Generation',
  'Strategic Marketing',
  'SEO Optimization',
  'Data Analytics',
];



const testimonialData = [
  {
    quote:
      'Adibuz helped us improve our online visibility and generate more qualified leads through a structured digital marketing strategy.',
    name: 'Rahul Sharma',
    designation: 'Technology Startup Founder | +142% Qualified Leads',
    src: 'https://res.cloudinary.com/dtzo88csm/image/upload/f_auto,q_auto,w_400,c_fill/v1782219133/WhatsApp_Image_2026-06-11_at_3.04.27_PM_qiiqtn.jpg',
  },
  {
    quote:
      'The Adibuz team strengthened our digital presence through targeted campaigns and data-driven optimization.',
    name: 'Arjun Mehta',
    designation: 'Healthcare Brand Manager | +185% Engagement Growth',
    src: 'https://res.cloudinary.com/dtzo88csm/image/upload/f_auto,q_auto,w_400,c_fill/v1782219127/WhatsApp_Image_2026-06-11_at_3.08.14_PM_ljgmkq.jpg',
  },
  {
    quote:
      'Adibuz streamlined our online presence and helped us attract higher-quality leads through a well-structured marketing strategy.',
    name: 'Emily Carter',
    designation: 'Consulting Firm Director | +210% Website Traffic',
    src: 'https://res.cloudinary.com/dtzo88csm/image/upload/f_auto,q_auto,w_400,c_fill/v1782219121/WhatsApp_Image_2026-06-11_at_3.58.15_PM_nlvfqz.jpg',
  },
  {
    quote:
      'Adibuz developed practical growth strategies that improved conversions and generated measurable business results.',
    name: 'Daniel Foster',
    designation: 'Professional Services Founder | 3.1× Conversion Growth',
    src: 'https://res.cloudinary.com/dtzo88csm/image/upload/f_auto,q_auto,w_400,h_400,c_fill,g_auto:face/v1782219113/WhatsApp_Image_2026-06-11_at_4.02.26_PM_qaq8dp.jpg',
  },
];

// ====================================================================
// PERFORMANCE: LazyVideo — only loads/plays when visible via IO
// Uses WebM source for 60-80% smaller file size vs MP4
// ====================================================================
// PERFORMANCE: LazyVideo - loads near viewport and pauses off-screen.
// Uses WebM source for smaller files and avoids stacked video decoding on phones.
// ====================================================================
const LazyVideo = memo(
  ({
    src,
    poster,
    className,
    style,
    ariaLabel,
  }: {
    src: string;
    poster?: string;
    className?: string;
    style?: React.CSSProperties;
    ariaLabel?: string;
  }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      if (!('IntersectionObserver' in window)) {
        setShouldLoad(true);
        setIsVisible(true);
        return;
      }

      const rootMargin = isLowPowerDevice ? '80px 0px' : isMobile ? '160px 0px' : '360px 0px';
      const observer = new IntersectionObserver(
        ([entry]) => {
          const visible = entry.isIntersecting;
          setIsVisible(visible);
          if (visible) {
            setShouldLoad(true);
          } else {
            video.pause();
          }
        },
        { rootMargin, threshold: 0.08 }
      );

      observer.observe(video);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      const video = videoRef.current;
      if (!video || !shouldLoad) return;

      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      if (video.src !== src) video.src = src;

      const syncPlayback = () => {
        if (isVisible && document.visibilityState === 'visible') {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      };

      syncPlayback();
      video.addEventListener('loadedmetadata', syncPlayback);
      video.addEventListener('canplay', syncPlayback);
      document.addEventListener('visibilitychange', syncPlayback);

      return () => {
        video.removeEventListener('loadedmetadata', syncPlayback);
        video.removeEventListener('canplay', syncPlayback);
        document.removeEventListener('visibilitychange', syncPlayback);
      };
    }, [src, shouldLoad, isVisible]);

    return (
      <div className="w-full h-full">
        <video
          ref={videoRef}
          src={shouldLoad ? src : undefined}
          poster={poster}
          muted
          loop
          playsInline
          preload={shouldLoad && isVisible ? 'metadata' : 'none'}
          className={className}
          style={style}
          aria-label={ariaLabel}
        >
          <track kind="captions" srcLang="en" label="English" default />
        </video>
      </div>
    );
  }
);
LazyVideo.displayName = 'LazyVideo';

const SectionFallback = () => <div style={{ minHeight: '400px' }} />;

const Preloader = !isMobile
  ? lazy(() => import('@/components/ui/preloader').then((m) => ({ default: m.Preloader })))
  : null;

const HOME_PRELOADER_KEY = 'adibuz:home-preloader-shown';

function shouldShowHomePreloader() {
  if (isMobile || typeof window === 'undefined' || window.location.pathname !== '/') return false;

  const hadAppSessionStarted =
    (window as Window & typeof globalThis & { __ADIBUZ_HAD_APP_SESSION_STARTED__?: boolean })
      .__ADIBUZ_HAD_APP_SESSION_STARTED__ === true;
  const hasShownInSession = sessionStorage.getItem(HOME_PRELOADER_KEY) === '1';

  return !hadAppSessionStarted && !hasShownInSession;
}

// --- Main App ---

export default function App() {
  const [showPreloader, setShowPreloader] = useState(shouldShowHomePreloader);
  const heroMotionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showPreloader) {
      sessionStorage.setItem(HOME_PRELOADER_KEY, '1');
    }
  }, [showPreloader]);

  useEffect(() => {
    const node = heroMotionRef.current;
    if (!node) return;

    let raf = 0;
    const updateHero = () => {
      raf = 0;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isPhoneOrTablet = window.innerWidth < 1200 || isMobileUA || isTouchDevice;
      
      if (isPhoneOrTablet) {
        node.style.setProperty('--hero-scale', '1');
        node.style.setProperty('--hero-y', '0px');
        node.style.setProperty('--hero-opacity', '1');
        node.style.setProperty('--hero-blur', '0px');
        return;
      }

      const progress = Math.min(Math.max(window.scrollY / 800, 0), 1);
      node.style.setProperty('--hero-scale', String(1 + progress * 0.35));
      node.style.setProperty('--hero-y', `${progress * 180}px`);
      node.style.setProperty('--hero-opacity', String(1 - progress * 0.85));
      node.style.setProperty('--hero-blur', `${progress * 6}px`);
    };

    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(updateHero);
    };

    updateHero();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white relative adibuz-page">
      <SEO />
      {showPreloader && Preloader && (
        <Suspense fallback={null}>
          <Preloader
            onComplete={() => {
              setShowPreloader(false);
            }}
          />
        </Suspense>
      )}
      <div id="main-app-content" className="opacity-100">
        {!isMobile && (
          <Suspense fallback={null}>
            <CustomCursor />
          </Suspense>
        )}
        {!isMobile && <ScrollIndicator />}
        <SimpleHeader />

        {/* ============================================================
            HERO SECTION
            ============================================================ */}
        <header id="home" className="relative lg:sticky top-0 z-[1] h-screen min-h-[100vh] max-h-[100vh] overflow-hidden">
          {/* Static Background layer */}
          <BackgroundGradientGlow className="absolute inset-0 z-0" />

          {/* Fixed Globe layer (desktop only) */}
          {!isMobile && (
            <Suspense fallback={null}>
              <DotGlobeHero
                className="absolute inset-0 z-[1] pointer-events-none"
                globeRadius={1.3}
              />
            </Suspense>
          )}

          {/* Animating Hero Content layer */}
          <div ref={heroMotionRef} className="adibuz-hero-motion relative z-10 w-full h-full">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <FloatingPurpleShapes mode={isLowPowerDevice ? 'low' : isMobile ? 'mobile' : 'full'} />
              <Suspense
                fallback={
                  <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center pt-20" />
                }
              >
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-[16px]">
                  <HeroContent />
                </div>
              </Suspense>
            </div>
          </div>
        </header>

        {/* ============================================================
            SLIDING PAGE CONTENT
            ============================================================ */}
        <main className="relative z-[10] bg-[#fdfaff] rounded-t-[48px] shadow-[0_-24px_60px_rgba(109,40,217,0.08)]">
          <div
            className="absolute inset-0 z-0 pointer-events-none rounded-t-[48px]"
            style={{
              backgroundImage: `radial-gradient(circle at 15% 50%, rgba(167, 139, 250, 0.12) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(109, 40, 217, 0.08) 0%, transparent 50%)`,
              backgroundAttachment: isMobile ? 'scroll' : 'fixed',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full">
            {/* Expertise / Logo Cloud */}
            <section
              className="pt-16 pb-12 mt-0 overflow-hidden"
              style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 200px' }}
              aria-label="Our Expertise"
            >
              <div className="container-custom">
                <div className="w-full">
                  <h2 className="mb-5 text-center">
                    <span className="block font-medium text-2xl text-slate-500">Our Expertise</span>
                    <span className="font-black text-2xl text-primary tracking-tight md:text-3xl">
                      End-to-End Solutions
                    </span>
                  </h2>
                  <DeferredRender minHeight={80} rootMargin="1200px 0px">
                    <Suspense fallback={<div style={{ minHeight: '80px' }} />}>
                      <LogoCloud services={services} />
                    </Suspense>
                  </DeferredRender>
                </div>
              </div>
            </section>

            <section id="services" aria-label="Our Services">
              <DeferredRender minHeight={640} rootMargin="1200px 0px">
                <Suspense fallback={<SectionFallback />}>
                  <InteractiveServices />
                </Suspense>
              </DeferredRender>
            </section>

            {/* Strategic Marketing */}
            <ServiceDetailSection
              id="strategic-marketing"
              label="ADS • ADS • ADS"
              title="Strategic Marketing"
              description="Ready to scale your brand with data-driven advertising? We craft high-performing campaigns across platforms that maximize ROI and drive consistent growth."
              buttons={['Facebook Ads', 'Google Ads']}
              posterUrl={cloudinaryPoster(VIDEOS.marketing)}
              videoSlot={
                <LazyVideo
                  src={cloudinaryVideo(VIDEOS.marketing, isMobile)}
                  poster={cloudinaryPoster(VIDEOS.marketing)}
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                  ariaLabel="Strategic marketing showcase video"
                />
              }
            />

            {/* Social Media */}
            <ServiceDetailSection
              label="SOCIAL • SOCIAL • SOCIAL"
              title="Social Media"
              description="Build a strong online presence with high-performing social media strategies that engage your audience and drive real business growth."
              buttons={['Instagram', 'LinkedIn', 'Content Strategy']}
              videoRight
              posterUrl={cloudinaryPoster(VIDEOS.social)}
              videoSlot={
                <>
                  <div
                    className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-purple-900/30 to-slate-900/30"
                    style={{ filter: isMobile ? 'none' : 'blur(20px) brightness(0.7)' }}
                    aria-hidden="true"
                  />
                  <LazyVideo
                    src={cloudinaryVideo(VIDEOS.social, isMobile)}
                    poster={cloudinaryPoster(VIDEOS.social)}
                    className="relative w-full h-full object-contain z-10 block"
                    style={{ borderRadius: 'inherit' }}
                    ariaLabel="Social media management showcase video"
                  />
                </>
              }
            />

            {/* Automation */}
            <ServiceDetailSection
              label="AUTOMATE • AUTOMATE • AUTOMATE"
              title="Automation"
              description="Automate repetitive tasks, streamline workflows, and scale your operations efficiently while focusing on what truly matters."
              buttons={['CRM', 'Lead Gen', 'Business Flows']}
              posterUrl={cloudinaryPoster(VIDEOS.automation)}
              videoSlot={
                <LazyVideo
                  src={cloudinaryVideo(VIDEOS.automation, isMobile)}
                  poster={cloudinaryPoster(VIDEOS.automation)}
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                  ariaLabel="AI automation showcase video"
                />
              }
            />

            {/* Web Development */}
            <ServiceDetailSection
              id="web-development"
              label="WEB • WEB • WEB"
              title="Web Development"
              description="Build fast, scalable, and high-converting websites that deliver seamless user experiences and drive real business growth."
              buttons={['Website Development', 'Landing Pages']}
              videoRight
              posterUrl={cloudinaryPoster(VIDEOS.webdev)}
              videoSlot={
                <LazyVideo
                  src={cloudinaryVideo(VIDEOS.webdev, isMobile)}
                  poster={cloudinaryPoster(VIDEOS.webdev)}
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                  ariaLabel="Web development showcase video"
                />
              }
            />

            {/* SEO */}
            <ServiceDetailSection
              id="seo"
              label="SEO • SEO • SEO"
              title="Robust SEO"
              description="Elevate your online presence with data-driven SEO strategies, optimized content, and scalable workflows that drive long-term organic growth."
              buttons={['Keyword Research', 'Content Strategy', 'Analytics']}
              posterUrl={cloudinaryPoster(VIDEOS.seo)}
              videoSlot={
                <LazyVideo
                  src={cloudinaryVideo(VIDEOS.seo, isMobile)}
                  poster={cloudinaryPoster(VIDEOS.seo)}
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                  ariaLabel="SEO optimization showcase video"
                />
              }
            />

            {/* Visual Branding */}
            <ServiceDetailSection
              id="visual-branding"
              label="DESIGN • DESIGN • DESIGN"
              title="Visual Branding"
              description="We craft visually stunning designs that connect with your audience, elevate your brand identity, and drive meaningful engagement."
              buttons={['Social Media', 'Ads', 'Videos']}
              videoRight
              posterUrl={cloudinaryPoster(VIDEOS.branding)}
              videoSlot={
                <LazyVideo
                  src={cloudinaryVideo(VIDEOS.branding, isMobile)}
                  poster={cloudinaryPoster(VIDEOS.branding)}
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                  ariaLabel="Visual branding showcase video"
                />
              }
            />

            {/* Grouped Clients Section */}
            <div id="clients">
              <section
                className="py-8 relative overflow-hidden"
                style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}
                aria-label="Client Success Stories"
              >
                <div className="container-custom">
                  <div className="adibuz-reveal adibuz-reveal-auto premium-card mx-auto max-w-[1060px] rounded-3xl md:rounded-[32px] p-5 md:p-7 lg:py-6 lg:px-10 overflow-hidden">
                    <div className="text-left mb-6 space-y-3 relative z-10">
                      <span className="adibuz-kicker mb-3">Proof of Growth</span>
                      <h2 className="adibuz-heading">
                        Client <span className="adibuz-gradient-text">Success Stories</span>
                      </h2>
                      <p className="adibuz-subheading max-w-2xl">
                        Real results from brands that scaled with Adibuz's AI-driven growth engine.
                      </p>
                    </div>
                    <div className="flex justify-start relative z-10">
                      <DeferredRender minHeight={320} rootMargin="900px 0px">
                        <Suspense fallback={<SectionFallback />}>
                          <CircularTestimonials
                            testimonials={testimonialData}
                            autoplay={true}
                            colors={{
                              name: '#0a0a0a',
                              designation: '#454545',
                              testimony: '#171717',
                              arrowBackground: '#141414',
                              arrowForeground: '#f1f1f7',
                              arrowHoverBackground: '#3A0F63',
                            }}
                            fontSizes={{ name: '22px', designation: '15px', quote: 'clamp(1rem, 1.55vw, 1.18rem)' }}
                          />
                        </Suspense>
                      </DeferredRender>
                    </div>
                    <div
                      className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </section>

              <DeferredRender minHeight={560} rootMargin="900px 0px">
                <Suspense fallback={<SectionFallback />}>
                  <GlobalGrowthSection />
                </Suspense>
              </DeferredRender>

              <DeferredRender minHeight={1280} rootMargin="900px 0px">
                <Suspense fallback={<SectionFallback />}>
                  <AboutAdibuz />
                </Suspense>
              </DeferredRender>

              <div id="insights-preview">
                <DeferredRender minHeight={620} rootMargin="900px 0px">
                  <Suspense fallback={<SectionFallback />}>
                    <InsightPreviewCard />
                  </Suspense>
                </DeferredRender>
              </div>
            </div>

            {/* About Preview Card */}
            <DeferredRender minHeight={520} rootMargin="900px 0px">
              <Suspense fallback={<SectionFallback />}>
                <AboutPreviewCard />
              </Suspense>
            </DeferredRender>

            {/* FAQs Section */}
            <DeferredRender minHeight={560} rootMargin="900px 0px">
              <Suspense fallback={<SectionFallback />}>
                <FAQSection />
              </Suspense>
            </DeferredRender>

            <DeferredRender minHeight={300} rootMargin="900px 0px">
              <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
                <Footer />
              </Suspense>
            </DeferredRender>
          </div>
        </main>
      </div>
    </div>
  );
}
