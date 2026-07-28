"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import type { Specialist } from "@/lib/content/types";
import { SpecialistAvatar } from "@/components/shared/SpecialistAvatar";

export function SpecialistCard({ specialist }: { specialist: Specialist }) {
  return (
    <div className="flex flex-col border border-ink/10 bg-bone">
      <SpecialistAvatar
        name={specialist.name}
        photo={specialist.photo}
        className="aspect-[4/3] border-b border-ink/10"
      />

      <div className="flex flex-1 flex-col p-6">
        {specialist.profileStatus === "sample" && (
          <p className="mono-label text-[0.65rem] text-bronze">Sample profile — confirm before launch</p>
        )}
        <h3 className="mt-1 font-display text-lg font-semibold text-ink">
          {specialist.name.replace(" [VERIFY]", "")}
        </h3>
        <p className="text-sm text-ink/60">{specialist.credentials.replace(" [VERIFY]", "")}</p>
        <p className="mt-2 text-sm font-medium text-teal">{specialist.mainSpecialty}</p>

        {specialist.nhsAppointment && (
          <p className="mono-label mt-2 text-[0.65rem] text-ink/40">NHS appointment available</p>
        )}

        <ul className="prose-measure mt-4 space-y-1 text-sm text-ink/70">
          {specialist.patientConcerns.slice(0, 3).map((concern) => (
            <li key={concern} className="flex items-start gap-2">
              <span aria-hidden="true" className="mt-1 text-bronze">·</span>
              {concern}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-5">
          <Link
            href={`/specialists/${specialist.slug}`}
            onClick={() => track({ name: "specialist_select", specialist: specialist.slug })}
            className="text-sm font-semibold text-ink underline underline-offset-4 hover:text-teal"
          >
            View profile
          </Link>
          <Link
            href="/book"
            onClick={() => track({ name: "cta_book_click", source: `specialist_card_${specialist.slug}` })}
            className="text-sm font-semibold text-teal"
          >
            Book appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
