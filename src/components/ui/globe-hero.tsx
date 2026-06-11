"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { lazy, Suspense } from "react";

// Detect mobile once at module level
const isMobileDevice =
  typeof window !== "undefined" &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) ||
    window.innerWidth < 768);

// Defer Three.js loading — only on desktop, only after idle
const ThreeGlobe = !isMobileDevice
  ? lazy(() =>
      import("./globe-three-inner").then((m) => ({
        default: m.ThreeGlobeInner,
      }))
    )
  : null;

interface DotGlobeHeroProps {
  rotationSpeed?: number;
  globeRadius?: number;
  className?: string;
  children?: React.ReactNode;
}

const EmptyGlobeFallback = () => <div className="h-full w-full" aria-hidden="true" />;

const DotGlobeHero = React.forwardRef<HTMLDivElement, DotGlobeHeroProps>(
  ({ rotationSpeed = 0.005, globeRadius = 1.3, className, children, ...props }, ref) => {
    // On mobile, never attempt to load Three.js
    const [showThree, setShowThree] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (isMobileDevice) return; // Never show Three on mobile

      let timer: ReturnType<typeof setTimeout> | null = null;
      let idleHandle: number | null = null;

      const revealThree = () => {
        timer = setTimeout(() => setShowThree(true), 600);
      };

      if ("requestIdleCallback" in window) {
        idleHandle = (window as any).requestIdleCallback(revealThree, { timeout: 2200 });
      } else {
        revealThree();
      }

      return () => {
        if (timer) clearTimeout(timer);
        if (idleHandle !== null && "cancelIdleCallback" in window) {
          (window as any).cancelIdleCallback(idleHandle);
        }
      };
    }, []);

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          "relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center",
          className
        )}
        {...props}
      >
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.12] md:opacity-[0.18]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          style={{ willChange: "opacity" }}
          aria-hidden="true"
        >
          {!isMobileDevice && showThree && ThreeGlobe ? (
            <Suspense fallback={<EmptyGlobeFallback />}>
              <ThreeGlobe radius={globeRadius} speed={rotationSpeed} />
            </Suspense>
          ) : null}
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-[37px] flex flex-col items-center justify-center text-center">
          {children}
        </div>
      </div>
    );
  }
);

DotGlobeHero.displayName = "DotGlobeHero";

export { DotGlobeHero, type DotGlobeHeroProps };
