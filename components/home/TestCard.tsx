"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import type { DiagnosticTest } from "@/lib/content/types";
import { PriceSummary } from "@/components/shared/PriceSummary";

export function TestCard({ test }: { test: DiagnosticTest }) {
  return (
    <article className="flex flex-col border border-ink/10 bg-bone p-6">
      <h3 className="font-display text-lg font-semibold text-ink">{test.name}</h3>
      <p className="prose-measure mt-2 text-sm leading-6 text-ink/65">
        {test.clinicalPurpose}
      </p>

      <dl className="mono-label mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.7rem] text-ink/50">
        <div>
          <dt className="text-ink/35">Duration</dt>
          <dd className="mt-0.5 normal-case text-ink/70">{test.approximateDuration}</dd>
        </div>
        <div>
          <dt className="text-ink/35">Results</dt>
          <dd className="mt-0.5 normal-case text-ink/70">{test.resultsTiming}</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
        <PriceSummary price={test.price} />
        <Link
          href={`/tests/${test.slug}`}
          onClick={() => track({ name: "test_view", test: test.slug })}
          className="text-sm font-semibold text-teal underline underline-offset-4"
        >
          View test
        </Link>
      </div>
    </article>
  );
}
