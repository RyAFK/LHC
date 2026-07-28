import { tests } from "@/lib/content/tests";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestCard } from "@/components/home/TestCard";
import { Reveal } from "@/components/ui/Reveal";

/** Section 7: diagnostics presented as healthcare services, never as e-commerce products. */
export function DiagnosticsPricing() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Tests & prices"
            title="Diagnostics, explained clearly"
            lede="Every diagnostic service explains its clinical purpose, what to expect, and pricing — never displayed as a retail product."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tests.map((test, i) => (
            <Reveal key={test.slug} delayMs={Math.min(i, 5) * 90}>
              <TestCard test={test} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
