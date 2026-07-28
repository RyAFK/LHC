import type { Symptom } from "@/lib/content/types";
import { tests as allTests } from "@/lib/content/tests";
import { conditions as allConditions } from "@/lib/content/conditions";
import { specialists as allSpecialists } from "@/lib/content/specialists";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { EmergencyNotice } from "@/components/shared/EmergencyNotice";
import { RelatedLinkList } from "@/components/shared/RelatedLinkList";
import { SpecialistCard } from "@/components/shared/SpecialistCard";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { ClinicalReviewFooter } from "@/components/shared/ClinicalReviewFooter";
import { BookingCTA } from "@/components/shared/BookingCTA";

export function SymptomPage({ symptom }: { symptom: Symptom }) {
  const tests = allTests.filter((t) => symptom.possibleAssessments.includes(t.slug));
  const conditions = allConditions.filter((c) => symptom.relevantConditions.includes(c.slug));
  const specialists = allSpecialists.filter((s) => symptom.relevantSpecialists.includes(s.slug));

  return (
    <article>
      <div className="border-b border-ink/10 bg-bone-dim py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Symptoms & Conditions", path: "/symptoms" },
              { name: symptom.name, path: `/symptoms/${symptom.slug}` },
            ]}
          />
          <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            {symptom.name}
          </h1>
          <p className="prose-measure mt-4 text-base leading-7 text-ink/70">
            {symptom.overview}
          </p>
        </Container>
      </div>

      <Container className="max-w-3xl py-12">
        <EmergencyNotice />

        {symptom.redFlags.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-ink">
              When symptoms need urgent attention
            </h2>
            <ul className="prose-measure mt-4 space-y-2 text-sm leading-6 text-ink/75">
              {symptom.redFlags.map((flag) => (
                <li key={flag} className="flex gap-2">
                  <span aria-hidden="true" className="text-oxblood">·</span>
                  {flag}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">
            How London Heart Centre can help
          </h2>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
            {symptom.howLHCCanHelp}
          </p>
          <p className="prose-measure mt-3 text-xs italic text-ink/50">
            This information does not diagnose or triage your symptoms. A
            consultant assessment is required to understand your individual
            situation.
          </p>
        </section>

        <section className="mt-12 grid gap-10 sm:grid-cols-2">
          <RelatedLinkList
            title="Possible assessments"
            items={tests.map((t) => ({ label: t.name, href: `/tests/${t.slug}` }))}
          />
          <RelatedLinkList
            title="Relevant conditions"
            items={conditions.map((c) => ({ label: c.name, href: `/conditions/${c.slug}` }))}
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

        {symptom.faqs.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-xl font-semibold text-ink">FAQs</h2>
            <div className="mt-5">
              <FAQAccordion faqs={symptom.faqs} />
            </div>
          </section>
        )}

        <div className="mt-14">
          <BookingCTA source={`symptom_${symptom.slug}`} size="lg" />
        </div>

        <div className="mt-14">
          <ClinicalReviewFooter review={symptom.review} />
        </div>
      </Container>
    </article>
  );
}
