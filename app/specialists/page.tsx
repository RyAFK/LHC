import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FeaturedSpecialists } from "@/components/home/FeaturedSpecialists";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Specialists",
  description:
    "Consultant cardiologists at London Heart Centre, filterable by symptom, condition, subspecialty and diagnostic expertise.",
  path: "/specialists",
});

export default function SpecialistsIndexPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Specialists", path: "/specialists" },
            ])
          ),
        }}
      />

      <div className="border-b border-ink/10 bg-bone-dim py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Specialists", path: "/specialists" }]} />
          <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            Specialists
          </h1>
          <p className="prose-measure mt-4 text-base leading-7 text-ink/70">
            Consultant-led cardiology across a range of subspecialties.
          </p>
        </Container>
      </div>

      <FeaturedSpecialists />
    </article>
  );
}
