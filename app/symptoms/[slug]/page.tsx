import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { symptoms, getSymptomBySlug } from "@/lib/content/symptoms";
import { SymptomPage } from "@/components/templates/SymptomPage";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return symptoms.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const symptom = getSymptomBySlug(slug);
  if (!symptom) return {};

  return pageMetadata({
    title: symptom.name,
    description: symptom.overview,
    path: `/symptoms/${symptom.slug}`,
  });
}

export default async function SymptomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const symptom = getSymptomBySlug(slug);
  if (!symptom) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Symptoms & Conditions", path: "/symptoms" },
              { name: symptom.name, path: `/symptoms/${symptom.slug}` },
            ])
          ),
        }}
      />
      <SymptomPage symptom={symptom} />
    </>
  );
}
