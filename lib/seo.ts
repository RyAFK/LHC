import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/** Canonical URL builder. Pass a path beginning with "/". */
export function canonical(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

/** Consistent per-page metadata: title, description, canonical and Open Graph. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: canonical(path) },
    openGraph: {
      title: `${title} — ${siteConfig.name}`,
      description,
      url: canonical(path),
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    telephone: siteConfig.telephone,
    logo: `${siteConfig.url}/icon.svg`,
  };
}

export function medicalClinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${siteConfig.url}/#clinic`,
    name: siteConfig.name,
    telephone: siteConfig.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.locality,
      postalCode: siteConfig.address.postcode,
      addressCountry: "GB",
    },
    medicalSpecialty: "Cardiovascular",
    // AggregateRating deliberately omitted: eligibility, provenance and policy
    // compliance for the Doctify figure have not been confirmed. See
    // lib/content/trust.ts for the [VERIFY] status of that figure.
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

export function physicianJsonLd(specialist: {
  name: string;
  slug: string;
  mainSpecialty: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": canonical(`/specialists/${specialist.slug}#physician`),
    name: specialist.name,
    medicalSpecialty: specialist.mainSpecialty,
    image: specialist.image,
    url: canonical(`/specialists/${specialist.slug}`),
    worksFor: {
      "@id": `${siteConfig.url}/#clinic`,
    },
  };
}

export function serviceJsonLd(test: {
  name: string;
  slug: string;
  clinicalPurpose: string;
}) {
  return {
    "@context": "https://schema.org",
    // MedicalTest is the precise schema.org type; Service is included
    // alongside it per the site's SEO requirements.
    "@type": ["MedicalTest", "Service"],
    "@id": canonical(`/tests/${test.slug}#test`),
    name: test.name,
    description: test.clinicalPurpose,
    url: canonical(`/tests/${test.slug}`),
    provider: {
      "@id": `${siteConfig.url}/#clinic`,
    },
  };
}
