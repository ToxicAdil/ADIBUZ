import React from 'react';
import { ArrowUpRight, Monitor, Rocket, ShoppingBag, Store, User, Building2 } from 'lucide-react';

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
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/6 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl overflow-hidden rounded-[34px] border border-[rgba(58,15,99,0.10)] bg-white/82 shadow-[0_24px_80px_rgba(22,8,43,0.07)] backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden="true" />
        <div className="absolute right-[-160px] top-[-160px] h-80 w-80 rounded-full bg-purple-400/12 blur-3xl" aria-hidden="true" />

        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex flex-col justify-between border-b border-[rgba(58,15,99,0.10)] p-7 md:p-10 lg:border-b-0 lg:border-r lg:p-12">
            <div>
              <span className="adibuz-kicker">Who We Work With</span>
              <h2 className="adibuz-gradient-text mt-6 text-[34px] font-[950] leading-[1.02] tracking-[-0.045em] md:text-[58px]">
                Growth partners for focused, ambitious brands.
              </h2>
              <p className="mt-6 max-w-xl text-base font-semibold leading-relaxed text-[#6f667d] md:text-lg">
                We work best with teams that need strategy, website, content, ads, and automation moving as one operating system.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {['Acquire', 'Convert', 'Scale'].map((item) => (
                <div key={item} className="rounded-2xl border border-[rgba(58,15,99,0.10)] bg-[#fbf8ff]/80 px-3 py-4 text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-primary">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {clients.map((client) => {
              const Icon = client.icon;
              return (
                <article
                  key={client.name}
                  className="group min-h-[174px] border-b border-[rgba(58,15,99,0.10)] bg-white/40 p-6 transition-colors duration-300 hover:bg-[#fbf8ff] sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:p-7"
                >
                  <div className="flex h-full flex-col justify-between gap-5">
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary ring-1 ring-[rgba(58,15,99,0.12)] transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={2.4} />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-[#b8adc5] transition-colors group-hover:text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-primary">{client.focus}</p>
                      <h3 className="mt-2 text-xl font-black tracking-tight text-[#12091f]">{client.name}</h3>
                      <p className="mt-2 text-sm font-semibold leading-relaxed text-[#6f667d]">{client.desc}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
