import { HeroIntro } from "@/components/hero/HeroIntro";
import { HeroSequence } from "@/components/hero/HeroSequence";

/**
 * Full cinematic hero: a static, always-visible intro (real H1, supporting
 * copy, primary/secondary/utility CTAs) followed by the scroll-scrubbed
 * three-chapter sequence. See README for the current asset status and the
 * static/animated fallback strategy.
 */
export function Hero() {
  return (
    <section aria-label="Introduction">
      <HeroIntro />
      <HeroSequence />
    </section>
  );
}
