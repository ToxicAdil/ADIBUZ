import React, { memo, useEffect, useRef, useState } from 'react';
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

function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isVisible) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-40px 0px', threshold: 0.08 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  return [ref, isVisible] as const;
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
    const [cardRef, cardVisible] = useRevealOnce<HTMLDivElement>();
    const [mediaRef, mediaVisible] = useRevealOnce<HTMLDivElement>();

    const mediaClassName = `adibuz-scale-reveal${mediaVisible ? ' is-visible' : ''} relative w-full aspect-[4/3] lg:w-[340px] lg:min-w-[340px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5`;

    return (
      <section
        id={id}
        className="py-8 relative"
        style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px', ...style }}
        aria-label={typeof title === 'string' ? title : label}
      >
        <div className="container-custom">
          <div
            ref={cardRef}
            className={`adibuz-reveal${cardVisible ? ' is-visible' : ''} premium-card mx-auto max-w-[1060px] rounded-3xl md:rounded-[28px] p-6 md:p-10 lg:py-12 lg:px-14 overflow-hidden`}
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-center relative z-10">
              {!videoRight && (
                <div ref={mediaRef} className={mediaClassName}>
                  {videoSlot}
                </div>
              )}

              <div
                className={`flex-1 w-full lg:max-w-[440px] space-y-8 text-center lg:text-left${
                  videoRight ? ' order-2 lg:order-1' : ''
                }`}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="adibuz-kicker">{label}</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="adibuz-heading !text-[1.75rem] md:!text-[2.25rem] lg:!text-[2.5rem]">
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
                <div ref={mediaRef} className={`${mediaClassName} order-1 lg:order-2`}>
                  {videoSlot}
                </div>
              )}
            </div>
            <div
              className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>
    );
  }
);

ServiceDetailSection.displayName = 'ServiceDetailSection';

export { ServiceDetailSection };
