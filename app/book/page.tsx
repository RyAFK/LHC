import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CallAction } from "@/components/shared/CallAction";
import { InsurerPanel } from "@/components/shared/InsurerPanel";
import { BookingRequestForm } from "@/components/templates/BookingRequestForm";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a Consultation",
  description:
    "Book a consultation at London Heart Centre — self-pay, insured or by GP referral.",
  path: "/book",
});

export default function BookPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Book", path: "/book" }])
          ),
        }}
      />

      <div className="border-b border-ink/10 bg-bone-dim py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Book", path: "/book" }]} />
          <Reveal scale>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
              Book a consultation
            </h1>
            <p className="prose-measure mt-4 text-base leading-7 text-ink/70">
              No GP referral is required to book as a self-pay patient. If
              you&rsquo;re using private medical insurance, please confirm your
              cover with your insurer beforehand.
            </p>
            <div className="mt-5">
              <CallAction source="book_page" />
            </div>
          </Reveal>
        </Container>
      </div>

      {/* Form not gated behind scroll reveal — this page's whole purpose is the form. */}
      <Container className="max-w-2xl py-12">
        <h2 className="font-display text-xl font-semibold text-ink">
          Request an appointment
        </h2>
        <p className="prose-measure mt-2 mb-8 text-sm leading-6 text-ink/70">
          Prefer to book by phone? Call us and our team will arrange your
          consultation directly.
        </p>
        <BookingRequestForm />

        <Reveal className="mt-14">
          <InsurerPanel />
        </Reveal>
      </Container>
    </article>
  );
}
