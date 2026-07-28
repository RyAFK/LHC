import type { DiagnosticTest } from "@/lib/content/types";
import { symptoms as allSymptoms } from "@/lib/content/symptoms";
import { conditions as allConditions } from "@/lib/content/conditions";
import { specialists as allSpecialists } from "@/lib/content/specialists";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { RelatedLinkList } from "@/components/shared/RelatedLinkList";
import { SpecialistCard } from "@/components/shared/SpecialistCard";
import { PriceSummary } from "@/components/shared/PriceSummary";
import { BookingCTA } from "@/components/shared/BookingCTA";
import { ViewTracker } from "@/components/shared/ViewTracker";
import { testIcons } from "@/components/home/testIcons";
import { ActivityIcon } from "@/components/icons/Icons";

const facts: { label: string; key: keyof DiagnosticTest }[] = [
  { label: "Approximate duration", key: "approximateDuration" },
  { label: "Preparation", key: "preparation" },
  { label: "Results timing", key: "resultsTiming" },
];

export function TestPage({ test }: { test: DiagnosticTest }) {
  const symptoms = allSymptoms.filter((s) => test.relevantSymptoms.includes(s.slug));
  const conditions = allConditions.filter((c) => test.relevantConditions.includes(c.slug));
  const specialists = allSpecialists.filter((s) => test.relevantSpecialists.includes(s.slug));
  const TestIcon = testIcons[test.slug] ?? ActivityIcon;

  return (
    <article>
      <ViewTracker event={{ name: "test_view", test: test.slug }} />

      <div className="border-b border-ink/10 bg-bone-dim py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Tests & Prices", path: "/tests" },
              { name: test.name, path: `/tests/${test.slug}` },
            ]}
          />
          <span className="mt-4 flex h-12 w-12 items-center justify-center border border-teal/25 bg-teal/8 text-teal">
            <TestIcon className="h-6 w-6" />
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            {test.name}
          </h1>
          <p className="prose-measure mt-4 text-base leading-7 text-ink/70">
            {test.clinicalPurpose}
          </p>
        </Container>
      </div>

      <Container className="max-w-3xl py-12">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">
            What this test measures
          </h2>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
            {test.whatItMeasures}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">
            What to expect
          </h2>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
            {test.whatToExpect}
          </p>
        </section>

        <dl className="mono-label mt-10 grid grid-cols-1 gap-6 border-y border-ink/10 py-6 text-xs sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-ink/40">{fact.label}</dt>
              <dd className="mt-1 normal-case text-sm text-ink/80">{test[fact.key] as string}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-8">
          <PriceSummary price={test.price} className="text-2xl" />
          <BookingCTA
            source={`test_${test.slug}`}
            label={test.price.kind === "fixed" ? "Book this test" : "Request this test"}
            size="lg"
          />
        </div>

        <section className="mt-10 grid gap-10 sm:grid-cols-3">
          <RelatedLinkList
            title="Relevant symptoms"
            items={symptoms.map((s) => ({ label: s.shortLabel, href: `/symptoms/${s.slug}` }))}
          />
          <RelatedLinkList
            title="Relevant conditions"
            items={conditions.map((c) => ({ label: c.name, href: `/conditions/${c.slug}` }))}
          />
        </section>

        {specialists.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-xl font-semibold text-ink">
              Specialists performing this test
            </h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {specialists.map((s) => (
                <SpecialistCard key={s.slug} specialist={s} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}
