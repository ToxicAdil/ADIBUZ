import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import type { Insight } from '@/services/insightService';

interface InsightArticleHeroProps {
  insight: Insight;
  formattedDate: string;
}

export function InsightArticleHero({ insight, formattedDate }: InsightArticleHeroProps) {
  return (
    <section className="relative z-10 overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 30%, rgba(167, 139, 250, 0.16) 0%, transparent 38%), radial-gradient(circle at 85% 20%, rgba(58, 15, 99, 0.10) 0%, transparent 42%), linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,243,255,0.92) 100%)',
        }}
      />

      <div className="container-custom relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#7b98b8]">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#c7bfd6]">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link to="/insights" className="transition-colors hover:text-primary">
                Insights
              </Link>
            </li>
            {insight.category?.name && (
              <>
                <li aria-hidden="true" className="text-[#c7bfd6]">
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li className="text-[#6f667d]">{insight.category.name}</li>
              </>
            )}
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl">
            {insight.category && (
              <span className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-primary">
                {insight.category.name}
              </span>
            )}

            <h1 className="adibuz-gradient-text mt-5 text-[clamp(2.4rem,5vw,4.9rem)] font-black leading-[1.05] tracking-tight">
              {insight.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-[#6f667d] md:text-xl">
              {insight.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold text-[#6f667d]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(58,15,99,0.10)] bg-white/80 px-4 py-2 shadow-sm">
                <Calendar className="h-4 w-4 text-primary" />
                {formattedDate}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(58,15,99,0.10)] bg-white/80 px-4 py-2 shadow-sm">
                <Clock className="h-4 w-4 text-primary" />
                {insight.read_time} min read
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(58,15,99,0.10)] bg-white/80 px-4 py-2 shadow-sm">
                By {insight.author_name}
              </span>
            </div>

            {insight.tags?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {insight.tags.slice(0, 6).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-[rgba(58,15,99,0.10)] bg-white/72 px-3 py-1 text-xs font-bold text-[#5f6f88]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-primary/10 via-purple-200/30 to-transparent blur-2xl" aria-hidden="true" />
            <div className="overflow-hidden rounded-[32px] border border-[rgba(58,15,99,0.14)] bg-white/72 p-3 shadow-[0_26px_85px_rgba(22,8,43,0.10)] backdrop-blur-xl md:p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#12091f]">
                <img
                  src={insight.featured_image}
                  alt={insight.title}
                  className="h-full w-full object-cover"
                  width={1200}
                  height={900}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12091f]/36 via-transparent to-transparent" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
