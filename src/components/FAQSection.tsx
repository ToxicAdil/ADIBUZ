import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FadeInUp } from '@/lib/animations';
import { JsonLd } from '@/components/SEO';

const faqs = [
  {
    q: 'How does Adibuz use AI in digital marketing?',
    a: 'Adibuz integrates AI into strategy, automation, audience analysis, content workflows, lead qualification, and performance optimization. Our systems help brands reduce manual effort, improve efficiency, and scale faster through data-driven decision making and intelligent automation.',
  },
  {
    q: 'What makes Adibuz different from traditional agencies?',
    a: 'Unlike traditional agencies that focus only on execution, Adibuz builds scalable digital systems. We combine AI automation, premium branding, performance marketing, web development, and strategic growth frameworks to create long-term business impact instead of short-term vanity metrics.',
  },
  {
    q: 'What services does Adibuz specialize in?',
    a: 'Adibuz specializes in AI automation, high-performance website development, SEO, social media management, paid advertising, branding strategy, conversion optimization, and modern digital growth systems tailored for scalable businesses.',
  },
  {
    q: 'Can Adibuz help startups and growing businesses?',
    a: 'Yes. We work with startups, personal brands, service businesses, SaaS companies, e-commerce brands, and growing enterprises. Our systems are designed to adapt to different growth stages and business goals.',
  },
  {
    q: 'How long does it usually take to see measurable growth?',
    a: 'The timeline depends on the service and market competition. Paid campaigns can generate results within weeks, while SEO and long-term brand systems typically compound over several months. Our focus is sustainable, measurable, and scalable growth.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="py-8">
      <JsonLd
        id="faq"
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        }}
      />
      <div className="container-custom">
        <FadeInUp className="premium-card mx-auto max-w-[1060px] rounded-3xl md:rounded-[36px] p-6 md:p-12 lg:px-16 lg:py-14 bg-white">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-4xl md:text-5xl font-[900] tracking-tight inline-flex items-center gap-3">
              <span className="adibuz-gradient-text">Need Help?</span> 🧑🏼‍💻
            </h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-slate-200/60">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;

              return (
                <div key={i} className="py-2">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between py-4 md:py-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[1.1rem] md:text-[1.25rem] font-bold text-slate-800 pr-8 group-hover:text-primary transition-colors">
                      {faq.q}
                    </span>
                    <div className={`flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-primary/30 bg-primary/5' : 'border-slate-200'}`}>
                      <Plus className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-45 text-primary' : 'text-slate-400'}`} strokeWidth={2.5} />
                    </div>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className={`pb-6 text-slate-500 text-[0.95rem] md:text-[1.05rem] leading-relaxed pr-8 transition-all duration-[300ms] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
