import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { conditions, getConditionBySlug } from "@/lib/content/conditions";
import { ConditionPage } from "@/components/templates/ConditionPage";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const condition = getConditionBySlug(slug);
  if (!condition) return {};

  return pageMetadata({
    title: condition.name,
    description: condition.overview,
    path: `/conditions/${condition.slug}`,
  });
}

export default async function ConditionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const condition = getConditionBySlug(slug);
  if (!condition) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Conditions", path: "/conditions" },
              { name: condition.name, path: `/conditions/${condition.slug}` },
            ])
          ),
        }}
      />
      <ConditionPage condition={condition} />
    </>
  );
}
