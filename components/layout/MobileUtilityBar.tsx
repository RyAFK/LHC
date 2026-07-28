"use client";

import { track } from "@/lib/analytics";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

/** Persistent bottom utility bar for mobile: always-visible Book and Call actions. */
export function MobileUtilityBar() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-ink/10 bg-bone pb-[env(safe-area-inset-bottom)] lg:hidden"
      aria-label="Booking and contact"
    >
      <a
        href={siteConfig.telephoneHref}
        onClick={() => track({ name: "cta_call_click", source: "mobile_utility_bar" })}
        className="flex min-h-14 flex-1 items-center justify-center gap-2 border-r border-ink/10 font-display text-sm font-semibold text-ink"
      >
        <span aria-hidden="true">☎</span>
        Call
      </a>
      <Link
        href="/book"
        onClick={() => track({ name: "cta_book_click", source: "mobile_utility_bar" })}
        className="flex min-h-14 flex-[1.4] items-center justify-center gap-2 bg-teal font-display text-sm font-semibold text-bone"
      >
        Book a consultation
      </Link>
    </nav>
  );
}
