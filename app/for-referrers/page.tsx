import type { Metadata } from "next";
import { ReferralPage } from "@/components/templates/ReferralPage";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "For Referrers",
  description:
    "A dedicated referral pathway for GPs and healthcare professionals referring patients to London Heart Centre.",
  path: "/for-referrers",
});

export default function ForReferrersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "For Referrers", path: "/for-referrers" },
            ])
          ),
        }}
      />
      <ReferralPage />
    </>
  );
}
