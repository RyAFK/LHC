"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics";

const FORM_ID = "booking_request";

export function BookingRequestForm() {
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
    track({ name: "booking_handoff", destination: "clinic_team_callback" });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-teal/30 bg-teal/5 px-6 py-8 text-center">
        <p className="font-display text-lg font-semibold text-ink">Request received</p>
        <p className="prose-measure mx-auto mt-2 text-sm text-ink/70">
          Thank you. Our team will contact you to confirm your appointment.{" "}
          <span className="mono-label text-bronze">[VERIFY routing to booking system]</span>
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-name" className="text-sm font-medium text-ink">
            Full name *
          </label>
          <input
            id="booking-name"
            name="name"
            required
            className="mt-1.5 min-h-11 w-full border border-ink/20 bg-bone px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-teal"
          />
        </div>
        <div>
          <label htmlFor="booking-phone" className="text-sm font-medium text-ink">
            Telephone *
          </label>
          <input
            id="booking-phone"
            name="phone"
            type="tel"
            required
            className="mt-1.5 min-h-11 w-full border border-ink/20 bg-bone px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-teal"
          />
        </div>
      </div>

      <div>
        <label htmlFor="booking-email" className="text-sm font-medium text-ink">
          Email address *
        </label>
        <input
          id="booking-email"
          name="email"
          type="email"
          required
          className="mt-1.5 min-h-11 w-full border border-ink/20 bg-bone px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-teal"
        />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink">How would you like to pay? *</legend>
        <div className="mt-2 flex flex-wrap gap-5 text-sm text-ink/75">
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="self-pay" required className="h-4 w-4 accent-teal" />
            Self-pay
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="insured" className="h-4 w-4 accent-teal" />
            Private medical insurance
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="unsure" className="h-4 w-4 accent-teal" />
            Not sure yet
          </label>
        </div>
      </fieldset>

      <div>
        <label htmlFor="booking-reason" className="text-sm font-medium text-ink">
          What would you like to book, or what&rsquo;s brought you here?
        </label>
        <textarea
          id="booking-reason"
          name="reason"
          rows={4}
          className="mt-1.5 w-full border border-ink/20 bg-bone px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-teal"
          placeholder="Optional — a consultation, a specific test, or a symptom you'd like assessed"
        />
      </div>

      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-teal px-6 font-display text-sm font-semibold text-bone hover:bg-teal-strong"
      >
        Request appointment
      </button>
    </form>
  );
}
