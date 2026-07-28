import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { TrustRail } from "@/components/shared/TrustRail";
import { RouteSelector } from "@/components/home/RouteSelector";
import { SymptomsNavigator } from "@/components/home/SymptomsNavigator";
import { PatientPathway } from "@/components/home/PatientPathway";
import { FeaturedSpecialists } from "@/components/home/FeaturedSpecialists";
import { DiagnosticsPricing } from "@/components/home/DiagnosticsPricing";
import { PatientExperienceInsurers } from "@/components/home/PatientExperienceInsurers";
import { HeritageSection } from "@/components/home/HeritageSection";
import { FaqLocationCta } from "@/components/home/FaqLocationCta";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — Consultant-led cardiology in London`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustRail />
      <RouteSelector />
      <SymptomsNavigator />
      <PatientPathway />
      <FeaturedSpecialists />
      <DiagnosticsPricing />
      <PatientExperienceInsurers />
      <HeritageSection />
      <FaqLocationCta />
    </>
  );
}
