"use client";

import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

type CallActionProps = {
  source: string;
  variant?: "text" | "button";
  className?: string;
};

export function CallAction({ source, variant = "text", className = "" }: CallActionProps) {
  const base = "inline-flex min-h-11 items-center gap-2 font-display font-semibold";
  const styles =
    variant === "button"
      ? `${base} rounded-full border border-ink/20 px-5 text-sm text-ink hover:border-ink/40 hover:bg-ink/5`
      : `${base} text-sm text-ink hover:text-teal`;

  return (
    <a
      href={siteConfig.telephoneHref}
      onClick={() => track({ name: "cta_call_click", source })}
      className={`${styles} ${className}`}
    >
      <span aria-hidden="true">☎</span>
      Call {siteConfig.telephone}
    </a>
  );
}
