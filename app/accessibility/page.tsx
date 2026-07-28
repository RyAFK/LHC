import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CallAction } from "@/components/shared/CallAction";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Accessibility Statement",
  description: "London Heart Centre's commitment to an accessible website, targeting WCAG 2.2 AA.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Accessibility", path: "/accessibility" }])
          ),
        }}
      />

      <div className="border-b border-ink/10 bg-bone-dim py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Accessibility", path: "/accessibility" }]} />
          <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            Accessibility Statement
          </h1>
        </Container>
      </div>

      <Container className="max-w-3xl py-12">
        <p className="prose-measure text-sm leading-6 text-ink/75">
          This website is designed to meet WCAG 2.2 Level AA. We aim for
          clear navigation, visible keyboard focus, sufficient colour
          contrast, sensible heading structure, labelled forms with helpful
          validation messages, and full support for reduced-motion
          preferences.
        </p>

        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-ink">
            Known limitations
          </h2>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
            {"The animated hero sequence currently falls back to a static poster because the underlying video/frame asset has not yet been added to the site — see the project README. Full audits against WCAG 2.2 AA are noted in that document and should be re-run before launch."}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-ink">
            Reporting an accessibility issue
          </h2>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
            If you find any part of this site difficult to use, please
            contact our team so we can address it.
          </p>
          <div className="mt-4">
            <CallAction source="accessibility_page" />
          </div>
        </section>
      </Container>
    </article>
  );
}
