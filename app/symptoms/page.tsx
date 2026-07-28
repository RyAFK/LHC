import type { Metadata } from "next";
import { symptoms } from "@/lib/content/symptoms";
import { conditions } from "@/lib/content/conditions";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { EmergencyNotice } from "@/components/shared/EmergencyNotice";
import { SymptomCard } from "@/components/home/SymptomCard";
import { ConditionCard } from "@/components/home/ConditionCard";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Symptoms & Conditions",
  description:
    "Understand common cardiac symptoms and conditions, and how London Heart Centre approaches assessment for each.",
  path: "/symptoms",
});

export default function SymptomsIndexPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Symptoms & Conditions", path: "/symptoms" },
            ])
          ),
        }}
      />

      <div className="border-b border-ink/10 bg-bone-dim py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Symptoms & Conditions", path: "/symptoms" }]} />
          <Reveal scale>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
              Symptoms & Conditions
            </h1>
            <p className="prose-measure mt-4 text-base leading-7 text-ink/70">
              Explore common symptoms and cardiac conditions to understand how
              London Heart Centre approaches assessment. This is general
              information, not a diagnosis.
            </p>
          </Reveal>
        </Container>
      </div>

      <Container className="py-12">
        <EmergencyNotice />

        <section className="mt-12">
          <Reveal>
            <SectionHeading eyebrow="Symptoms" title="Browse by symptom" />
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {symptoms.map((symptom, i) => (
              <Reveal key={symptom.slug} delayMs={Math.min(i, 5) * 100}>
                <SymptomCard symptom={symptom} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <Reveal>
            <SectionHeading eyebrow="Conditions" title="Browse by condition" />
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {conditions.map((condition, i) => (
              <Reveal key={condition.slug} delayMs={Math.min(i, 5) * 100}>
                <ConditionCard condition={condition} />
              </Reveal>
            ))}
          </div>
        </section>
      </Container>
    </article>
  );
}
