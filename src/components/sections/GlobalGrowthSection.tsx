import React, { Suspense } from 'react';
import { InteractiveGlobe } from '@/components/ui/interactive-globe';
import { FadeInUp, ScaleInView } from '@/lib/animations';

import { GetStartedModal } from '@/components/funnels/GetStartedModal';
import { Globe, TrendingUp, Users } from 'lucide-react';

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

export function GlobalGrowthSection() {
  return (
    <section
      className="py-8 md:py-12 relative overflow-hidden"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 460px' }}
      aria-label="Global Reach"
    >
      <div className="container-custom">
        <FadeInUp className="premium-card mx-auto max-w-[1060px] rounded-3xl md:rounded-[36px] p-6 md:p-8 lg:p-10 overflow-hidden relative border border-white/40 bg-white/60 backdrop-blur-3xl">
          {/* Subtle animated background gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
          
          <div className="grid lg:grid-cols-2 gap-7 lg:gap-10 items-center relative z-10">
            <FadeInUp className="space-y-7">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-bold uppercase tracking-wider border border-primary/10">
                  <Globe className="w-4 h-4" />
                  <span>International Scaling</span>
                </div>
                <h2 className="adibuz-gradient-text text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                  Grow Your Brand <br />
                  Beyond Borders.
                </h2>
                <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                  Unlock new revenue streams. We build data-driven marketing engines tailored for 
                  <span className="text-primary font-bold"> global expansion</span>, multilingual audiences, and international markets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
                <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-[900] text-primary tracking-tight">25+</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Clients
                  </div>
                </div>
                <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-[900] text-primary tracking-tight">₹35L+</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Ad Spend
                  </div>
                </div>
                <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-[900] text-primary tracking-tight">6</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> Countries
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <GetStartedModal sourceCta="global_growth_section">
                  <button
                    className="adibuz-button-primary group relative overflow-hidden px-8 md:px-10 py-4 md:py-5 text-base md:text-lg active:scale-95 w-full sm:w-auto text-center"
                    aria-label="Book Global Growth Consultation"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    Book Global Consultation
                  </button>
                </GetStartedModal>
              </div>
            </FadeInUp>
            
            <ScaleInView className="w-full h-[300px] sm:h-[350px] lg:h-[390px] flex items-center justify-center relative">
              <div className="w-full h-full max-w-[315px] sm:max-w-[380px] lg:max-w-[420px] mx-auto cursor-grab active:cursor-grabbing">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-primary animate-pulse">Loading Globe...</div>}>
                  <InteractiveGlobe
                    size={420}
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
