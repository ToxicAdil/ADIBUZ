import React, { memo } from 'react';
import { FadeInUp, ScaleInView } from '@/lib/animations';
import MagneticButton from './MagneticButton';

interface ServiceDetailSectionProps {
  id?: string;
  label: string;
  title: React.ReactNode;
  description: string;
  buttons: string[];
  videoSlot: React.ReactNode;
  /** Kept for API compatibility; videos remain mounted at all breakpoints. */
  posterUrl?: string;
  /** If true the text column appears on the right, video on the left (default: video left) */
  videoRight?: boolean;
  style?: React.CSSProperties;
}

const ServiceDetailSection = memo(
  ({
    id,
    label,
    title,
    description,
    buttons,
    videoSlot,
    videoRight = false,
    style,
  }: ServiceDetailSectionProps) => {
    return (
      <section
        id={id}
        className="py-8 relative"
        style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px', ...style }}
        aria-label={typeof title === 'string' ? title : label}
      >
        <div className="container-custom">
          <FadeInUp className="premium-card rounded-3xl md:rounded-[28px] p-6 md:p-10 lg:py-12 lg:px-14 overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center relative z-10">
              {!videoRight && (
                <ScaleInView
                  delay={0.2}
                  className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5"
                >
                  {videoSlot}
                </ScaleInView>
              )}

              <div
                className={`flex-1 w-full lg:max-w-[500px] space-y-8 text-center lg:text-left${
                  videoRight ? ' order-2 lg:order-1' : ''
                }`}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="adibuz-kicker">{label}</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="adibuz-heading">
                      <span className="adibuz-gradient-text">{title}</span>
                    </h2>
                    <p className="adibuz-subheading max-lg:max-w-lg max-lg:mx-auto">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {buttons.map((btn) => (
                    <MagneticButton key={btn}>
                      <button
                        className="adibuz-button-secondary px-4 sm:px-5 py-2 rounded-xl text-[13px] min-h-[44px]"
                        aria-label={btn}
                      >
                        {btn}
                      </button>
                    </MagneticButton>
                  ))}
                </div>
              </div>

              {videoRight && (
                <ScaleInView
                  delay={0.2}
                  className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5 order-1 lg:order-2"
                >
                  {videoSlot}
                </ScaleInView>
              )}
            </div>
            <div
              className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"
              aria-hidden="true"
            />
          </FadeInUp>
        </div>
      </section>
    );
  }
);

ServiceDetailSection.displayName = 'ServiceDetailSection';

export { ServiceDetailSection };
