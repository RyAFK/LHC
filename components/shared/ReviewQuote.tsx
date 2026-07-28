import type { PatientReview } from "@/lib/content/types";

export function ReviewQuote({ review }: { review: PatientReview }) {
  return (
    <figure className="border border-ink/10 bg-bone px-6 py-6">
      <blockquote className="prose-measure font-display text-lg leading-snug text-ink">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mono-label mt-4 text-xs text-ink/50">
        {review.attribution} · Verified on {review.source}
      </figcaption>
    </figure>
  );
}

/** Honest placeholder shown when no verified reviews are available yet. */
export function ReviewsPendingNotice({ doctifyUrl }: { doctifyUrl: string }) {
  return (
    <div className="border border-dashed border-stone px-6 py-8 text-center">
      <p className="mono-label text-xs text-bronze">Confirm before launch</p>
      <p className="prose-measure mx-auto mt-3 text-sm leading-6 text-ink/70">
        Verified patient review excerpts will appear here once confirmed with
        Doctify. In the meantime, read our full profile directly.
      </p>
      <a
        href={doctifyUrl}
        className="mt-4 inline-block text-sm font-semibold text-teal underline underline-offset-4"
      >
        View our Doctify reviews
      </a>
    </div>
  );
}
