"use client";

import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import { PhoneCallIcon } from "@/components/icons/Icons";

type CallActionProps = {
  source: string;
  variant?: "text" | "button" | "button-on-dark";
  className?: string;
};

/**
 * `className` is for layout/spacing only (e.g. `w-full`) — it's appended
 * after the variant's own color classes, so a color override placed there
 * only wins by luck of Tailwind's generated stylesheet order, not by being
 * later in the class attribute. Use `variant="button-on-dark"` for a call
 * button over a dark/`bg-ink` surface rather than trying to recolor
 * `variant="button"` via className.
 */
export function CallAction({ source, variant = "text", className = "" }: CallActionProps) {
  const base = "inline-flex min-h-11 items-center gap-2 font-display font-semibold";
  const variantStyles = {
    text: `${base} text-sm text-ink hover:text-teal`,
    button: `${base} rounded-full border border-ink/20 px-5 text-sm text-ink hover:border-ink/40 hover:bg-ink/5`,
    "button-on-dark": `${base} rounded-full border border-bone/40 px-5 text-sm text-bone hover:border-bone hover:bg-bone/10`,
  };
  const styles = variantStyles[variant];

  return (
    <a
      href={siteConfig.telephoneHref}
      onClick={() => track({ name: "cta_call_click", source })}
      className={`${styles} ${className}`}
    >
      <PhoneCallIcon className="h-4 w-4" />
      Call {siteConfig.telephone}
    </a>
  );
}
