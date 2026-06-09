import React, { Suspense } from 'react';
import { InteractiveGlobe } from '@/components/ui/interactive-globe';
import { FadeInUp, ScaleInView } from '@/lib/animations';
import { ArrowRight, Globe, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const globeMarkers = [
  { lat: 28.61, lng: 77.21, label: 'India' },
  { lat: 37.77, lng: -122.41, label: 'USA' },
  { lat: 43.65, lng: -79.38, label: 'Canada' },
  { lat: -33.86, lng: 151.2, label: 'Australia' },
  { lat: -26.2, lng: 28.04, label: 'South Africa' },
  { lat: 25.2, lng: 55.27, label: 'Dubai' },
];

const globeConnections = [
  { from: [28.61, 77.21] as [number, number], to: [37.77, -122.41] as [number, number] },
  { from: [28.61, 77.21] as [number, number], to: [43.65, -79.38] as [number, number] },
  { from: [28.61, 77.21] as [number, number], to: [-33.86, 151.2] as [number, number] },
  { from: [28.61, 77.21] as [number, number], to: [-26.2, 28.04] as [number, number] },
  { from: [28.61, 77.21] as [number, number], to: [25.2, 55.27] as [number, number] },
];

const stats = [
  { value: '25+', label: 'Clients', icon: Users },
  { value: '₹35L+', label: 'Ad Spend', icon: TrendingUp },
  { value: '6', label: 'Countries', icon: Globe },
];

export function GlobalGrowthSection() {
  return (
    <section
      className="py-8 md:py-12 relative overflow-hidden"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}
      aria-label="Global Reach"
    >
      <div className="container-custom">
        <FadeInUp className="premium-card mx-auto max-w-[1060px] rounded-3xl md:rounded-[36px] p-5 md:p-7 lg:p-8 overflow-hidden relative border border-white/40 bg-white/60 backdrop-blur-3xl">
          {/* Subtle animated background gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />

          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8 relative z-10">

          {/* Left Content */}
          <FadeInUp className="space-y-5">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.04] px-4 py-1.5">
              <Globe className="h-3.5 w-3.5 text-primary" strokeWidth={2.2} />
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">International Scaling</span>
            </div>

            {/* Heading */}
            <div>
              <h2 className="adibuz-gradient-text text-[clamp(1.9rem,4.5vw,3.2rem)] font-[950] leading-[1.05] tracking-[-0.04em]">
                Grow Your Brand{' '}
                Beyond Borders.
              </h2>
              {/* Purple underline */}
              <div className="mt-3 h-[3px] w-10 rounded-full bg-primary" />
            </div>

            <p className="adibuz-subheading max-w-md">
              Unlock new revenue streams. We build data-driven marketing engines tailored for{' '}
              <span className="font-extrabold text-[#12091f]">global expansion</span>, multilingual audiences, and international markets.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center gap-2 rounded-[16px] border border-[rgba(58,15,99,0.08)] bg-white/70 p-3.5 shadow-[0_10px_30px_rgba(22,8,43,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(58,15,99,0.08)]"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(58,15,99,0.08)] bg-[#fbf8ff] text-primary">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    </div>
                    <span className="text-2xl font-[900] tracking-tight text-[#12091f] md:text-3xl">{stat.value}</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#827891]">{stat.label}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div>
              <Link
                to="/contact"
                className="adibuz-button-primary inline-flex items-center gap-2 px-6 py-3 text-sm md:text-base"
              >
                Book Global Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeInUp>

          {/* Right Globe */}
          <ScaleInView className="relative flex items-center justify-center">
            <div className="relative h-[280px] w-full max-w-[380px] sm:h-[320px] lg:h-[360px] cursor-grab active:cursor-grabbing">
              <Suspense fallback={<div className="flex h-full w-full items-center justify-center text-primary animate-pulse">Loading Globe...</div>}>
                <InteractiveGlobe
                  size={380}
                  markers={globeMarkers}
                  connections={globeConnections}
                  dotColor="rgba(124, 58, 237, ALPHA)"
                  arcColor="rgba(124, 58, 237, 0.4)"
                  markerColor="rgba(58, 15, 99, 1)"
                />
              </Suspense>
            </div>
          </ScaleInView>

          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
