import type { Metadata } from "next";
import { conditions } from "@/lib/content/conditions";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ConditionCard } from "@/components/home/ConditionCard";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Conditions",
  description:
    "Cardiac conditions assessed and managed at London Heart Centre, explained in plain English.",
  path: "/conditions",
});

export default function ConditionsIndexPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Conditions", path: "/conditions" },
            ])
          ),
        }}
      />

      <div className="border-b border-ink/10 bg-bone-dim py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Conditions", path: "/conditions" }]} />
          <Reveal scale>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
              Conditions
            </h1>
            <p className="prose-measure mt-4 text-base leading-7 text-ink/70">
              Cardiac conditions assessed and managed at London Heart Centre.
            </p>
          </Reveal>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((condition, i) => (
            <Reveal key={condition.slug} delayMs={Math.min(i, 5) * 100}>
              <ConditionCard condition={condition} headingLevel="h2" />
            </Reveal>
          ))}
        </div>
      </Container>
    </article>
  );
}
