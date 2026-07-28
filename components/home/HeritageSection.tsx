import { Container } from "@/components/ui/Container";

/** Section 9: longevity as evidence of experience, without feeling old-fashioned. */
export function HeritageSection() {
  return (
    <section className="bg-ink py-20 text-bone sm:py-28">
      <Container className="max-w-4xl">
        <p className="mono-label text-xs text-bronze">Est. 1978 [VERIFY]</p>
        <h2 className="prose-measure mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
          Specialist heart care in London since 1978.
        </h2>
        <p className="prose-measure mt-5 max-w-xl text-base leading-7 text-stone">
          Cardiology has changed a great deal since 1978 — our approach has
          kept pace with it. Every consultant here works from the same
          principle the clinic was founded on: careful assessment, precise
          diagnostics, and a plan explained in terms you actually understand.
        </p>
      </Container>
    </section>
  );
}
