import Link from "next/link";
import { LHCMark } from "@/components/brand/LHCMark";
import { primaryNav } from "@/lib/site-config";
import { CallAction } from "@/components/shared/CallAction";
import { BookingCTA } from "@/components/shared/BookingCTA";
import { MobileNav } from "@/components/layout/MobileNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-bone">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="shrink-0" aria-label="London Heart Centre, homepage">
          <LHCMark />
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary"
        >
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-[0.9rem] font-medium text-ink/80 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <CallAction source="header" />
          <BookingCTA source="header" />
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
