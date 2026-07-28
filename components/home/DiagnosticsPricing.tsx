import { tests } from "@/lib/content/tests";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestCard } from "@/components/home/TestCard";

/** Section 7: diagnostics presented as healthcare services, never as e-commerce products. */
export function DiagnosticsPricing() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Tests & prices"
          title="Diagnostics, explained clearly"
          lede="Every diagnostic service explains its clinical purpose, what to expect, and pricing — never displayed as a retail product."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => (
            <TestCard key={test.slug} test={test} />
          ))}
        </div>
      </Container>
    </section>
  );
}
