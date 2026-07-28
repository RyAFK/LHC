import { trustStats } from "@/lib/content/trust";

/**
 * Restrained trust rail. Values are CMS-ready fields sourced from
 * lib/content/trust.ts and are provisional — see the mono "confirm before
 * launch" tag on each stat.
 */
export function TrustRail() {
  return (
    <section aria-label="London Heart Centre at a glance" className="border-y border-ink/10 bg-bone-dim">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
          {trustStats.map((stat) => (
            <li key={stat.label} className="border-l-2 border-bronze/50 pl-4">
              <p className="text-[0.95rem] leading-snug text-ink">{stat.value}</p>
              <p className="mono-label mt-2 flex items-center gap-2 text-[0.65rem] text-ink/40">
                {stat.monoCode && <span>{stat.monoCode}</span>}
                {stat.status === "confirm_before_launch" && (
                  <span className="text-bronze">Confirm before launch</span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
