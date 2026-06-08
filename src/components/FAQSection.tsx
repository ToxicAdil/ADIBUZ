import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
    <section id="faqs" className="py-16 md:py-24">
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
        <div className="grid lg:grid-cols-[1fr,2fr] gap-12 lg:gap-20">
          <div className="space-y-8">
            <h2 className="adibuz-gradient-text text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Frequently Asked <br />
              Questions.
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md">
              Everything you need to know about our AI-driven systems and how we help ambitious brands scale.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;

              return (
              <FadeInUp
                key={i}
                delay={i * 0.1}
                className="premium-card rounded-[20px] md:rounded-[24px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] border border-slate-200/50 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between py-4 px-5 text-left md:py-[18px] md:px-7"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-[1.1rem] font-bold text-slate-800 tracking-tight pr-4 leading-snug">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 ${isOpen ? 'bg-[#3A0F63] shadow-lg shadow-[#3A0F63]/20' : 'bg-slate-50'}`}>
                    <ChevronDown className={`w-4 h-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'text-white rotate-180' : 'text-slate-400'}`} />
                  </div>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className={`px-5 md:px-7 pb-5 md:pb-6 text-slate-500 text-[0.95rem] md:text-[1.05rem] leading-[1.65] font-medium transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                      {faq.a}
                    </div>
                  </div>
                </div>
              </FadeInUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
