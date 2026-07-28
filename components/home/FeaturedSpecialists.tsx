"use client";

import { useMemo, useState } from "react";
import { specialists } from "@/lib/content/specialists";
import { symptoms } from "@/lib/content/symptoms";
import { conditions } from "@/lib/content/conditions";
import { tests } from "@/lib/content/tests";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecialistCard } from "@/components/shared/SpecialistCard";
import { Reveal } from "@/components/ui/Reveal";

const ANY = "any";

export function FeaturedSpecialists() {
  const [symptomFilter, setSymptomFilter] = useState(ANY);
  const [conditionFilter, setConditionFilter] = useState(ANY);
  const [subspecialtyFilter, setSubspecialtyFilter] = useState(ANY);
  const [testFilter, setTestFilter] = useState(ANY);
  const [nhsOnly, setNhsOnly] = useState(false);

  const subspecialties = useMemo(
    () => Array.from(new Set(specialists.map((s) => s.mainSpecialty))),
    []
  );

  const filtered = useMemo(() => {
    return specialists.filter((specialist) => {
      if (symptomFilter !== ANY) {
        const symptom = symptoms.find((s) => s.slug === symptomFilter);
        if (!symptom?.relevantSpecialists.includes(specialist.slug)) return false;
      }
      if (conditionFilter !== ANY) {
        const condition = conditions.find((c) => c.slug === conditionFilter);
        if (!condition?.relevantSpecialists.includes(specialist.slug)) return false;
      }
      if (subspecialtyFilter !== ANY && specialist.mainSpecialty !== subspecialtyFilter) {
        return false;
      }
      if (testFilter !== ANY && !specialist.testsPerformed.includes(testFilter)) {
        return false;
      }
      if (nhsOnly && !specialist.nhsAppointment) return false;
      return true;
    });
  }, [symptomFilter, conditionFilter, subspecialtyFilter, testFilter, nhsOnly]);

  return (
    <section className="bg-bone-dim py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Specialists"
            title="Featured specialists"
            lede="Filter by symptom, condition, subspecialty or diagnostic expertise to find the right consultant."
          />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <FilterSelect
            label="Symptom"
            value={symptomFilter}
            onChange={setSymptomFilter}
            options={symptoms.map((s) => ({ value: s.slug, label: s.shortLabel }))}
          />
          <FilterSelect
            label="Condition"
            value={conditionFilter}
            onChange={setConditionFilter}
            options={conditions.map((c) => ({ value: c.slug, label: c.name }))}
          />
          <FilterSelect
            label="Subspecialty"
            value={subspecialtyFilter}
            onChange={setSubspecialtyFilter}
            options={subspecialties.map((s) => ({ value: s, label: s }))}
          />
          <FilterSelect
            label="Diagnostic expertise"
            value={testFilter}
            onChange={setTestFilter}
            options={tests.map((t) => ({ value: t.slug, label: t.shortLabel }))}
          />
          <label className="flex min-h-11 items-center gap-2 self-end pb-2 text-sm font-medium text-ink">
            <input
              type="checkbox"
              checked={nhsOnly}
              onChange={(e) => setNhsOnly(e.target.checked)}
              className="h-5 w-5 accent-teal"
            />
            NHS appointment available
          </label>
        </div>

        <p className="mono-label mt-6 text-xs text-ink/40">
          {filtered.length} of {specialists.length} specialists shown
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((specialist, i) => (
            <Reveal key={specialist.slug} delayMs={Math.min(i, 5) * 100}>
              <SpecialistCard specialist={specialist} />
            </Reveal>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-sm text-ink/60">
              No specialists match these filters. Try broadening your selection.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="mono-label block text-xs text-ink/50">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 min-h-11 w-full border border-ink/20 bg-bone px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-teal"
      >
        <option value={ANY}>Any</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
