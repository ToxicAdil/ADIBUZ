import React from 'react';
import { motion } from 'motion/react';

const proofPoints = [
  { value: '6', label: 'Countries' },
  { value: '40+', label: 'Systems Built' },
  { value: '8', label: 'Growth Channels' },
];

const ImpactStatement = () => {
  return (
    <section className="w-full py-12 md:py-20 relative bg-transparent px-5 md:px-[37px] overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/6 blur-[130px] pointer-events-none z-0" />
      
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-6xl overflow-hidden rounded-[34px] border border-[rgba(58,15,99,0.10)] bg-white/72 px-6 py-10 text-center shadow-[0_24px_80px_rgba(22,8,43,0.07)] backdrop-blur-xl md:px-10 md:py-14"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-purple-400/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl">
          <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
            className="adibuz-kicker mx-auto mb-7"
          >
            Serving clients across multiple countries worldwide
          </motion.span>

          <motion.div
             initial={{ opacity: 0, y: 34 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          >
            <h2 className="adibuz-gradient-text text-[30px] sm:text-[40px] md:text-[58px] lg:text-[68px] font-[950] leading-[1.02] tracking-[-0.045em]">
              Scalable growth systems for brands that want real results.
            </h2>
          </motion.div>

          <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-relaxed text-[#6f667d] md:text-lg">
            Strategy, creative, performance, and automation aligned into one clean operating system.
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-3">
            {proofPoints.map((item) => (
              <div key={item.label} className="rounded-2xl border border-[rgba(58,15,99,0.10)] bg-white/78 px-3 py-4 shadow-sm">
                <p className="text-2xl font-black tracking-tight text-primary md:text-3xl">{item.value}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#827891]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default ImpactStatement;
