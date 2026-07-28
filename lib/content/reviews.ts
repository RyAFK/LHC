import type { PatientReview } from "@/lib/content/types";

// No verified Doctify review excerpts have been supplied yet. Do not add
// fabricated quotes here — leave this empty until LHC provides real,
// attributable excerpts with permission to publish. The patient experience
// section renders an honest "pending" state when this array is empty.
export const verifiedReviews: PatientReview[] = [];

export const doctifyProfileUrl = "https://www.doctify.com/"; // [VERIFY] exact profile URL
