import React from 'react';
import type { BlogHeading } from '@/lib/blog';

interface InsightOutlineProps {
  headings: BlogHeading[];
}

export function InsightOutline({ headings }: InsightOutlineProps) {
  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block lg:w-72 shrink-0" aria-label="Article outline">
      <div className="sticky top-28 rounded-[24px] border border-[rgba(58,15,99,0.10)] bg-white/82 p-5 shadow-[0_14px_40px_rgba(22,8,43,0.05)] backdrop-blur-xl">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">On this page</p>
        <nav className="mt-4">
          <ul className="space-y-1" role="list">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`block rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-primary/5 hover:text-primary ${
                    heading.level === 3 ? 'pl-5 text-[#6f667d]' : heading.level === 4 ? 'pl-7 text-[#8a8097]' : 'text-[#4a4157]'
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

