import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Insight } from '../../services/insightService';

interface InsightCardProps {
  insight: Insight;
  index: number;
}

export function InsightCard({ insight }: InsightCardProps) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(insight.created_at));

  return (
    <Link
      to={`/insights/${insight.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[rgba(58,15,99,0.10)] bg-white/84 shadow-[0_16px_45px_rgba(22,8,43,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_26px_75px_rgba(58,15,99,0.13)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={insight.featured_image}
          alt={`${insight.title} - Adibuz insights`}
          width={720}
          height={450}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12091f]/36 via-transparent to-transparent opacity-80" />
        {insight.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-primary shadow-sm">
            {insight.category.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3 text-[12px] font-bold text-[#827891]">
          <span>{formattedDate}</span>
          <span className="h-1 w-1 rounded-full bg-[#c9bfd3]" />
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {insight.read_time} min
          </span>
        </div>

        <h3 className="mt-4 line-clamp-2 text-xl font-black leading-[1.16] tracking-tight text-[#12091f] transition-colors group-hover:text-primary">
          {insight.title}
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-sm font-medium leading-relaxed text-[#6f667d]">
          {insight.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-[rgba(58,15,99,0.08)] pt-5">
          <span className="text-sm font-black text-[#12091f]">{insight.author_name}</span>
          <span className="inline-flex items-center gap-1 text-sm font-black text-primary">
            Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
