import type { TestPrice } from "@/lib/content/types";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/** Never renders a £0 placeholder — falls back to a clear confirmation message. */
export function PriceSummary({ price, className = "" }: { price: TestPrice; className?: string }) {
  if (price.kind === "fixed" && price.amountGBP > 0) {
    return (
      <span className={`font-display text-lg font-semibold text-ink ${className}`}>
        {gbp.format(price.amountGBP)}
      </span>
    );
  }

  return (
    <span className={`font-display text-base font-semibold text-teal ${className}`}>
      Price confirmed after assessment
    </span>
  );
}
