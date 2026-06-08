import React, { memo, useEffect, useRef, useState } from 'react';

interface DeferredRenderProps {
  children: React.ReactNode;
  minHeight?: number;
  rootMargin?: string;
}

const DeferredRenderComponent = ({
  children,
  minHeight = 400,
  rootMargin = '900px 0px',
}: DeferredRenderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    const node = containerRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let timeout: number | null = null;
    let activated = false;
    const activationEvents = ['scroll', 'wheel', 'touchmove', 'pointerdown', 'keydown'];

    const cleanupActivation = () => {
      activationEvents.forEach((eventName) => {
        window.removeEventListener(eventName, activate);
      });
      if (timeout !== null) {
        window.clearTimeout(timeout);
        timeout = null;
      }
    };

    const activate = () => {
      if (activated) return;
      activated = true;
      cleanupActivation();

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldRender(true);
            observer?.disconnect();
          }
        },
        { rootMargin: getAdaptiveRootMargin(rootMargin), threshold: 0 }
      );

      observer.observe(node);
    };

    activationEvents.forEach((eventName) => {
      window.addEventListener(eventName, activate, { passive: true, once: true });
    });
    timeout = window.setTimeout(activate, getDeferredActivationDelay());

    return () => {
      cleanupActivation();
      observer?.disconnect();
    };
  }, [rootMargin, shouldRender]);

  return (
    <div
      ref={containerRef}
      style={
        shouldRender
          ? undefined
          : {
              minHeight,
              contentVisibility: 'auto',
              containIntrinsicSize: `auto ${minHeight}px`,
            }
      }
    >
      {shouldRender ? children : null}
    </div>
  );
};

export const DeferredRender = memo(DeferredRenderComponent);

function getAdaptiveRootMargin(rootMargin: string) {
  if (typeof window === 'undefined') return rootMargin;

  const hints = getRuntimeHints();
  const maxAhead = hints.lowPower ? 120 : hints.isMobile ? 180 : 320;
  const firstValue = Number.parseFloat(rootMargin.trim().split(/\s+/)[0]);

  if (!Number.isFinite(firstValue)) return `${maxAhead}px 0px`;
  return `${Math.min(firstValue, maxAhead)}px 0px`;
}

function getDeferredActivationDelay() {
  if (typeof window === 'undefined') return 1800;

  const hints = getRuntimeHints();
  if (hints.lowPower) return 4200;
  if (hints.isMobile) return 3200;
  return 1800;
}

function getRuntimeHints() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const isMobile =
    window.matchMedia('(pointer: coarse)').matches ||
    window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const lowPower =
    isMobile &&
    ((nav.deviceMemory ?? 4) <= 3 ||
      (navigator.hardwareConcurrency ?? 4) <= 4 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  return { isMobile, lowPower };
}
