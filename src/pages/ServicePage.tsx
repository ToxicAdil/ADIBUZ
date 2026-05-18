import React, { lazy, Suspense, memo, useRef, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';
import { SEO } from '@/components/SEO';
import { ServiceDetailSection } from '@/components/ServiceDetailSection';
import { BackgroundGradientGlow } from '@/components/ui/background-gradient-glow';
import { FadeInUp } from '@/lib/animations';

const LazyVideo = memo(
  ({
    src,
    className,
    style,
    ariaLabel,
  }: {
    src: string;
    className?: string;
    style?: React.CSSProperties;
    ariaLabel?: string;
  }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          const video = videoRef.current;
          if (!video) return;
          if (entry.isIntersecting) {
            if (!video.src) video.src = src;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        },
        { rootMargin: '200px 0px', threshold: 0.01 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [src]);

    return (
      <div ref={containerRef} className="w-full h-full">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
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

// Cloudinary helpers
function cloudinaryVideo(publicId: string): string {
  return `https://res.cloudinary.com/dtzo88csm/video/upload/f_webm,q_auto:good,w_800/${publicId}`;
}

function cloudinaryPoster(publicId: string): string {
  return `https://res.cloudinary.com/dtzo88csm/video/upload/f_jpg,q_auto:low,w_640,so_0/${publicId}`;
}

const VIDEOS = {
  marketing: 'v1774899653/marketing_video_yes6gn.mp4',
  social:    'v1774898952/management_video_j9vvld.mp4',
  automation:'v1774897694/automation_video_eevmht.mp4',
  webdev:    'v1774898094/web_dev_video_hoheur.mp4',
  seo:       'v1774897169/seo_video_dgkbor.mp4',
  branding:  'v1774896151/visual_branding_video_vv9gci.mp4',
};

const SERVICES_MAP: Record<string, any> = {
  'strategic-marketing': {
    label: "ADS • ADS • ADS",
    title: "Professional Strategic Marketing & Advertising Services",
    description: "Ready to scale your brand with data-driven advertising? We craft high-performing campaigns across platforms that maximize ROI and drive consistent growth.",
    buttons: ['Facebook Ads', 'Google Ads'],
    videoId: VIDEOS.marketing,
    videoRight: false,
    content: (
      <div className="space-y-6 text-slate-600 text-lg leading-relaxed mt-8 md:mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Data-Driven Campaigns That Drive Real Revenue</h2>
        <p>In today's highly competitive digital landscape, generic advertising simply doesn't cut it. As a leading <strong>AI marketing agency</strong>, Adibuz specializes in constructing multi-channel marketing campaigns engineered for maximum return on investment (ROI). Our strategic marketing services go far beyond simple media buying; we architect end-to-end customer acquisition systems designed to scale your business sustainably.</p>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-10">Advanced Audience Segmentation & Paid Advertising</h2>
        <p>We leverage advanced data analytics and machine learning algorithms to identify your ideal customer profiles. By utilizing robust audience segmentation, we ensure your ad spend is directed exclusively at high-intent users. Whether we are managing complex <strong>Google Ads</strong> search campaigns, high-converting <strong>Facebook & Instagram Ads</strong>, or B2B <strong>LinkedIn strategies</strong>, our focus remains strictly on performance metrics that impact your bottom line—such as Cost Per Acquisition (CPA) and Lifetime Value (LTV).</p>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-10">Conversion Funnel Optimization</h2>
        <p>Driving traffic is only half the battle. Our marketing experts meticulously optimize every touchpoint in your conversion funnel. From crafting compelling ad creatives and persuasive copywriting to designing high-converting landing pages, we eliminate friction in the user journey. By integrating <strong>AI-driven insights</strong> and continuous A/B testing, we dynamically adjust strategies in real-time, ensuring your brand positioning remains dominant and your lead generation efforts are consistently scalable.</p>
      </div>
    )
  },
  'social-media': {
    label: "SOCIAL • SOCIAL • SOCIAL",
    title: "Expert Social Media Management & Growth Services",
    description: "Build a strong online presence with high-performing social media strategies that engage your audience and drive real business growth.",
    buttons: ['Instagram', 'LinkedIn', 'Content Strategy'],
    videoId: VIDEOS.social,
    videoRight: true,
    content: (
      <div className="space-y-6 text-slate-600 text-lg leading-relaxed mt-8 md:mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Building Culturally Relevant Digital Communities</h2>
        <p>Social media is no longer just a digital billboard; it is the heartbeat of modern brand identity. At Adibuz, our expert social media management services are designed to transform passive scrollers into active, loyal brand advocates. We craft bespoke <strong>content strategies</strong> that deeply resonate with your target demographic, ensuring your brand voice is authentic, authoritative, and perfectly aligned with current digital trends.</p>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-10">Algorithmic Growth & Viral Content Creation</h2>
        <p>Navigating the complex algorithms of platforms like TikTok, Instagram Reels, and LinkedIn requires both creative brilliance and technical precision. Our team specializes in <strong>digital storytelling</strong> and viral content creation. By analyzing engagement metrics, watch times, and algorithmic behaviors, we produce highly shareable content—from short-form vertical videos to high-value thought leadership carousels. This relentless focus on organic engagement maximizes your brand awareness without relying solely on paid amplification.</p>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-10">Social Listening & Audience Retention</h2>
        <p>We actively monitor brand sentiment through advanced <strong>social listening</strong> tools, allowing us to pivot strategies instantly based on real-time audience feedback. By fostering genuine community building and strategic influencer partnerships, we create a network effect that dramatically improves audience retention. When you partner with Adibuz, your social media presence becomes a powerful, revenue-generating engine that consistently builds trust and authority in your industry.</p>
      </div>
    )
  },
  'automation': {
    label: "AUTOMATE • AUTOMATE • AUTOMATE",
    title: "AI Workflow Automation & Business Efficiency Solutions",
    description: "Automate repetitive tasks, streamline workflows, and scale your operations efficiently while focusing on what truly matters.",
    buttons: ['CRM', 'Lead Gen', 'Business Flows'],
    videoId: VIDEOS.automation,
    videoRight: false,
    content: (
      <div className="space-y-6 text-slate-600 text-lg leading-relaxed mt-8 md:mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Scaling Operations Through Intelligent Systems</h2>
        <p>In the modern business era, manual data entry and repetitive administrative tasks are the ultimate bottlenecks to growth. Adibuz delivers enterprise-grade <strong>AI workflow automation</strong> solutions that drastically reduce operational friction. We analyze your existing business logic and deploy intelligent systems that connect your disparate software stacks, transforming siloed data into synchronized, highly efficient automated pipelines.</p>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-10">CRM Integrations & Automated Lead Nurturing</h2>
        <p>A fast response time is critical for converting modern consumers. We specialize in deep <strong>CRM integrations</strong> (such as Salesforce, HubSpot, and GoHighLevel) combined with custom API webhooks. By deploying sophisticated Zapier and Make.com alternatives, we engineer automated lead nurturing sequences. From the moment a prospect submits a form, our systems can trigger personalized email campaigns, SMS follow-ups, and internal team notifications—guaranteeing zero lead leakage and maximizing your sales conversion rates.</p>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-10">AI Chatbot Deployment & Operational Efficiency</h2>
        <p>Elevate your customer service and pre-sales qualification by integrating advanced generative AI. We build and deploy custom <strong>AI chatbots</strong> trained specifically on your company's knowledge base. These intelligent agents handle 24/7 customer inquiries, qualify inbound leads dynamically, and book appointments directly to your calendar. By reducing manual tasks and minimizing human error, our automation services empower your core team to focus entirely on high-impact, revenue-generating activities.</p>
      </div>
    )
  },
  'web-development': {
    label: "WEB • WEB • WEB",
    title: "High-Performance Website Development & Web Design",
    description: "Build fast, scalable, and high-converting websites that deliver seamless user experiences and drive real business growth.",
    buttons: ['Website Development', 'Landing Pages'],
    videoId: VIDEOS.webdev,
    videoRight: true,
    content: (
      <div className="space-y-6 text-slate-600 text-lg leading-relaxed mt-8 md:mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Scalable Architecture for Modern Brands</h2>
        <p>Your website is the digital headquarters of your business, and its performance directly dictates your online success. Adibuz engineers blazing-fast, highly secure, and visually stunning web applications. Utilizing modern Javascript frameworks like <strong>React, Vite, and Next.js</strong>, we build scalable architectures that offer unparalleled speed and reliability. We don't just build websites; we develop enterprise-grade digital experiences that captivate users and crush the competition.</p>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-10">Core Web Vitals & Technical SEO Excellence</h2>
        <p>A beautiful design is useless if it takes too long to load. Our development team is obsessed with Google's <strong>Core Web Vitals</strong>. We implement rigorous performance budgets, lazy loading protocols, and dynamic asset optimization to ensure your site achieves near-perfect Lighthouse scores. This flawless technical foundation not only provides a frictionless user experience but also heavily boosts your rankings in search engine results through inherent technical SEO advantages.</p>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-10">Conversion Rate Optimization (CRO) & Mobile Responsiveness</h2>
        <p>Every pixel we push is designed to convert. Through meticulous <strong>Conversion Rate Optimization (CRO)</strong> and custom UI/UX design, we map out intuitive user journeys that guide visitors seamlessly toward purchasing decisions. Furthermore, our development is strictly mobile-first. We guarantee absolute mobile responsiveness across all devices and screen sizes, ensuring your landing pages, e-commerce solutions, and digital storefronts perform flawlessly wherever your audience chooses to browse.</p>
      </div>
    )
  },
  'seo': {
    label: "SEO • SEO • SEO",
    title: "Advanced Search Engine Optimization (SEO) Agency Services",
    description: "Elevate your online presence with data-driven SEO strategies, optimized content, and scalable workflows that drive long-term organic growth.",
    buttons: ['Keyword Research', 'Content Strategy', 'Analytics'],
    videoId: VIDEOS.seo,
    videoRight: false,
    content: (
      <div className="space-y-6 text-slate-600 text-lg leading-relaxed mt-8 md:mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Dominating Search Engine Results Pages (SERPs)</h2>
        <p>Organic traffic is the most scalable, high-margin acquisition channel available to modern businesses. However, achieving page-one rankings requires far more than basic keyword stuffing. As a premier SEO agency, Adibuz deploys advanced <strong>Search Engine Optimization</strong> frameworks designed to outrank your toughest competitors. We begin with comprehensive technical SEO audits to identify and repair crawlability issues, indexation errors, and site architecture flaws that are holding your rankings back.</p>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-10">On-Page Optimization & LSI Keyword Strategies</h2>
        <p>Google's algorithm prioritizes deep, topical authority. Our content strategy team performs exhaustive keyword research to uncover high-intent, low-competition search queries. We then execute meticulous <strong>on-page optimization</strong> across your entire site structure. By naturally integrating Latent Semantic Indexing (LSI) keywords and structuring your content with perfectly nested heading tags (H1, H2, H3), we signal profound relevance to search engine crawlers, driving massive spikes in highly targeted organic traffic.</p>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-10">High-Authority Link Building & Content Gap Analysis</h2>
        <p>Off-page signals remain a critical ranking factor. We execute white-hat, high-authority link building campaigns that boost your domain's credibility and trust flow. Simultaneously, we perform continuous <strong>content gap analysis</strong> against your primary competitors to ensure your website answers every question your customers are searching for. From local SEO mastery to complex algorithmic recovery, Adibuz delivers long-term organic growth that compounds over time.</p>
      </div>
    )
  },
  'visual-branding': {
    label: "DESIGN • DESIGN • DESIGN",
    title: "Premium Visual Branding & Brand Identity Design",
    description: "We craft visually stunning designs that connect with your audience, elevate your brand identity, and drive meaningful engagement.",
    buttons: ['Social Media', 'Ads', 'Videos'],
    videoId: VIDEOS.branding,
    videoRight: true,
    content: (
      <div className="space-y-6 text-slate-600 text-lg leading-relaxed mt-8 md:mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Crafting Compelling Brand Narratives</h2>
        <p>In a saturated digital market, aesthetic mediocrity is invisible. Premium visual branding is the psychological anchor that separates industry leaders from commodities. At Adibuz, our creative directors specialize in forging compelling <strong>brand narratives</strong> that evoke trust, authority, and emotional resonance. We don't just design logos; we engineer comprehensive corporate identities that instantly communicate your unique value proposition to your target audience.</p>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-10">Typography Systems & Modern UI Aesthetics</h2>
        <p>A cohesive brand identity requires rigorous consistency across every touchpoint. Our design team establishes strict visual guidelines, incorporating bespoke typography systems, precise color psychology, and <strong>modern UI aesthetics</strong>. Whether we are overhauling your website's interface, designing high-converting ad creatives, or producing striking social media templates, we ensure your brand's visual language remains unified, sophisticated, and instantly recognizable.</p>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-10">Cross-Platform Consistency & Premium Assets</h2>
        <p>Your brand must perform flawlessly regardless of where a customer encounters it. We produce <strong>premium digital assets</strong> tailored for absolute cross-platform consistency. From high-fidelity video production and sleek 3D motion graphics to minimalist editorial layouts, our creative output is designed to elevate your perceived market value. By investing in top-tier visual branding, you empower your sales systems with an undeniable aura of professionalism that justifies premium pricing and accelerates conversions.</p>
      </div>
    )
  }
};

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !SERVICES_MAP[slug]) {
    return <Navigate to="/#services" replace />;
  }

  const service = SERVICES_MAP[slug];

  return (
    <div className="min-h-screen bg-[#fdfaff] flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <SEO 
        title={`${service.title} Services | Adibuz`} 
        description={service.description} 
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Service",
            "serviceType": service.title,
            "provider": {
              "@type": "LocalBusiness",
              "name": "Adibuz"
            },
            "description": service.description,
            "areaServed": {
              "@type": "Country",
              "name": "Global"
            }
          })}
        </script>
      </Helmet>

      <SimpleHeader />
      
      <main className="flex-1 relative pt-32 pb-24 overflow-hidden">
        <BackgroundGradientGlow className="absolute inset-0 z-0" />
        
        <div className="container-custom relative z-10">
          <FadeInUp className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#3A0F63]/5 border border-[#3A0F63]/10 text-[#3A0F63] text-sm font-bold tracking-widest mb-4">
              SERVICE DETAILS
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              {service.title}
            </h1>
          </FadeInUp>

            <ServiceDetailSection
              label={service.label}
              title={service.title}
              description={service.description}
              buttons={service.buttons}
              videoRight={service.videoRight}
              posterUrl={cloudinaryPoster(service.videoId)}
              videoSlot={
                <Suspense fallback={<div className="w-full h-full bg-slate-100 animate-pulse rounded-2xl" />}>
                  <LazyVideo
                    src={cloudinaryVideo(service.videoId)}
                    className="w-full h-full object-cover block"
                    style={{ borderRadius: 'inherit' }}
                    ariaLabel={`${service.title} showcase video`}
                  />
                </Suspense>
              }
            />

            {/* SEO Extended Content Block */}
            {service.content && (
              <FadeInUp delay={0.2} className="max-w-4xl mx-auto mt-12 md:mt-20 px-4 md:px-0">
                <div className="bg-white/60 backdrop-blur-md border border-slate-200/60 rounded-3xl p-8 md:p-12 shadow-sm">
                  {service.content}
                </div>
              </FadeInUp>
            )}
          </div>
        </main>

        <Footer />
      </div>
  );
}
