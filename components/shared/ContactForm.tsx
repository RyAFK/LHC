"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics";

export function ContactForm({ formId = "contact" }: { formId?: string }) {
  const startedRef = useRef(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFocus = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track({ name: "form_start", form: formId });
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
    track({ name: "form_submit", form: formId });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-teal/30 bg-teal/5 px-6 py-8 text-center">
        <p className="font-display text-lg font-semibold text-ink">Message sent</p>
        <p className="prose-measure mx-auto mt-2 text-sm text-ink/70">
          Thank you — our team will get back to you shortly.{" "}
          <span className="mono-label text-bronze">[VERIFY routing]</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" onFocus={handleFocus}>
      {error && (
        <p role="alert" className="border-l-4 border-oxblood bg-oxblood/5 px-4 py-3 text-sm text-oxblood">
          {error}
        </p>
      )}

      <div>
        <label htmlFor={`${formId}-name`} className="text-sm font-medium text-ink">
          Full name *
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          required
          className="mt-1.5 min-h-11 w-full border border-ink/20 bg-bone px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-teal"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-email`} className="text-sm font-medium text-ink">
            Email address *
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            className="mt-1.5 min-h-11 w-full border border-ink/20 bg-bone px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-teal"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-phone`} className="text-sm font-medium text-ink">
            Telephone
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            className="mt-1.5 min-h-11 w-full border border-ink/20 bg-bone px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-teal"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="text-sm font-medium text-ink">
          How can we help? *
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full border border-ink/20 bg-bone px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-teal"
        />
      </div>

      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-teal px-6 font-display text-sm font-semibold text-bone hover:bg-teal-strong"
      >
        Send message
      </button>
    </form>
  );
}
