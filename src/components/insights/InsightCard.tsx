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
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[rgba(58,15,99,0.10)] bg-white/84 shadow-[0_12px_35px_rgba(22,8,43,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_20px_55px_rgba(58,15,99,0.11)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
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
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-[#827891]">
          <span>{formattedDate}</span>
          <span className="h-1 w-1 rounded-full bg-[#c9bfd3]" />
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3 w-3" /> {insight.read_time} min
          </span>
        </div>

        <h3 className="mt-3.5 line-clamp-2 text-lg font-black leading-[1.2] tracking-tight text-[#12091f] transition-colors group-hover:text-primary">
          {insight.title}
        </h3>

        <p className="mt-2.5 line-clamp-2 flex-1 text-sm font-medium leading-relaxed text-[#6f667d]">
          {insight.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-[rgba(58,15,99,0.08)] pt-3.5">
          <span className="text-xs font-black text-[#12091f]">{insight.author_name}</span>
          <span className="inline-flex items-center gap-1 text-xs font-black text-primary">
            Read <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
