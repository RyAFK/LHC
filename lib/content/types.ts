// Typed content models for London Heart Centre.
//
// Fields typed as `VerifiableText` or flagged `[VERIFY]` in their comments
// represent claims that must be confirmed by LHC's clinical and marketing
// teams before launch — see the [VERIFY] checklist in README.md.

export type Source = {
  label: string;
  href?: string;
};

export type ClinicalReview = {
  reviewerName: string; // [VERIFY] named clinical reviewer
  reviewerRole: string;
  publishedDate: string; // ISO date
  reviewDate: string; // ISO date — next scheduled review
  sources: Source[];
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Symptom = {
  slug: string;
  name: string;
  shortLabel: string;
  overview: string;
  redFlags: string[];
  howLHCCanHelp: string;
  possibleAssessments: string[]; // test slugs
  relevantConditions: string[]; // condition slugs
  relevantSpecialists: string[]; // specialist slugs
  faqs: FAQ[];
  review: ClinicalReview;
};

export type Condition = {
  slug: string;
  name: string;
  overview: string;
  commonSymptoms: string[];
  urgentCareGuidance: string;
  assessmentOverview: string;
  treatmentOverview: string;
  relevantTests: string[]; // test slugs
  relevantSpecialists: string[]; // specialist slugs
  review: ClinicalReview;
};

export type TestPrice =
  | { kind: "fixed"; amountGBP: number }
  | { kind: "confirmed_after_assessment" };

export type DiagnosticTest = {
  slug: string;
  name: string;
  shortLabel: string;
  clinicalPurpose: string;
  whatItMeasures: string;
  whatToExpect: string;
  approximateDuration: string;
  preparation: string;
  resultsTiming: string;
  price: TestPrice;
  relevantSymptoms: string[]; // symptom slugs
  relevantConditions: string[]; // condition slugs
  relevantSpecialists: string[]; // specialist slugs
};

export type SpecialistAvailability = {
  summary: string; // e.g. "Clinics on Tuesdays and Thursdays" — [VERIFY]
};

export type PatientReview = {
  quote: string;
  attribution: string;
  source: "Doctify";
  verified: boolean; // must be true and sourced before display
};

export type Specialist = {
  slug: string;
  /**
   * "sample" profiles use placeholder names and biographical details to
   * demonstrate the page template. They must be replaced with real,
   * consultant-approved profiles before launch — see the [VERIFY] checklist.
   */
  profileStatus: "sample" | "verified";
  name: string;
  credentials: string; // e.g. "MA, MD, FRCP"
  mainSpecialty: string;
  specialistInterests: string[];
  patientConcerns: string[]; // 2-3 shown on card
  nhsAppointment: boolean; // [VERIFY] per consultant
  conditionsTreated: string[]; // condition slugs
  testsPerformed: string[]; // test slugs
  training: string[]; // [VERIFY]
  researchPublications: string[]; // [VERIFY]
  languages: string[];
  availability: SpecialistAvailability;
  reviews: PatientReview[];
  imagePlaceholder: string; // path to placeholder headshot asset
};

export type TrustStat = {
  label: string;
  value: string;
  monoCode?: string; // e.g. "EST.1978"
  status: "confirm_before_launch" | "verified";
};

export type Insurer = {
  name: string;
  status: "confirm_before_launch" | "verified";
};
