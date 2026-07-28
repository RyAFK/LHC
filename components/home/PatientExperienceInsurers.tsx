import { verifiedReviews, doctifyProfileUrl } from "@/lib/content/reviews";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewQuote, ReviewsPendingNotice } from "@/components/shared/ReviewQuote";
import { InsurerPanel } from "@/components/shared/InsurerPanel";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

/** Section 8: patient experience and insurers. No reviews or insurer relationships are invented. */
export function PatientExperienceInsurers() {
  return (
    <section className="bg-bone-dim py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Patient experience"
            title="What patients tell us"
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {verifiedReviews.length > 0 ? (
            verifiedReviews.map((review, i) => (
              <Reveal key={review.quote} delayMs={i * 110}>
                <ReviewQuote review={review} />
              </Reveal>
            ))
          ) : (
            <div className="lg:col-span-2">
              <Reveal>
                <ReviewsPendingNotice doctifyUrl={doctifyProfileUrl} />
              </Reveal>
            </div>
          )}
        </div>

        <Reveal className="mt-10">
          <InsurerPanel />
        </Reveal>

        <p className="mt-6 text-sm text-ink/70">
          Not sure whether to book as a self-pay or insured patient?{" "}
          <Link href="/book" className="font-semibold text-teal underline underline-offset-4">
            Read our booking guidance
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
