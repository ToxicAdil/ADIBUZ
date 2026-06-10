import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Clock, Cpu, Globe, Layers, Rocket, Search, Target, TrendingUp, Zap } from 'lucide-react';
import { useInsights } from '../hooks/useInsights';
import { Insight } from '../services/insightService';
import { InsightCard } from '../components/insights/InsightCard';
import { NewsletterCTA } from '../components/insights/NewsletterCTA';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';
import { SEO } from '@/components/SEO';

const TOPICS = [
  { label: 'AI Marketing', icon: Cpu },
  { label: 'SEO', icon: TrendingUp },
  { label: 'Automation', icon: Zap },
  { label: 'Branding', icon: Layers },
  { label: 'Web Development', icon: Globe },
  { label: 'Growth Systems', icon: Rocket },
  { label: 'Paid Ads', icon: Target },
  { label: 'Analytics', icon: BarChart3 },
];

function formatDate(date: string, mode: 'short' | 'long' = 'short') {
  return new Intl.DateTimeFormat('en-US', {
    month: mode === 'long' ? 'long' : 'short',
    day: 'numeric',
    year: mode === 'long' ? 'numeric' : undefined,
  }).format(new Date(date));
}

function FeaturedInsight({ insight }: { insight: Insight }) {
  return (
    <Link
      to={`/insights/${insight.slug}`}
      className="group block overflow-hidden rounded-[24px] border border-[rgba(58,15,99,0.12)] bg-white/88 shadow-[0_20px_65px_rgba(22,8,43,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_28px_80px_rgba(58,15,99,0.14)] lg:grid lg:grid-cols-[1.02fr_0.98fr]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 lg:aspect-auto lg:min-h-[320px]">
        <img
          src={insight.featured_image}
          alt={insight.title}
          width={1000}
          height={650}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12091f]/58 via-[#12091f]/10 to-transparent" />
      </div>

      <div className="flex min-h-full flex-col p-5 sm:p-7 lg:p-8">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#827891]">
          <span>{formatDate(insight.created_at, 'long')}</span>
          <span className="h-1 w-1 rounded-full bg-[#c9bfd3]" />
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" /> {insight.read_time} min read</span>
        </div>

        <h2 className="adibuz-gradient-text mt-4 text-xl font-black leading-[1.1] tracking-tight md:text-3xl">
          {insight.title}
        </h2>
        <p className="mt-3 line-clamp-2 text-sm font-medium leading-relaxed text-[#6f667d] md:text-base">
          {insight.excerpt}
        </p>

        <div className="mt-5 rounded-2xl border border-[rgba(58,15,99,0.10)] bg-[#f8f3ff]/70 p-3.5">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#827891]">Written by</p>
          <div className="mt-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3A0F63] to-[#8B5CF6] text-xs font-black text-white shadow-md">
                {insight.author_name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-black text-[#12091f]">{insight.author_name}</p>
                <p className="text-xs font-semibold text-[#827891]">Adibuz Team</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function TrendingCard({ insight, rank }: { insight: Insight; rank: number }) {
  return (
    <Link
      to={`/insights/${insight.slug}`}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[22px] border border-[rgba(58,15,99,0.10)] bg-white/78 p-4 shadow-[0_12px_35px_rgba(22,8,43,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-white"
    >
      <span className="w-9 text-2xl font-black tabular-nums text-[#ded5e8] transition-colors group-hover:text-primary/30">
        {String(rank + 1).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">{insight.category?.name ?? 'Insight'}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-black leading-snug text-[#12091f] transition-colors group-hover:text-primary">
          {insight.title}
        </h3>
        <p className="mt-2 text-xs font-semibold text-[#827891]">{formatDate(insight.created_at)} · {insight.read_time} min read</p>
      </div>
      <ArrowRight className="h-4 w-4 text-[#b8adc5] transition-transform group-hover:translate-x-1 group-hover:text-primary" />
    </Link>
  );
}

export default function InsightsPage() {
  const {
    insights,
    categories,
    loading,
    error,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
  } = useInsights();

  const isDefaultView = !activeCategory && !searchQuery;
  const featuredPost = isDefaultView && insights.length > 0 ? insights[0] : null;
  const gridPosts = featuredPost ? insights.slice(1) : insights;
  const trendingPosts = insights.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#fbf8ff] text-[#12091f] selection:bg-primary selection:text-white">
      <SEO
        title="Insights & Strategies | Adibuz"
        description="Premium insights on AI marketing, SEO, web development, automation, and digital growth systems from the Adibuz team."
      />
      <SimpleHeader dark={false} />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.16),transparent_40%),linear-gradient(180deg,#fffdf8_0%,#f8f3ff_58%,rgba(248,243,255,0)_100%)]" aria-hidden="true" />

        <section className="adibuz-subpage-hero relative z-10 pt-32 pb-10 md:pt-40 md:pb-14">
          <div className="container-custom">
            <div className="adibuz-subpage-hero-grid grid items-start gap-10 lg:grid-cols-[1.04fr_0.96fr]">
              <div className="pt-2">
                <h1 className="adibuz-subpage-hero-title adibuz-gradient-text mt-0 max-w-5xl text-[clamp(2.2rem,5vw,4.2rem)] font-black leading-[1.08] tracking-tight">
                  Growth thinking for modern operators.
                </h1>
                <p className="mt-6 max-w-lg text-base font-medium leading-relaxed text-[#6f667d]">
                  Actionable playbooks, strategic frameworks, and technical guides on custom web design, conversion optimization, and growth marketing.
                </p>
              </div>
              <div className="adibuz-subpage-hero-media w-full max-w-[520px] lg:ml-auto">
                <div className="relative w-full overflow-hidden rounded-[34px] border border-[rgba(58,15,99,0.14)] bg-white/70 p-3 shadow-[0_24px_80px_rgba(22,8,43,0.08)] backdrop-blur-xl md:p-4">
                  <div className="absolute inset-0 rounded-[34px] bg-gradient-to-br from-white/80 via-purple-100/32 to-white/72" aria-hidden="true" />
                  <div className="relative aspect-[4/3] min-h-[280px] overflow-hidden rounded-[26px] border border-white/80 bg-[#12091f] md:min-h-[360px]">
                    <img
                      src="/images/insights-hero.jpg"
                      alt="Premium purple abstract editorial insight visual"
                      width={1200}
                      height={675}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12091f]/36 via-transparent to-[#12091f]/10" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-[28px] border border-[rgba(58,15,99,0.12)] bg-white/82 p-4 shadow-[0_18px_55px_rgba(22,8,43,0.07)] md:p-5">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-full max-w-xl">
                  <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9a8fa8]" />
                  <input
                    type="text"
                    placeholder="Search insights, topics, strategies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-13 w-full rounded-full border border-[rgba(58,15,99,0.12)] bg-[#fbf8ff] pl-13 pr-5 text-sm font-semibold text-[#12091f] outline-none transition-all placeholder:text-[#9a8fa8] focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
                  />
                </div>
                <div className="flex w-full max-w-5xl flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`min-h-10 rounded-full border px-4 py-2 text-[12px] font-black uppercase tracking-[0.12em] transition-all ${!activeCategory ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20' : 'border-[rgba(58,15,99,0.12)] bg-white text-[#6f667d] hover:text-primary'}`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                      className={`min-h-10 rounded-full border px-4 py-2 text-[12px] font-black uppercase tracking-[0.12em] transition-all ${activeCategory === cat.id ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20' : 'border-[rgba(58,15,99,0.12)] bg-white text-[#6f667d] hover:text-primary'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <section className="relative z-10 py-28">
            <div className="mx-auto h-11 w-11 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          </section>
        ) : error ? (
          <section className="relative z-10 container-custom py-24 text-center">
            <div className="rounded-[28px] border border-red-200 bg-red-50 p-8 text-red-600">
              Failed to load insights. Please try again later.
            </div>
          </section>
        ) : insights.length === 0 ? (
          <section className="relative z-10 container-custom py-24 text-center">
            <div className="rounded-[28px] border border-[rgba(58,15,99,0.10)] bg-white/80 p-10">
              <h2 className="adibuz-gradient-text text-2xl font-black tracking-tight">No insights found</h2>
              <p className="mt-3 font-semibold text-[#6f667d]">Try a different keyword or clear the current filter.</p>
            </div>
          </section>
        ) : (
          <>
            {featuredPost && (
              <section className="relative z-10 border-y border-[rgba(58,15,99,0.08)] bg-white/40 py-12 md:py-16 mt-0 mb-2 md:mt-0 md:mb-4">
                <div className="container-custom">
                  <div className="mb-7 flex flex-col gap-2 max-w-3xl">
                    <h2 className="adibuz-gradient-text mt-0 pb-2 text-4xl font-black tracking-tight md:text-[54px] lg:text-6xl leading-[1.1]">Start here</h2>
                    <p className="text-sm font-medium leading-relaxed text-[#6f667d] md:text-base">
                      Our latest featured article highlighting high-impact strategies, tactical playbooks, and modern approaches to scaling businesses.
                    </p>
                  </div>
                  <FeaturedInsight insight={featuredPost} />
                </div>
              </section>
            )}

            <section className="relative z-10 border-y border-[rgba(58,15,99,0.10)] bg-white/50 pt-8 pb-14 md:pt-10 md:pb-18">
              <div className="container-custom">
                <div className="mb-9 flex flex-col gap-2 max-w-3xl">
                  <h2 className="adibuz-gradient-text mt-5 pb-2 text-4xl font-black tracking-tight md:text-[54px] lg:text-6xl leading-[1.1]">Growth topics</h2>
                  <p className="text-sm font-medium leading-relaxed text-[#6f667d] md:text-base">
                    Jump into the strategic areas that shape acquisition, authority, conversion, and retention.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {TOPICS.map((topic) => {
                    const Icon = topic.icon;
                    return (
                      <button
                        key={topic.label}
                        onClick={() => {
                          const cat = categories.find((c) => c.name.toLowerCase().includes(topic.label.toLowerCase().split(' ')[0]));
                          if (cat) setActiveCategory(cat.id);
                        }}
                        className="group flex min-h-[142px] flex-col justify-between rounded-[24px] border border-[rgba(58,15,99,0.10)] bg-white/82 p-5 text-left shadow-[0_12px_35px_rgba(22,8,43,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-white"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f3eaff] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-base font-black leading-tight text-[#12091f]">{topic.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {gridPosts.length > 0 && (
              <section className="relative z-10 pt-6 pb-14 md:pt-8 md:pb-20">
                <div className="container-custom">
                  <div className="mb-9 flex flex-col gap-2 max-w-4xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <h2 className="adibuz-gradient-text mt-5 pb-2 text-4xl font-black tracking-tight md:text-[54px] lg:text-6xl leading-[1.1]">Latest insights</h2>
                      {activeCategory && (
                        <button
                          onClick={() => setActiveCategory(null)}
                          className="w-fit rounded-full border border-primary/20 bg-white px-5 py-2 text-sm font-black text-primary transition-colors hover:bg-primary hover:text-white"
                        >
                          Clear filter
                        </button>
                      )}
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-[#6f667d] md:text-base">
                      Browse all of our recent articles, business updates, analysis, and tactical playbooks.
                    </p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {gridPosts.map((insight, index) => (
                      <InsightCard key={insight.id} insight={insight} index={index} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {isDefaultView && trendingPosts.length > 0 && (
              <section className="relative z-10 border-t border-[rgba(58,15,99,0.10)] bg-gradient-to-b from-white/40 to-transparent py-14 md:py-18">
                <div className="container-custom">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">Most read</p>
                      <h2 className="adibuz-gradient-text pb-2 text-4xl font-black tracking-tight md:text-[54px] lg:text-6xl leading-[1.1]">Trending this week</h2>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {trendingPosts.map((insight, index) => (
                      <TrendingCard key={insight.id} insight={insight} rank={index} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        <NewsletterCTA />
      </main>

      <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
}
