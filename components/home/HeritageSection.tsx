import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Section 9: longevity as evidence of experience, without feeling old-fashioned. */
export function HeritageSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-bone sm:py-28">
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute -right-4 -top-6 select-none text-[9rem] font-bold leading-none text-bone/[0.04] sm:-top-10 sm:text-[16rem]"
      >
        1978
      </span>

      <Container className="relative max-w-4xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-bronze" />
            <p className="mono-label text-xs text-bronze">Est. 1978 [VERIFY]</p>
          </div>
          <h2 className="prose-measure mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Specialist heart care in London since 1978.
          </h2>
          <p className="prose-measure mt-5 max-w-xl text-base leading-7 text-stone">
            Cardiology has changed a great deal since 1978 — our approach has
            kept pace with it. Every consultant here works from the same
            principle the clinic was founded on: careful assessment, precise
            diagnostics, and a plan explained in terms you actually understand.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
