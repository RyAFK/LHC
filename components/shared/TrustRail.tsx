import { trustStats } from "@/lib/content/trust";
import { Reveal } from "@/components/ui/Reveal";
import {
  CalendarCheckIcon,
  StarIcon,
  UsersIcon,
  ShieldCheckIcon,
  MapPinIcon,
  type IconProps,
} from "@/components/icons/Icons";

const iconByLabel: Record<string, (props: IconProps) => React.JSX.Element> = {
  Established: CalendarCheckIcon,
  "Patient rating": StarIcon,
  Specialists: UsersIcon,
  Insurance: ShieldCheckIcon,
  Location: MapPinIcon,
};

/**
 * Restrained trust rail. Values are CMS-ready fields sourced from
 * lib/content/trust.ts and are provisional — see the mono "confirm before
 * launch" tag on each stat.
 */
export function TrustRail() {
  return (
    <section aria-label="London Heart Centre at a glance" className="border-y border-ink/10 bg-bone-dim">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-5">
          {trustStats.map((stat, i) => {
            const StatIcon = iconByLabel[stat.label] ?? ShieldCheckIcon;
            return (
              <li key={stat.label}>
                <Reveal delayMs={i * 60} className="flex gap-3 border-l-2 border-bronze/50 pl-4">
                  <StatIcon className="mt-0.5 h-5 w-5 shrink-0 text-bronze" />
                  <div>
                    <p className="text-[0.95rem] leading-snug text-ink">{stat.value}</p>
                    <p className="mono-label mt-2 flex items-center gap-2 text-[0.65rem] text-ink/40">
                      {stat.monoCode && <span>{stat.monoCode}</span>}
                      {stat.status === "confirm_before_launch" && (
                        <span className="text-bronze">Confirm before launch</span>
                      )}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
