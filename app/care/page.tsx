import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PatientPathway } from "@/components/home/PatientPathway";
import { BookingCTA } from "@/components/shared/BookingCTA";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Care at London Heart Centre",
  description:
    "How care works at London Heart Centre: consultant-led assessment, advanced diagnostics and a clear, connected pathway.",
  path: "/care",
});

const pathways = [
  { label: "Investigate symptoms", href: "/symptoms", description: "Start from what you are experiencing." },
  { label: "Heart screening", href: "/screening", description: "A structured check without a specific symptom." },
  { label: "A specific test", href: "/tests", description: "Go directly to diagnostics and pricing." },
  { label: "Referring a patient", href: "/for-referrers", description: "For GPs and healthcare professionals." },
];

export default function CarePage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Care", path: "/care" }])
          ),
        }}
      />

      <div className="border-b border-ink/10 bg-bone-dim py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Care", path: "/care" }]} />
          <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            Care at London Heart Centre
          </h1>
          <p className="prose-measure mt-4 text-base leading-7 text-ink/70">
            Every patient is seen by a consultant cardiologist, supported by
            diagnostics selected for their individual situation — not a
            standard package.
          </p>
        </Container>
      </div>

      <Container className="py-12">
        <SectionHeading eyebrow="Pathways" title="Choose how you'd like to begin" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pathways.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="border border-ink/10 bg-bone px-5 py-5 transition-colors hover:border-teal/40 hover:bg-teal/5"
            >
              <h2 className="font-display text-base font-semibold text-ink">{p.label}</h2>
              <p className="prose-measure mt-2 text-sm text-ink/65">{p.description}</p>
            </Link>
          ))}
        </div>
      </Container>

      <PatientPathway />

      <div className="border-t border-ink/10 py-14">
        <Container className="flex flex-col items-start gap-6">
          <h2 className="font-display text-2xl font-bold text-ink">Ready to begin?</h2>
          <BookingCTA source="care_page" size="lg" />
        </Container>
      </div>
    </article>
  );
}
