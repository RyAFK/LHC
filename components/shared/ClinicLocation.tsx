import { siteConfig } from "@/lib/site-config";
import { CallAction } from "@/components/shared/CallAction";

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=22+Upper+Wimpole+Street+London+W1G+6NB";

export function ClinicLocation() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="mono-label text-xs text-bronze">Location</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
          22 Upper Wimpole Street
        </h3>
        <p className="mt-1 text-ink/70">
          {siteConfig.address.locality} {siteConfig.address.postcode}
        </p>

        <dl className="prose-measure mt-6 space-y-3 text-sm leading-6 text-ink/70">
          <div>
            <dt className="font-semibold text-ink">Nearest stations</dt>
            <dd>Regent&apos;s Park, Baker Street, Great Portland Street</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Telephone</dt>
            <dd>
              <CallAction source="clinic_location" />
            </dd>
          </div>
        </dl>

        <a
          href={directionsUrl}
          className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-teal underline underline-offset-4"
        >
          Get directions
        </a>
      </div>

      {/* Deliberate static locator graphic — no third-party map embed. */}
      <div
        aria-hidden="true"
        className="relative flex min-h-64 items-center justify-center overflow-hidden border border-ink/10 bg-ink"
      >
        <svg viewBox="0 0 400 260" className="h-full w-full opacity-80">
          <line x1="0" y1="60" x2="400" y2="60" stroke="#AA875C" strokeWidth="0.5" opacity="0.4" />
          <line x1="0" y1="130" x2="400" y2="130" stroke="#AA875C" strokeWidth="0.5" opacity="0.4" />
          <line x1="0" y1="200" x2="400" y2="200" stroke="#AA875C" strokeWidth="0.5" opacity="0.4" />
          <line x1="100" y1="0" x2="100" y2="260" stroke="#AA875C" strokeWidth="0.5" opacity="0.25" />
          <line x1="300" y1="0" x2="300" y2="260" stroke="#AA875C" strokeWidth="0.5" opacity="0.25" />
          <circle cx="200" cy="130" r="6" fill="#F0F8FA" />
          <circle cx="200" cy="130" r="14" stroke="#F0F8FA" strokeWidth="1" fill="none" />
          <circle cx="200" cy="130" r="26" stroke="#1476B0" strokeWidth="1" fill="none" opacity="0.7" />
        </svg>
        <span className="mono-label absolute bottom-4 left-4 text-[0.65rem] text-stone">
          W1G 6NB
        </span>
      </div>
    </div>
  );
}
