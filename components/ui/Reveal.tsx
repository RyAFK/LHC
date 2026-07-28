"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms — use for grids of cards revealing in sequence. */
  delayMs?: number;
};

/**
 * Scroll-triggered reveal: a restrained fade + rise as content enters the
 * viewport, within brand motion limits (16px on one axis, ~650ms,
 * cubic-bezier(.22,1,.36,1), no blur). Fires once — content never
 * re-hides when scrolling back up. Renders children plainly, with no
 * transition, under prefers-reduced-motion.
 */
export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] ${
        inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
      style={{ transitionDelay: inView ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
