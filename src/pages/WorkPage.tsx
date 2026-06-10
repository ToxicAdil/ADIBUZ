import React from 'react';
import { ArrowRight, CheckCircle2, ExternalLink, Target, TrendingUp } from 'lucide-react';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';
import { JsonLd, SEO } from '@/components/SEO';
import { CASE_STUDIES } from '@/data/case-studies';
import { FreeAuditModal } from '@/components/funnels/FreeAuditModal';
import { BookStrategyCallModal } from '@/components/funnels/BookStrategyCallModal';

const STATS = [
  { label: 'Clients served', value: '25+', icon: CheckCircle2 },
  { label: 'Ad spend managed', value: 'Rs.35L+', icon: TrendingUp },
  { label: 'Countries reached', value: '6', icon: Target },
];

const SAMPLE_WEBSITES = [
  { title: 'Cafe Website', tag: 'Hospitality', desc: 'A warm, conversion-led local website for orders, visits, and discovery.', img: '/images/work-cafe.jpg', link: 'https://adibuz-point.vercel.app/' },
  { title: 'Real Estate Website', tag: 'Property', desc: 'A polished listing experience built to capture high-intent buyer leads.', img: '/images/work-real-estate.jpg', link: 'https://adibuz-creative-houses.vercel.app/' },
  { title: 'Healthcare Website', tag: 'Trust', desc: 'A clean healthcare presence structured for credibility and bookings.', img: 'https://images.unsplash.com/photo-1505751172107-5732bb72cc53?w=900&q=75&fm=webp' },
  { title: 'E-commerce Website', tag: 'Commerce', desc: 'A fast online store designed around product clarity and sales flow.', img: '/images/work-ecommerce.jpg', link: 'https://adibuz-store.vercel.app/' },
  { title: 'Personal Brand Website', tag: 'Authority', desc: 'A premium expert platform for trust, positioning, and inbound leads.', img: '/images/work-personal-brand.png', link: 'https://hirebuz.com/' },
  { title: 'Gaming Website', tag: 'Community', desc: 'A high-energy destination for audience engagement and campaign launches.', img: '/images/work-gaming.png', link: 'https://adibuz-ga-ming.vercel.app/' },
];

function responsiveSrcSet(src: string) {
  if (src.startsWith('/images/') && src.endsWith('.jpg')) {
    const base = src.slice(0, -4);
    return `${base}-480.jpg 480w, ${base}-768.jpg 768w, ${src} 1100w`;
  }

  if (src.startsWith('/images/')) {
    return undefined;
  }

  const base = src.replace(/[?&]w=\d+/, '').replace('fm=webp', '').split('&q=')[0];
  return `${base}?w=480&q=75&fm=webp 480w, ${base}?w=768&q=75&fm=webp 768w, ${src} 1200w`;
}

const CaseStudyCard: React.FC<{ study: (typeof CASE_STUDIES)[number]; featured?: boolean }> = ({ study, featured = false }) => (
  <article
    className={`group overflow-hidden rounded-[28px] border-[2.5px] border-[#6D28D9]/12 bg-white/86 shadow-[0_18px_55px_rgba(22,8,43,0.07)] ${featured ? 'lg:grid lg:grid-cols-[1.08fr_0.92fr]' : ''}`}
  >
    <div className={`relative overflow-hidden bg-slate-100 ${featured ? 'aspect-[16/11] lg:aspect-auto lg:min-h-[400px]' : 'aspect-[16/10]'}`}>
      <img
        src={study.image}
        srcSet={responsiveSrcSet(study.image)}
        sizes={featured ? '(max-width: 1023px) 100vw, 52vw' : '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw'}
        alt={`${study.client} ${study.industry} case study`}
        width={1000}
        height={650}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#12091f]/58 via-[#12091f]/12 to-transparent" />
    </div>

    <div className={`${featured ? 'p-6 sm:p-8 lg:p-8' : 'p-5 md:p-6'} flex min-h-full flex-col`}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.22em] text-primary">Case Study</p>
        <p className="text-[11px] md:text-[12px] font-bold text-[#827891]">{study.timeline}</p>
      </div>

      <div className="mt-4 space-y-2 md:space-y-3">
        <h3 className={`${featured ? 'text-3xl md:text-4xl lg:text-[40px]' : 'text-xl md:text-2xl'} font-black leading-[1.04] tracking-tight text-[#12091f]`}>
          {study.client}
        </h3>
        <p className={`${featured ? 'text-sm md:text-base' : 'text-xs md:text-sm'} font-semibold leading-relaxed text-[#6f667d]`}>
          {study.challenge}
        </p>
      </div>

      <div className={`${featured ? 'mt-6 p-4' : 'mt-4 p-3'} rounded-2xl border border-[rgba(58,15,99,0.10)] bg-[#f8f3ff]/70`}>
        <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-[#827891]">Outcome</p>
        <p className={`${featured ? 'text-3xl' : 'text-xl md:text-2xl'} mt-1 font-black tracking-tight text-primary`}>
          {study.result}
        </p>
      </div>

      <div className={`${featured ? 'mt-5' : 'mt-4'} grid grid-cols-2 gap-2 md:gap-3`}>
        {study.metrics.slice(0, featured ? 4 : 2).map((metric) => (
          <div key={metric.label} className={`rounded-2xl bg-white/70 ${featured ? 'p-3' : 'px-3 py-2.5'} ring-1 ring-[rgba(58,15,99,0.08)]`}>
            <p className={`${featured ? 'text-lg' : 'text-base'} font-black tracking-tight text-[#12091f]`}>{metric.value}</p>
            <p className="mt-0.5 md:mt-1 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-[#827891]">{metric.label}</p>
          </div>
        ))}
      </div>

    </div>
  </article>
);

const SampleWebsiteCard: React.FC<{ item: (typeof SAMPLE_WEBSITES)[number] }> = ({ item }) => {
  const content = (
    <div className="group h-full overflow-hidden rounded-[24px] border-[2.5px] border-[#6D28D9]/12 bg-white/82 shadow-[0_16px_45px_rgba(22,8,43,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(58,15,99,0.12)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={item.img}
          srcSet={responsiveSrcSet(item.img)}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          alt={`${item.title} website sample`}
          width={900}
          height={560}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-5 md:p-6">
        <h3 className="text-xl font-black tracking-tight text-[#12091f]">{item.title}</h3>
        <p className="mt-3 text-sm font-medium leading-relaxed text-[#6f667d]">{item.desc}</p>
        <div className="mt-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-primary">
          View sample <ExternalLink className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );

  return item.link ? (
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
      {content}
    </a>
  ) : content;
};

const BottomCTA: React.FC = () => (
  <section className="relative z-10 py-14 md:py-24">
    <div className="container-custom">
      <div className="relative overflow-hidden rounded-[32px] border border-[#6D28D9]/20 bg-[linear-gradient(135deg,#4A1278_0%,#3A0F63_48%,#2E1065_100%)] px-6 py-12 text-center shadow-[0_28px_90px_rgba(58,15,99,0.24)] md:px-12 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.24),transparent_46%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/70">
            Build the next result
          </span>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-white md:text-6xl">Ready for work that performs?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-white/66 md:text-lg">
            Get a focused growth audit and a clear execution roadmap for your website, ads, SEO, and automation systems.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <BookStrategyCallModal sourcePage="work_page">
              <button className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-white px-8 font-black text-[#12091f] shadow-xl transition-transform hover:-translate-y-0.5 sm:w-auto">
                Book a Strategy Call <ArrowRight className="h-5 w-5" />
              </button>
            </BookStrategyCallModal>
            <FreeAuditModal>
              <button className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/18 px-8 font-black text-white transition-colors hover:bg-white/10 sm:w-auto">
                Free Audit
              </button>
            </FreeAuditModal>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const WorkPage: React.FC = () => {
  const [featuredStudy, ...otherStudies] = CASE_STUDIES;
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fbf8ff] text-[#12091f] selection:bg-primary selection:text-white">
      <SEO
        title="Our Work & Case Studies | Adibuz"
        description="Explore performance-focused case studies, website samples, and digital growth systems built by Adibuz."
      />
      <JsonLd
        id="breadcrumb-work"
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.adibuz.com/' },
            { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://www.adibuz.com/work' },
          ],
        }}
      />
      <SimpleHeader />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.16),transparent_40%),linear-gradient(180deg,#fffdf8_0%,#f8f3ff_58%,rgba(248,243,255,0)_100%)]" aria-hidden="true" />

        <section className="relative z-10 pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
          <div className="container-custom relative z-10">
            {/* Central visual container with overlay typography */}
            <div className="relative w-full flex flex-col items-center justify-center pt-3 pb-10 md:pt-5 md:pb-14 mt-2 md:mt-4">
              {/* Central portrait image box */}
              <div 
                className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] aspect-[9/13.5] rounded-3xl overflow-hidden border-[2.5px] border-[#6D28D9]/25 z-0 bg-white flex items-center justify-center -translate-y-4 md:-translate-y-8"
                style={{
                  boxShadow: 'inset 0 0 32px 4px rgba(109, 40, 217, 0.22), 0 16px 48px rgba(58, 15, 99, 0.06)'
                }}
              >
                <img 
                  src="/images/work-process.png"
                  alt="Adibuz Performance Visual"
                  className="w-full h-full object-cover opacity-80"
                />
                {/* Soft local fade mask to hide sketches directly behind the text */}
                <div 
                  className="absolute inset-0 pointer-events-none z-[1]"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.8) 35%, rgba(255,255,255,0) 75%)'
                  }}
                />
              </div>

              {/* Overlay Typography (Centered over visual box and aligned end-to-end matching the navbar size) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-14 md:-translate-y-24 pointer-events-none z-10 w-full px-4 sm:px-6">
                <div className="w-full max-w-[1060px] flex flex-col items-center justify-center">
                  {(() => {
                    const scrollScale = Math.min(1.35, 1 + scrollY * 0.0008);
                    return (
                      <>
                        <h2 
                          className="text-[clamp(2rem,6.8vw,5.8rem)] uppercase tracking-[-0.04em] adibuz-gradient-text leading-none text-center select-none drop-shadow-[0_8px_24px_rgba(58,15,99,0.08)] drop-shadow-[0_0_30px_rgba(124,58,237,0.35)] inline-block"
                          style={{ 
                            fontFamily: '"Syncopate", sans-serif',
                            fontWeight: 700,
                            transform: `scaleX(${1.15 * scrollScale}) scaleY(${0.95 * scrollScale}) translateY(18px)`, 
                            transformOrigin: 'center',
                            willChange: 'transform'
                          }}
                        >
                          PERFORMANCE
                        </h2>
                        
                        <h2 
                          className="text-[clamp(2rem,6.8vw,5.8rem)] uppercase tracking-[-0.04em] text-transparent leading-none text-center select-none mt-2 drop-shadow-[0_0_20px_rgba(109,40,217,0.2)]"
                          style={{ 
                            fontFamily: '"Syncopate", sans-serif',
                            fontWeight: 700,
                            WebkitTextStroke: '1.5px #6D28D9', 
                            transform: `scaleX(${0.9 * scrollScale}) scaleY(${0.95 * scrollScale})`, 
                            transformOrigin: 'center',
                            willChange: 'transform'
                          }}
                        >
                          AND DESIGN
                        </h2>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Bottom Text Description */}
            <div className="w-full text-center -mt-5 md:-mt-8">
              <p className="text-lg sm:text-xl md:text-2xl font-extrabold leading-relaxed tracking-tight w-full">
                {"We create high-performance digital experiences that blend strategic design, AI automation, and growth marketing to help businesses attract, convert, and scale more effectively".split(' ').map((word, idx) => (
                  <span 
                    key={idx} 
                    className="inline-block mr-[0.25em]"
                    style={{
                      background: 'linear-gradient(135deg, #12091f 0%, #3A0F63 50%, #6D28D9 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 border-y border-[rgba(58,15,99,0.06)] bg-white/40 backdrop-blur-sm relative z-10 mb-2 md:mb-4">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-center md:justify-around gap-6 items-center">
              {[
                '25+ Clients Served',
                '₹35L+ Ad Spend Managed',
                '6 Countries Served'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-[22px] h-[22px] md:w-6 md:h-6 text-emerald-500" strokeWidth={2.5} />
                  <span className="text-[#12091f] font-bold text-[15px] md:text-[17px] tracking-tight">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 pt-4 pb-12 md:pt-6 md:pb-20">
          <div className="container-custom">
            {/* Split Case Studies Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-[rgba(58,15,99,0.08)] pb-8">
              <div className="max-w-xl">
                <span className="inline-flex rounded-full border border-[#6D28D9]/10 bg-[#f8f3ff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#6D28D9] mb-4">
                  Case Studies
                </span>
                <h2 className="adibuz-gradient-text text-3xl md:text-5xl font-black tracking-tight">
                  Proven growth systems <br className="hidden md:inline" /> in action.
                </h2>
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {CASE_STUDIES.map((study) => (
                <CaseStudyCard key={study.client} study={study} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 border-y border-[rgba(58,15,99,0.10)] bg-white/50 pt-8 pb-14 md:pt-12 md:pb-22">
          <div className="container-custom">
            <div className="mb-9 text-center md:mb-14">
              <h2 className="adibuz-gradient-text mx-auto mt-0 max-w-4xl text-4xl font-black tracking-tight md:text-[54px] lg:text-6xl leading-[1.1]">
                Premium web foundations for different markets.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed text-[#6f667d]">
                Sample builds showing how Adibuz can shape fast, credible, conversion-ready websites across industries.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SAMPLE_WEBSITES.map((item) => (
                <SampleWebsiteCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <BottomCTA />
      </main>

      <Footer />
    </div>
  );
};

export default WorkPage;

