"use client";

import { cn } from "@/lib/utils";

type ShapeMode = 'full' | 'mobile' | 'low';

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-[#7C3AED]/[0.15]",
    mode = 'full',
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
    mode?: ShapeMode;
}) {
    const shouldAnimate = mode !== 'low';

    return (
        <div
            className={cn("absolute adibuz-floating-shape", className)}
            style={{
                animation: shouldAnimate
                    ? `shapeEnter 2.4s cubic-bezier(0.23, 0.86, 0.39, 0.96) ${delay}s both`
                    : 'none',
                transform: shouldAnimate
                    ? undefined
                    : `rotate(${rotate}deg) translate3d(0, 0, 0)`,
                opacity: mode === 'low' ? 0.72 : 1,
                '--end-rotate': `${rotate}deg`,
                '--start-rotate': `${rotate - 15}deg`,
            } as React.CSSProperties}
        >
            <div
                style={{
                    width,
                    height,
                    animation: shouldAnimate ? 'shapeBob 14s ease-in-out infinite' : 'none',
                    willChange: shouldAnimate ? 'transform' : 'auto',
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "adibuz-shape-surface border border-white/[0.35]",
                        mode === 'low' ? "shadow-none" : "backdrop-blur-sm shadow-[0_10px_40px_rgba(124,58,237,0.25)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.2),transparent_70%)]"
                    )}
                />
            </div>
        </div>
    );
}

export function FloatingPurpleShapes({ mode = 'full' }: { mode?: ShapeMode }) {
    const shapes = [
        {
            delay: 0.3,
            width: mode === 'full' ? 600 : 430,
            height: mode === 'full' ? 140 : 92,
            rotate: 12,
            gradient: "from-[#C4B5FD]/[0.35]",
            className: "left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]",
        },
        {
            delay: 0.5,
            width: mode === 'full' ? 500 : 380,
            height: mode === 'full' ? 120 : 84,
            rotate: -15,
            gradient: "from-[#A78BFA]/[0.32]",
            className: "right-[-5%] md:right-[0%] top-[70%] md:top-[75%]",
        },
        {
            delay: 0.4,
            width: mode === 'full' ? 300 : 230,
            height: mode === 'full' ? 80 : 54,
            rotate: -8,
            gradient: "from-[#8B5CF6]/[0.30]",
            className: "left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]",
        },
        {
            delay: 0.6,
            width: 200,
            height: 60,
            rotate: 20,
            gradient: "from-[#7C3AED]/[0.28]",
            className: "right-[15%] md:right-[20%] top-[10%] md:top-[15%]",
        },
        {
            delay: 0.7,
            width: 150,
            height: 40,
            rotate: -25,
            gradient: "from-[#E9D5FF]/[0.30]",
            className: "left-[20%] md:left-[25%] top-[5%] md:top-[10%]",
        },
    ];
    const visibleShapes = mode === 'full' ? shapes : shapes.slice(0, mode === 'low' ? 2 : 3);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 adibuz-floating-shapes">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-violet-500/[0.05] md:blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                {visibleShapes.map((shape) => (
                    <ElegantShape key={`${shape.rotate}-${shape.width}`} {...shape} mode={mode} />
                ))}
            </div>
        </div>
    );
}
