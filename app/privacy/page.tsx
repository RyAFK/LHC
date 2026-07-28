import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How London Heart Centre collects, uses and protects your personal and medical information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }])
          ),
        }}
      />

      <div className="border-b border-ink/10 bg-bone-dim py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }]} />
          <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            Privacy Policy
          </h1>
        </Container>
      </div>

      <Container className="max-w-3xl py-12">
        <p className="mono-label text-xs text-bronze">
          [VERIFY] Full policy to be drafted and approved by LHC and its data protection adviser
        </p>

        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-ink">
            The information we collect
          </h2>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
            We collect information you provide directly, such as your name
            and contact details when booking a consultation or contacting
            us, and clinical information shared with your consultant as part
            of your care.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-ink">
            How we use your information
          </h2>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
            Your information is used to provide and coordinate your care,
            communicate with you and, where relevant, your referring
            clinician, and to meet our legal and regulatory obligations.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-ink">
            Your rights
          </h2>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
            You have rights over your personal data under UK data protection
            law, including the right to access, correct or request deletion
            of your information. Contact us using the details below to
            exercise these rights.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-ink">Contact</h2>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
            {siteConfig.name}, {siteConfig.address.line1},{" "}
            {siteConfig.address.locality} {siteConfig.address.postcode}.
            Telephone {siteConfig.telephone}.
          </p>
        </section>
      </Container>
    </article>
  );
}
