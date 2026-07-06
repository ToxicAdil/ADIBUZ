import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Sparkles, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import { useInsights } from '../hooks/useInsights';

export const InsightPreviewCard: React.FC = () => {
  const { insights, loading } = useInsights();
  const featuredInsight = insights.find(i => i.is_featured) || insights[0];

  return (
    <section id="insights-preview" className="py-8 relative z-10">
      <div className="container-custom px-5 md:px-[37px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative group max-w-[1060px] mx-auto"
        >
          {/* Subtle background glow */}
          <div className="absolute -inset-4 md:-inset-8 bg-purple-400/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 pointer-events-none" />

          <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 lg:p-12 shadow-[0_20px_80px_-20px_rgba(58,15,99,0.08)] border border-slate-100/60 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-stretch relative overflow-hidden">
            
            {/* LEFT SIDE (FEATURED BLOG) */}
            <div className="w-full md:w-5/12 relative z-10 flex items-center">
              {loading || !featuredInsight ? (
                <div className="w-full rounded-[28px] overflow-hidden bg-white border border-slate-200/60 shadow-[0_10px_40px_-10px_rgba(58,15,99,0.05)]">
                  <div className="aspect-[16/9] bg-slate-100 animate-pulse" />
                  <div className="p-5 md:p-6 bg-white flex flex-col gap-3">
                    <div className="h-3 w-1/3 bg-slate-100 rounded animate-pulse" />
                    <div className="h-5 w-3/4 bg-slate-100 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse mt-2" />
                  </div>
                </div>
              ) : (
                <Link to={`/insights/${featuredInsight.slug}`} className="group/card w-full block relative rounded-[28px] overflow-hidden bg-white border border-slate-200/60 shadow-[0_10px_40px_-10px_rgba(58,15,99,0.1)] hover:shadow-[0_20px_60px_-15px_rgba(58,15,99,0.2)] transition-all duration-500">
                  <div className="aspect-[16/9] overflow-hidden relative bg-slate-50">
                    <img 
                      src={featuredInsight.featured_image} 
                      alt={`${featuredInsight.title} - Adibuz Marketing Editorial Preview`} 
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-80" />
                    
                  </div>
                  
                  <div className="p-5 md:p-6 bg-white relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">
                      <span>{new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(featuredInsight.created_at))}</span>
                      <div className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featuredInsight.read_time} MIN READ</span>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-bold text-[#12091f] mb-3 leading-[1.3] group-hover/card:text-primary transition-colors tracking-tight">
                      {featuredInsight.title}
                    </h3>
                    
                    <div className="mt-auto flex items-center text-primary font-bold text-[12px] tracking-wide">
                      Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover/card:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* RIGHT SIDE (MASTER THE MARKET) */}
            <div className="w-full md:w-7/12 space-y-5 md:space-y-6 relative z-10 flex flex-col justify-center pl-0 md:pl-6">
              <h2 className="adibuz-gradient-text text-[clamp(1.9rem,4.5vw,3.2rem)] font-[950] leading-[1.05] tracking-[-0.04em]">
                Master the <br />
                market.
              </h2>

              <p className="text-[#6f667d] text-base md:text-lg font-medium leading-relaxed max-w-xl">
                Explore our library of premium editorial content designed to help you build, scale, and automate modern digital brands with precision.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <MagneticButton>
                  <Link 
                    to="/insights"
                    className="adibuz-button-primary w-full sm:w-auto px-6 py-3 text-[15px] btn-premium"
                  >
                    Read Insights <ArrowRight className="w-5 h-5" />
                  </Link>
                </MagneticButton>
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
};
