import type { ClinicalReview } from "@/lib/content/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ClinicalReviewFooter({ review }: { review: ClinicalReview }) {
  return (
    <div className="border-t border-ink/10 pt-6 text-sm text-ink/60">
      <p>
        Clinically reviewed by{" "}
        <span className="font-semibold text-ink/80">{review.reviewerName}</span>,{" "}
        {review.reviewerRole}
      </p>
      <p className="mono-label mt-2 text-[0.7rem] text-ink/40">
        Published {formatDate(review.publishedDate)} · Next review{" "}
        {formatDate(review.reviewDate)}
      </p>
      {review.sources.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
            Sources
          </p>
          <ul className="mt-1 space-y-1">
            {review.sources.map((source) => (
              <li key={source.label}>
                {source.href ? (
                  <a href={source.href} className="text-teal underline underline-offset-2">
                    {source.label}
                  </a>
                ) : (
                  source.label
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
