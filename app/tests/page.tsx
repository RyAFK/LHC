import type { Metadata } from "next";
import { tests } from "@/lib/content/tests";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { TestCard } from "@/components/home/TestCard";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tests & Prices",
  description:
    "Cardiac diagnostic tests at London Heart Centre: clinical purpose, what to expect, and pricing — never sold as retail products.",
  path: "/tests",
});

export default function TestsIndexPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Tests & Prices", path: "/tests" },
            ])
          ),
        }}
      />

      <div className="border-b border-ink/10 bg-bone-dim py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Tests & Prices", path: "/tests" }]} />
          <Reveal scale>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
              Tests & Prices
            </h1>
            <p className="prose-measure mt-4 text-base leading-7 text-ink/70">
              A clinically guided diagnostic pathway — every test explains its
              purpose, what to expect, and pricing, so you know what happens
              next before you book.
            </p>
          </Reveal>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tests.map((test, i) => (
            <Reveal key={test.slug} delayMs={Math.min(i, 5) * 90}>
              <TestCard test={test} />
            </Reveal>
          ))}
        </div>
      </Container>
    </article>
  );
}
