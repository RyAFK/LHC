// Placeholder redirect map for the previous Shopify storefront. The old
// site's URL structure has not been supplied — populate `source` with real
// Shopify paths (e.g. "/products/ecg", "/collections/tests") before launch.
// Every entry here is illustrative only. [VERIFY] all sources against the
// live Shopify sitemap before cutover.
export type RedirectRule = {
  source: string;
  destination: string;
  permanent: boolean;
};

export const shopifyRedirects: RedirectRule[] = [
  // Example shape — replace with real Shopify paths:
  // { source: "/products/ecg", destination: "/tests/electrocardiogram", permanent: true },
  // { source: "/collections/diagnostic-tests", destination: "/tests", permanent: true },
  // { source: "/pages/our-doctors", destination: "/specialists", permanent: true },
];
