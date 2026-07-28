import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tests, getTestBySlug } from "@/lib/content/tests";
import { TestPage } from "@/components/templates/TestPage";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return tests.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const test = getTestBySlug(slug);
  if (!test) return {};

  return pageMetadata({
    title: test.name,
    description: test.clinicalPurpose,
    path: `/tests/${test.slug}`,
  });
}

export default async function TestDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const test = getTestBySlug(slug);
  if (!test) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Tests & Prices", path: "/tests" },
              { name: test.name, path: `/tests/${test.slug}` },
            ]),
            serviceJsonLd(test),
          ]),
        }}
      />
      <TestPage test={test} />
    </>
  );
}
