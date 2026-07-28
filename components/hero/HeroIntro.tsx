import { BookingCTA } from "@/components/shared/BookingCTA";
import { CallAction } from "@/components/shared/CallAction";

/**
 * The primary, always-static hero content: real H1, supporting copy and the
 * three required calls to action. This renders before any JavaScript runs,
 * so it defines the page's LCP element and remains fully usable with no-JS.
 */
export function HeroIntro() {
  return (
    <div className="relative flex min-h-[86vh] flex-col justify-end overflow-hidden bg-ink px-5 pb-14 pt-28 text-bone sm:px-8 sm:pb-20">
      <HeroPosterBackdrop />

      <div className="prose-measure relative z-10 max-w-2xl">
        <p className="mono-label text-xs text-bronze">
          22 Upper Wimpole Street, London
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Expert heart care, without the uncertainty.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-stone sm:text-lg">
          Consultant-led cardiology, advanced diagnostics and clear next
          steps at 22 Upper Wimpole Street.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <BookingCTA source="hero_primary" size="lg" />
          <a
            href="#where-should-i-start"
            className="inline-flex min-h-11 items-center font-display text-sm font-semibold text-bone underline decoration-bronze/60 underline-offset-4 hover:decoration-bronze"
          >
            Find the right care
          </a>
        </div>
        <div className="mt-5">
          <CallAction source="hero_utility" className="text-bone hover:text-stone" />
        </div>
      </div>
    </div>
  );
}

/**
 * Deliberate static midnight/oxblood poster: flat calibration-mark and
 * scan-line motif, no gradients, blur or particles. Stands in for the hero
 * film until the video asset can be added — see README.
 */
function HeroPosterBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1600 1000"
    >
      <rect width="1600" height="1000" fill="#07161B" />
      {Array.from({ length: 20 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={i * 84}
          y1={0}
          x2={i * 84}
          y2={1000}
          stroke="#5A1F2B"
          strokeWidth={i % 5 === 0 ? 1 : 0.5}
          opacity={i % 5 === 0 ? 0.35 : 0.15}
        />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1={0}
          y1={i * 84}
          x2={1600}
          y2={i * 84}
          stroke="#0E5E5C"
          strokeWidth={i % 4 === 0 ? 1 : 0.5}
          opacity={i % 4 === 0 ? 0.25 : 0.1}
        />
      ))}
      <polyline
        points="0,560 260,560 320,560 380,300 440,760 500,560 620,560 680,460 740,560 1600,560"
        fill="none"
        stroke="#F4F0E8"
        strokeWidth="2.5"
        opacity="0.85"
      />
    </svg>
  );
}
