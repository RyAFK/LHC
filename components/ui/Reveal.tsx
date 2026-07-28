"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms — use for grids of cards revealing in sequence. */
  delayMs?: number;
  /** Vertical travel distance in pixels. Defaults to a pronounced 44px. */
  distance?: number;
  /** Adds a subtle scale-in for extra depth on larger, standalone blocks. */
  scale?: boolean;
};

/**
 * Scroll-triggered reveal: a deliberate fade + rise as content enters the
 * viewport (44px on one axis by default, 800ms, cubic-bezier(.22,1,.36,1),
 * no blur). Fires once — content never re-hides when scrolling back up.
 * Renders children plainly, with no transition, under prefers-reduced-motion.
 */
export function Reveal({
  children,
  className = "",
  delayMs = 0,
  distance = 44,
  scale = false,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)] ${
        inView ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{
        transitionDelay: inView ? `${delayMs}ms` : "0ms",
        transform: inView
          ? "translateY(0) scale(1)"
          : `translateY(${distance}px) scale(${scale ? 0.94 : 1})`,
      }}
    >
      {children}
    </div>
  );
}
