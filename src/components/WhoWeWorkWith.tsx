import React from 'react';
import { ArrowUpRight, Building2, Monitor, Rocket, ShoppingBag, Store, User, Briefcase, RefreshCw, TrendingUp } from 'lucide-react';

const clients = [
  { name: 'D2C Brands', focus: 'Retention Systems', desc: 'Funnels, paid acquisition, and lifecycle journeys built around repeat revenue.', icon: ShoppingBag },
  { name: 'Startups', focus: 'Market Entry', desc: 'Positioning, launch websites, and demand systems for faster traction.', icon: Rocket },
  { name: 'SaaS Teams', focus: 'Pipeline Growth', desc: 'Content, SEO, automation, and conversion flows for qualified demand.', icon: Monitor },
  { name: 'Experts', focus: 'Authority Building', desc: 'Premium platforms for creators, consultants, and specialist-led brands.', icon: User },
  { name: 'E-Commerce', focus: 'Store Performance', desc: 'Product clarity, search visibility, ads, and conversion-focused storefronts.', icon: Store },
  { name: 'Local Brands', focus: 'Lead Flow', desc: 'Credible local presence, tracking, and campaign systems for measurable enquiries.', icon: Building2 },
];

const DotGrid = () => (
  <svg width="64" height="80" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/15">
    {Array.from({ length: 5 }).map((_, r) =>
      Array.from({ length: 4 }).map((_, c) => (
        <circle key={`${r}-${c}`} cx={8 + c * 16} cy={8 + r * 16} r="2.5" fill="currentColor" />
      ))
    )}
  </svg>
);

const WhoWeWorkWith = () => {
  return (
    <section className="relative w-full overflow-hidden bg-transparent px-4 py-16 md:px-8 md:py-24">
      {/* Decorative background gradients */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[120px]" aria-hidden="true" />
      
      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Header section with absolute dot grids */}
        <div className="relative flex flex-col items-center text-center px-4">
          {/* Left Dot Grid */}
          <div className="absolute left-4 lg:left-12 xl:left-24 top-1/2 -translate-y-1/2 hidden md:block select-none opacity-80">
            <DotGrid />
          </div>

          {/* Right Dot Grid */}
          <div className="absolute right-4 lg:right-12 xl:right-24 top-1/2 -translate-y-1/2 hidden md:block select-none opacity-80">
            <DotGrid />
          </div>

          {/* Pill Badge */}
          <div className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/[0.04] px-4 py-1.5">
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-primary">
              Who We Work With
            </span>
          </div>

          {/* Title */}
          <h2 className="adibuz-gradient-text mt-6 max-w-[20ch] text-[clamp(2.1rem,4.5vw,4.4rem)] font-[950] leading-[1.02] tracking-[-0.05em]">
            Built for brands ready to grow with focus.
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-sm font-semibold leading-relaxed text-[#6f667d] md:text-base">
            We partner with teams that need strategy, websites, content, ads, and automation working as one measurable growth system.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {clients.map((client, index) => {
            const Icon = client.icon;
            return (
              <div 
                key={client.name}
                className="group relative flex flex-col justify-between rounded-[24px] border border-[rgba(58,15,99,0.08)] bg-white/70 p-5 shadow-[0_12px_36px_rgba(22,8,43,0.03)] transition-all duration-300 hover:-translate-y-2 hover:border-primary/25 hover:bg-white hover:shadow-[0_22px_55px_rgba(58,15,99,0.08)]"
              >
                <div>
                  {/* Icon Circle */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(58,15,99,0.08)] bg-[#fbf8ff] text-primary shadow-[0_6px_20px_rgba(58,15,99,0.04)] transition-all duration-300 group-hover:scale-105 group-hover:border-primary/15 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </div>

                  {/* Number & Line */}
                  <div className="mt-6 flex flex-col items-start gap-1">
                    <span className="font-mono text-xs font-bold text-[#b0a5bf]">{String(index + 1).padStart(2, '0')}</span>
                    <div className="h-[2px] w-5 bg-primary/20 transition-all duration-300 group-hover:w-8 group-hover:bg-primary" />
                  </div>

                  {/* Focus & Name */}
                  <div className="mt-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-primary">{client.focus}</p>
                    <h3 className="mt-1.5 text-lg font-black tracking-tight text-[#12091f]">{client.name}</h3>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-[13px] font-semibold leading-relaxed text-[#6f667d]">
                    {client.desc}
                  </p>
                </div>

                {/* Arrow at bottom-right */}
                <div className="mt-6 flex justify-end">
                  <ArrowUpRight className="h-5 w-5 text-[#b8adc5] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Growth Pill */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-4 md:gap-8 rounded-full border border-[rgba(58,15,99,0.08)] bg-white/80 px-6 py-3.5 shadow-[0_12px_40px_rgba(22,8,43,0.04)] backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <Briefcase className="h-4.5 w-4.5 text-primary" strokeWidth={2.2} />
              <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#12091f]">Acquire</span>
            </div>
            <div className="h-4 w-[1px] bg-[rgba(58,15,99,0.15)]" />
            <div className="flex items-center gap-2.5">
              <RefreshCw className="h-4.5 w-4.5 text-primary animate-[spin_12s_linear_infinite]" strokeWidth={2.2} />
              <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#12091f]">Convert</span>
            </div>
            <div className="h-4 w-[1px] bg-[rgba(58,15,99,0.15)]" />
            <div className="flex items-center gap-2.5">
              <TrendingUp className="h-4.5 w-4.5 text-primary" strokeWidth={2.2} />
              <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#12091f]">Scale</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
