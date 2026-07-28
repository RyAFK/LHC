"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics";

const FORM_ID = "gp_referral";

export function ReferralForm() {
  const startedRef = useRef(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFocus = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track({ name: "form_start", form: FORM_ID });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setError("Please complete all required fields before submitting.");
      form.reportValidity();
      return;
    }
    setError(null);
    track({ name: "form_submit", form: FORM_ID });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-teal/30 bg-teal/5 px-6 py-8 text-center">
        <p className="font-display text-lg font-semibold text-ink">
          Referral received
        </p>
        <p className="prose-measure mx-auto mt-2 text-sm text-ink/70">
          Thank you. Our clinical team will review this referral and be in
          touch to confirm next steps.{" "}
          <span className="mono-label text-bronze">[VERIFY submission routing]</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="space-y-6" onFocus={handleFocus}>
      {error && (
        <p role="alert" className="border-l-4 border-oxblood bg-oxblood/5 px-4 py-3 text-sm text-oxblood">
          {error}
        </p>
      )}

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="font-display text-sm font-semibold uppercase tracking-wide text-ink/50">
          Referring clinician
        </legend>
        <Field id="referrer-name" label="Full name" required />
        <Field id="referrer-org" label="Practice or organisation" required />
        <Field id="referrer-email" label="Email address" type="email" required />
        <Field id="referrer-phone" label="Telephone" type="tel" required />
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="font-display text-sm font-semibold uppercase tracking-wide text-ink/50">
          Patient details
        </legend>
        <Field id="patient-name" label="Patient full name" required />
        <Field id="patient-dob" label="Date of birth" type="date" required />
      </fieldset>

      <div>
        <label htmlFor="clinical-info" className="font-display text-sm font-semibold uppercase tracking-wide text-ink/50">
          Clinical information
        </label>
        <textarea
          id="clinical-info"
          name="clinical-info"
          required
          rows={5}
          className="mt-2 w-full border border-ink/20 bg-bone px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-teal"
          placeholder="Presenting complaint, relevant history, current medication and reason for referral"
        />
      </div>

      <div>
        <span className="font-display text-sm font-semibold uppercase tracking-wide text-ink/50">
          Supporting documents
        </span>
        <div className="mt-2 border border-dashed border-stone px-5 py-6 text-center text-sm text-ink/60">
          Secure document upload — available once this referral pathway goes live.{" "}
          <span className="mono-label text-bronze">[VERIFY]</span>
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-ink/70">
        <input type="checkbox" required className="mt-1 h-5 w-5 accent-teal" />
        This referral is not urgent. For urgent referrals, please call our
        clinical team directly.
      </label>

      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-teal px-6 font-display text-sm font-semibold text-bone hover:bg-teal-strong"
      >
        Submit referral
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-1.5 min-h-11 w-full border border-ink/20 bg-bone px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-teal"
      />
    </div>
  );
}
