"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import type { Symptom } from "@/lib/content/types";
import { symptomIcons } from "@/components/home/symptomIcons";
import { ArrowRightIcon, ActivityIcon } from "@/components/icons/Icons";

export function SymptomCard({ symptom }: { symptom: Symptom }) {
  const SymptomIcon = symptomIcons[symptom.slug] ?? ActivityIcon;

  return (
    <Link
      href={`/symptoms/${symptom.slug}`}
      onClick={() => track({ name: "symptom_select", symptom: symptom.slug })}
      className="group border border-ink/10 bg-bone px-6 py-6 transition-colors hover:border-teal/40 hover:bg-teal/5"
    >
      <span className="flex h-11 w-11 items-center justify-center border border-teal/25 bg-teal/8 text-teal transition-colors group-hover:border-teal/50 group-hover:bg-teal/15">
        <SymptomIcon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink">
        {symptom.shortLabel}
      </h3>
      <p className="prose-measure mt-2 text-sm leading-6 text-ink/65">
        {symptom.overview}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
        Explore
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
