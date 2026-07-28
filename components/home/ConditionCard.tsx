import Link from "next/link";
import type { Condition } from "@/lib/content/types";
import { conditionIcons } from "@/components/home/conditionIcons";
import { ActivityIcon, ArrowRightIcon } from "@/components/icons/Icons";

export function ConditionCard({
  condition,
  headingLevel = "h3",
}: {
  condition: Condition;
  headingLevel?: "h2" | "h3";
}) {
  const ConditionIcon = conditionIcons[condition.slug] ?? ActivityIcon;
  const Heading = headingLevel;

  return (
    <Link
      href={`/conditions/${condition.slug}`}
      className="group block h-full border border-ink/10 bg-bone px-6 py-6 transition-colors hover:border-teal/40 hover:bg-teal/5"
    >
      <span className="flex h-11 w-11 items-center justify-center border border-oxblood/20 bg-oxblood/6 text-oxblood transition-colors group-hover:border-teal/40 group-hover:bg-teal/10 group-hover:text-teal">
        <ConditionIcon className="h-5 w-5" />
      </span>
      <Heading className="mt-4 font-display text-lg font-semibold text-ink">
        {condition.name}
      </Heading>
      <p className="prose-measure mt-2 text-sm leading-6 text-ink/65">
        {condition.overview}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
        Explore
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
