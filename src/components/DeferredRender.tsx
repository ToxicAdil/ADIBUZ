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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
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
