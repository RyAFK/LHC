import { BookingCTA } from "@/components/shared/BookingCTA";
import { CallAction } from "@/components/shared/CallAction";
import { HeroLoop } from "@/components/hero/HeroLoop";

/**
 * The primary, always-static hero content: real H1, supporting copy and the
 * three required calls to action. This renders before any JavaScript runs,
 * so it defines the page's LCP element and remains fully usable with no-JS.
 */
export function HeroIntro() {
  return (
    <div className="relative flex min-h-[86vh] flex-col justify-end overflow-hidden bg-ink px-5 pb-14 pt-28 text-bone sm:px-8 sm:pb-20">
      <HeroLoop />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10 sm:from-ink sm:via-ink/55 sm:to-transparent"
      />

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
