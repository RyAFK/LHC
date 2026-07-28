// Central facts: contact details, navigation, and provisional/verifiable claims.
// Anything marked [VERIFY] must be confirmed by LHC before launch.

export const siteConfig = {
  name: "London Heart Centre",
  shortName: "LHC",
  url: "https://www.londonheartcentre.example", // [VERIFY] production domain
  telephone: "020 7034 4030",
  telephoneHref: "tel:+442070344030",
  address: {
    line1: "22 Upper Wimpole Street",
    locality: "London",
    postcode: "W1G 6NB",
    country: "United Kingdom",
  },
  emergencyNumber: "999",
  description:
    "Consultant-led cardiology, advanced diagnostics and clear next steps at 22 Upper Wimpole Street, London.",
} as const;

export const emergencyNoticeText =
  "This website does not provide medical diagnosis. If you have sudden chest pain that does not go away, or chest pain accompanied by sweating, sickness, light-headedness or shortness of breath, call 999.";

export const emergencyNoticeLink = "https://www.nhs.uk/symptoms/chest-pain/";

export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "Care", href: "/care" },
  { label: "Symptoms & Conditions", href: "/symptoms" },
  { label: "Tests & Prices", href: "/tests" },
  { label: "Specialists", href: "/specialists" },
  { label: "For Referrers", href: "/for-referrers" },
  { label: "About", href: "/about" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Care",
    links: [
      { label: "Care pathways", href: "/care" },
      { label: "Heart screening", href: "/screening" },
      { label: "Symptoms & conditions", href: "/symptoms" },
      { label: "Tests & prices", href: "/tests" },
    ],
  },
  {
    heading: "Clinic",
    links: [
      { label: "Specialists", href: "/specialists" },
      { label: "About London Heart Centre", href: "/about" },
      { label: "For referrers", href: "/for-referrers" },
      { label: "Contact & location", href: "/contact" },
    ],
  },
  {
    heading: "Information",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Accessibility statement", href: "/accessibility" },
      { label: "Book a consultation", href: "/book" },
    ],
  },
];
