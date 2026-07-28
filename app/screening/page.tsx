import type { Metadata } from "next";
import { getTestBySlug } from "@/lib/content/tests";
import { specialists } from "@/lib/content/specialists";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { EmergencyNotice } from "@/components/shared/EmergencyNotice";
import { PriceSummary } from "@/components/shared/PriceSummary";
import { BookingCTA } from "@/components/shared/BookingCTA";
import { SpecialistCard } from "@/components/shared/SpecialistCard";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Heart Screening",
  description:
    "A consultant-led heart screening pathway for people without a diagnosed condition, including those with a family history of heart disease.",
  path: "/screening",
});

export default function ScreeningPage() {
  const test = getTestBySlug("heart-screening")!;
  const relevantSpecialists = specialists.filter((s) =>
    test.relevantSpecialists.includes(s.slug)
  );

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Heart Screening", path: "/screening" }])
          ),
        }}
      />

      <div className="border-b border-ink/10 bg-bone-dim py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Heart Screening", path: "/screening" }]} />
          <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            Heart Screening
          </h1>
          <p className="prose-measure mt-4 text-base leading-7 text-ink/70">
            {test.clinicalPurpose}
          </p>
        </Container>
      </div>

      <Container className="max-w-3xl py-12">
        <EmergencyNotice />

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">
            Who screening is for
          </h2>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
            Heart screening is most relevant if you have no diagnosed heart
            condition but want a clearer picture of your cardiovascular
            health — for example because of a family history of heart
            disease, or as part of general preventive health.
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

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 py-6">
          <PriceSummary price={test.price} className="text-2xl" />
          <BookingCTA source="screening_page" label="Book a screening" size="lg" />
        </div>

        {relevantSpecialists.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold text-ink">
              Specialists offering screening
            </h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {relevantSpecialists.map((s) => (
                <SpecialistCard key={s.slug} specialist={s} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}
