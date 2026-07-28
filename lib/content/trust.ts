import type { TrustStat } from "@/lib/content/types";

// Confirm before launch: every value below is provisional. None should be
// hard-coded into more than this single source of truth — components must
// import from here rather than restating figures inline.
export const trustStats: TrustStat[] = [
  {
    label: "Established",
    value: "Established in 1978",
    monoCode: "EST.1978",
    status: "confirm_before_launch",
  },
  {
    label: "Patient rating",
    value: "4.93 out of 5 from 207 Doctify reviews",
    monoCode: "4.93 / 207",
    status: "confirm_before_launch",
  },
  {
    label: "Specialists",
    value: "19 specialist profiles currently listed",
    monoCode: "×19",
    status: "confirm_before_launch",
  },
  {
    label: "Insurance",
    value: "Major private medical insurers accepted",
    status: "confirm_before_launch",
  },
  {
    label: "Location",
    value: "Central London — Upper Wimpole Street",
    monoCode: "W1G 6NB",
    status: "confirm_before_launch",
  },
];
