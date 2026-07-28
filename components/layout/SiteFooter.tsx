import Link from "next/link";
import { LHCMark } from "@/components/brand/LHCMark";
import { footerNav, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-bone/10 bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <LHCMark dark />
            <p className="prose-measure mt-4 max-w-xs text-sm leading-6 text-stone">
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.locality} {siteConfig.address.postcode}
            </p>
            <p className="mono-label mt-4 text-xs text-bronze">
              {siteConfig.telephone}
            </p>
          </div>

          {footerNav.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="font-display text-sm font-semibold text-bone">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone transition-colors hover:text-bone"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 h-px w-full bg-bronze/40" aria-hidden="true" />

        <div className="mt-6 flex flex-col gap-2 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Specialist heart
            care in London since 1978.{" "}
            <span className="mono-label text-bronze">[VERIFY]</span>
          </p>
          <p>
            This site provides general information only and does not
            constitute medical advice or diagnosis.
          </p>
        </div>
      </div>
    </footer>
  );
}
