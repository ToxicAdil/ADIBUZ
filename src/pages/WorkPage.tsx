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
    className={`group overflow-hidden rounded-[28px] border border-[rgba(58,15,99,0.12)] bg-white/86 shadow-[0_18px_55px_rgba(22,8,43,0.07)] ${featured ? 'lg:grid lg:grid-cols-[1.08fr_0.92fr]' : ''}`}
  >
    <div className={`relative overflow-hidden bg-slate-100 ${featured ? 'aspect-[16/11] lg:aspect-auto lg:min-h-[520px]' : 'aspect-[16/10]'}`}>
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

    <div className={`${featured ? 'p-7 sm:p-9 lg:p-12' : 'p-6 md:p-7'} flex min-h-full flex-col`}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">Case Study</p>
        <p className="text-[12px] font-bold text-[#827891]">{study.timeline}</p>
      </div>

      <div className="mt-6 space-y-4">
        <h3 className={`${featured ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'} font-black leading-[1.04] tracking-tight text-[#12091f]`}>
          {study.client}
        </h3>
        <p className="text-sm font-semibold leading-relaxed text-[#6f667d] md:text-base">
          {study.challenge}
        </p>
      </div>

      <div className="mt-7 rounded-2xl border border-[rgba(58,15,99,0.10)] bg-[#f8f3ff]/70 p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#827891]">Outcome</p>
        <p className={`${featured ? 'text-3xl md:text-4xl' : 'text-2xl'} mt-2 font-black tracking-tight text-primary`}>
          {study.result}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {study.metrics.slice(0, featured ? 4 : 2).map((metric) => (
          <div key={metric.label} className="rounded-2xl bg-white/70 p-4 ring-1 ring-[rgba(58,15,99,0.08)]">
            <p className="text-lg font-black tracking-tight text-[#12091f]">{metric.value}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#827891]">{metric.label}</p>
          </div>
        ))}
      </div>

    </div>
  </article>
);

const SampleWebsiteCard: React.FC<{ item: (typeof SAMPLE_WEBSITES)[number] }> = ({ item }) => {
  const content = (
    <div className="group h-full overflow-hidden rounded-[24px] border border-[rgba(58,15,99,0.10)] bg-white/82 shadow-[0_16px_45px_rgba(22,8,43,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(58,15,99,0.12)]">
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

        <section className="adibuz-subpage-hero relative z-10 pt-32 pb-12 md:pt-40 md:pb-18">
          <div className="container-custom">
            <div className="adibuz-subpage-hero-grid grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="max-w-4xl">
                <h1 className="adibuz-subpage-hero-title adibuz-gradient-text mt-6 max-w-5xl text-[clamp(3rem,8vw,7.8rem)] font-black leading-[0.92] tracking-[-0.055em]">
                  Proof-led growth systems.
                </h1>
              </div>
              <div className="adibuz-subpage-hero-media w-full max-w-[520px] lg:ml-auto">
                <div className="relative overflow-hidden rounded-[34px] border border-[rgba(58,15,99,0.14)] bg-white/70 p-3 shadow-[0_24px_80px_rgba(22,8,43,0.08)] backdrop-blur-xl md:p-4">
                  <div className="absolute inset-0 rounded-[34px] bg-gradient-to-br from-white/80 via-purple-100/30 to-white/72" aria-hidden="true" />
                  <div className="relative aspect-[4/3] min-h-[300px] overflow-hidden rounded-[26px] border border-white/80 bg-[#12091f] md:min-h-[370px]">
                    <img
                      src="/images/work-hero.jpg"
                      alt="Purple abstract growth system visual"
                      width={1200}
                      height={675}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_0%,transparent_42%,rgba(18,9,31,0.24)_100%)]" aria-hidden="true" />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#12091f]/50 to-transparent" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-[24px] border border-[rgba(58,15,99,0.10)] bg-white/76 p-5 shadow-[0_14px_45px_rgba(22,8,43,0.06)]">
                    <Icon className="h-5 w-5 text-primary" />
                    <p className="mt-5 text-3xl font-black tracking-tight text-[#12091f] md:text-4xl">{stat.value}</p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-[#827891]">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative z-10 py-10 md:py-16">
          <div className="container-custom">
            {featuredStudy && <CaseStudyCard study={featuredStudy} featured />}
          </div>
        </section>

        <section className="relative z-10 py-10 md:py-18">
          <div className="container-custom">
            <div className="mb-8 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end">
              <div>
                <h2 className="adibuz-gradient-text mt-5 text-3xl font-black tracking-tight md:text-5xl">More growth stories</h2>
              </div>
              <p className="max-w-md text-sm font-semibold leading-relaxed text-[#6f667d] md:text-base">
                Each project pairs strategy, creative, tracking, and conversion systems around one measurable business target.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {otherStudies.map((study) => (
                <CaseStudyCard key={study.client} study={study} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 border-y border-[rgba(58,15,99,0.10)] bg-white/50 py-14 md:py-22">
          <div className="container-custom">
            <div className="mb-9 text-center md:mb-14">
              <span className="adibuz-kicker mx-auto">Website Systems</span>
              <h2 className="adibuz-gradient-text mx-auto mt-5 max-w-3xl text-3xl font-black tracking-tight md:text-5xl">
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

