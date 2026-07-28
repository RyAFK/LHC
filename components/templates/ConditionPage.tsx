import type { Condition } from "@/lib/content/types";
import { tests as allTests } from "@/lib/content/tests";
import { specialists as allSpecialists } from "@/lib/content/specialists";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { EmergencyNotice } from "@/components/shared/EmergencyNotice";
import { RelatedLinkList } from "@/components/shared/RelatedLinkList";
import { SpecialistCard } from "@/components/shared/SpecialistCard";
import { ClinicalReviewFooter } from "@/components/shared/ClinicalReviewFooter";
import { BookingCTA } from "@/components/shared/BookingCTA";
import { conditionIcons } from "@/components/home/conditionIcons";
import { ActivityIcon } from "@/components/icons/Icons";

export function ConditionPage({ condition }: { condition: Condition }) {
  const tests = allTests.filter((t) => condition.relevantTests.includes(t.slug));
  const specialists = allSpecialists.filter((s) =>
    condition.relevantSpecialists.includes(s.slug)
  );
  const ConditionIcon = conditionIcons[condition.slug] ?? ActivityIcon;

  return (
    <article>
      <div className="border-b border-ink/10 bg-bone-dim py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Symptoms & Conditions", path: "/symptoms" },
              { name: condition.name, path: `/conditions/${condition.slug}` },
            ]}
          />
          <span className="mt-4 flex h-12 w-12 items-center justify-center border border-teal/25 bg-teal/8 text-teal">
            <ConditionIcon className="h-6 w-6" />
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            {condition.name}
          </h1>
          <p className="prose-measure mt-4 text-base leading-7 text-ink/70">
            {condition.overview}
          </p>
        </Container>
      </div>

      <Container className="max-w-3xl py-12">
        <EmergencyNotice />

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">
            Common symptoms
          </h2>
          <ul className="prose-measure mt-4 space-y-2 text-sm leading-6 text-ink/75">
            {condition.commonSymptoms.map((symptom) => (
              <li key={symptom} className="flex gap-2">
                <span aria-hidden="true" className="text-bronze">·</span>
                {symptom}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 border-l-4 border-oxblood bg-oxblood/5 px-5 py-4">
          <h2 className="font-display text-base font-semibold text-ink">
            When to seek urgent care
          </h2>
          <p className="prose-measure mt-2 text-sm leading-6 text-ink/75">
            {condition.urgentCareGuidance}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">
            How this is assessed
          </h2>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
            {condition.assessmentOverview}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">
            Treatment and management
          </h2>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
            {condition.treatmentOverview}
          </p>
        </section>

        <section className="mt-12">
          <RelatedLinkList
            title="Relevant tests"
            items={tests.map((t) => ({ label: t.name, href: `/tests/${t.slug}` }))}
          />
        </section>

        {specialists.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-xl font-semibold text-ink">
              Relevant specialists
            </h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {specialists.map((s) => (
                <SpecialistCard key={s.slug} specialist={s} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-14">
          <BookingCTA source={`condition_${condition.slug}`} size="lg" />
        </div>

        <div className="mt-14">
          <ClinicalReviewFooter review={condition.review} />
        </div>
      </Container>
    </article>
  );
}
