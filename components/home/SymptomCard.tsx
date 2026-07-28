"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import type { Symptom } from "@/lib/content/types";

export function SymptomCard({ symptom }: { symptom: Symptom }) {
  return (
    <Link
      href={`/symptoms/${symptom.slug}`}
      onClick={() => track({ name: "symptom_select", symptom: symptom.slug })}
      className="group border border-ink/10 bg-bone px-6 py-6 transition-colors hover:border-teal/40 hover:bg-teal/5"
    >
      <h3 className="font-display text-lg font-semibold text-ink">
        {symptom.shortLabel}
      </h3>
      <p className="prose-measure mt-2 text-sm leading-6 text-ink/65">
        {symptom.overview}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
        Explore
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}
