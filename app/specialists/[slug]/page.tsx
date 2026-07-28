import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { specialists, getSpecialistBySlug } from "@/lib/content/specialists";
import { SpecialistProfile } from "@/components/templates/SpecialistProfile";
import { pageMetadata, breadcrumbJsonLd, physicianJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return specialists.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const specialist = getSpecialistBySlug(slug);
  if (!specialist) return {};

  const displayName = specialist.name.replace(" [VERIFY]", "");

  return pageMetadata({
    title: displayName,
    description: `${displayName} — ${specialist.mainSpecialty} at London Heart Centre.`,
    path: `/specialists/${specialist.slug}`,
  });
}

export default async function SpecialistDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const specialist = getSpecialistBySlug(slug);
  if (!specialist) notFound();

  const displayName = specialist.name.replace(" [VERIFY]", "");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Specialists", path: "/specialists" },
              { name: displayName, path: `/specialists/${specialist.slug}` },
            ]),
            physicianJsonLd({
              name: displayName,
              slug: specialist.slug,
              mainSpecialty: specialist.mainSpecialty,
            }),
          ]),
        }}
      />
      <SpecialistProfile specialist={specialist} />
    </>
  );
}
