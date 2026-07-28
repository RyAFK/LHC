import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ClinicLocation } from "@/components/shared/ClinicLocation";
import { ContactForm } from "@/components/shared/ContactForm";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact London Heart Centre at 22 Upper Wimpole Street, London, or send a message to our team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])
          ),
        }}
      />

      <div className="border-b border-ink/10 bg-bone-dim py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
          <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            Contact & location
          </h1>
          <p className="prose-measure mt-4 text-base leading-7 text-ink/70">
            Speak to our team about booking a consultation, or send a message
            below.
          </p>
        </Container>
      </div>

      <Container className="max-w-4xl py-12">
        <div className="mb-14">
          <ClinicLocation />
        </div>

        <h2 className="font-display text-xl font-semibold text-ink">Send a message</h2>
        <div className="mt-6 max-w-xl">
          <ContactForm formId="contact_page" />
        </div>
      </Container>
    </article>
  );
}
