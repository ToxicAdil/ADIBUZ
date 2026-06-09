import React from 'react';
import { ArrowUpRight, Building2, Monitor, Rocket, ShoppingBag, Store, User } from 'lucide-react';

const clients = [
  { name: 'D2C Brands', focus: 'Retention systems', desc: 'Funnels, paid acquisition, and lifecycle journeys built around repeat revenue.', icon: ShoppingBag },
  { name: 'Startups', focus: 'Market entry', desc: 'Positioning, launch websites, and demand systems for faster traction.', icon: Rocket },
  { name: 'SaaS Teams', focus: 'Pipeline growth', desc: 'Content, SEO, automation, and conversion flows for qualified demand.', icon: Monitor },
  { name: 'Experts', focus: 'Authority building', desc: 'Premium platforms for creators, consultants, and specialist-led brands.', icon: User },
  { name: 'E-Commerce', focus: 'Store performance', desc: 'Product clarity, search visibility, ads, and conversion-focused storefronts.', icon: Store },
  { name: 'Local Brands', focus: 'Lead flow', desc: 'Credible local presence, tracking, and campaign systems for measurable enquiries.', icon: Building2 },
];

const WhoWeWorkWith = () => {
  return (
    <section className="relative w-full overflow-hidden bg-transparent px-5 py-12 md:px-[37px] md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-8 border-y border-[rgba(58,15,99,0.10)] py-8 md:gap-10 md:py-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="adibuz-kicker">Who We Work With</span>
            <h2 className="adibuz-gradient-text mt-5 max-w-[760px] text-[clamp(2.3rem,7.2vw,5.8rem)] font-[950] leading-[0.95] tracking-[-0.055em] lg:max-w-[560px]">
              Built for brands ready to grow with focus.
            </h2>
            <p className="mt-6 max-w-xl text-base font-semibold leading-relaxed text-[#6f667d] md:text-lg">
              We partner with teams that need strategy, websites, content, ads, and automation working as one measurable growth system.
            </p>

            <div className="mt-9 grid grid-cols-3 overflow-hidden rounded-[22px] border border-[rgba(58,15,99,0.10)] bg-white/68 shadow-[0_16px_45px_rgba(22,8,43,0.05)]">
              {['Acquire', 'Convert', 'Scale'].map((item) => (
                <div key={item} className="border-r border-[rgba(58,15,99,0.10)] px-3 py-4 text-center last:border-r-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-primary sm:text-[11px]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[rgba(58,15,99,0.10)] bg-white/74 p-3 shadow-[0_24px_70px_rgba(22,8,43,0.06)] md:p-4">
            <div className="divide-y divide-[rgba(58,15,99,0.09)] overflow-hidden rounded-[22px] bg-[#fffdf8]/80">
              {clients.map((client, index) => {
                const Icon = client.icon;
                return (
                  <article
                    key={client.name}
                    className="group grid gap-4 p-5 transition-colors duration-200 hover:bg-[#fbf8ff] sm:grid-cols-[3rem_0.78fr_1fr_auto] sm:items-center sm:p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(58,15,99,0.12)] bg-white text-primary shadow-[0_10px_28px_rgba(58,15,99,0.06)]">
                      <Icon className="h-5 w-5" strokeWidth={2.35} />
                    </div>

                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-primary">{client.focus}</p>
                      <h3 className="mt-1 text-xl font-black tracking-tight text-[#12091f] md:text-2xl">{client.name}</h3>
                    </div>

                    <p className="max-w-xl text-sm font-semibold leading-relaxed text-[#6f667d] md:text-[15px]">
                      {client.desc}
                    </p>

                    <div className="flex items-center justify-between gap-3 sm:flex-col sm:justify-center">
                      <span className="font-mono text-xs font-bold text-[#b9aec8]">{String(index + 1).padStart(2, '0')}</span>
                      <ArrowUpRight className="h-4 w-4 text-[#b8adc5] transition-colors duration-200 group-hover:text-primary" />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
