import { generalFaqs } from "@/lib/content/faqs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { ClinicLocation } from "@/components/shared/ClinicLocation";
import { BookingCTA } from "@/components/shared/BookingCTA";
import { CallAction } from "@/components/shared/CallAction";

/** Section 10: FAQs, location and a final, unambiguous booking action. */
export function FaqLocationCta() {
  return (
    <>
      <section className="py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
          <div className="mt-8">
            <FAQAccordion faqs={generalFaqs} />
          </div>
        </Container>
      </section>

      <section className="bg-bone-dim py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Visit us" title="Find London Heart Centre" />
          <div className="mt-10">
            <ClinicLocation />
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 text-bone sm:py-24">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Ready to talk to our team?
          </h2>
          <p className="prose-measure text-stone">
            Book a consultation online, or call us to discuss the right next
            step for you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookingCTA source="homepage_final_cta" size="lg" />
            <CallAction source="homepage_final_cta" variant="button" className="border-bone/25 text-bone hover:border-bone/50 hover:bg-bone/10" />
          </div>
        </Container>
      </section>
    </>
  );
}
