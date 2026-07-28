import type { FAQ } from "@/lib/content/types";

/** Uses native <details>/<summary> so FAQs work without JavaScript. */
export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-4">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-ink">
            {faq.question}
            <span
              aria-hidden="true"
              className="shrink-0 text-xl leading-none text-bronze transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/70">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
