import type { Insurer } from "@/lib/content/types";

// Listed insurers are the most commonly recognised UK private medical
// insurers. None of these relationships have been confirmed — treat every
// entry as provisional until LHC confirms current agreements.
export const insurers: Insurer[] = [
  { name: "Bupa", status: "confirm_before_launch" },
  { name: "AXA Health", status: "confirm_before_launch" },
  { name: "Vitality", status: "confirm_before_launch" },
  { name: "Aviva", status: "confirm_before_launch" },
  { name: "WPA", status: "confirm_before_launch" },
  { name: "Cigna", status: "confirm_before_launch" },
];
