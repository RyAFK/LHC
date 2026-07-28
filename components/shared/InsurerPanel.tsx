import { insurers } from "@/lib/content/insurers";
import { ShieldCheckIcon } from "@/components/icons/Icons";

export function InsurerPanel() {
  return (
    <div className="border border-ink/10 bg-bone px-6 py-8 sm:px-8">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-teal/25 bg-teal/8 text-teal">
          <ShieldCheckIcon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">
            Self-pay and insured patients
          </h3>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/70">
            You are welcome to book as a self-pay patient, or using private
            medical insurance. If you plan to claim through insurance,
            please confirm your cover and any excess with your insurer
            before your appointment.
          </p>
        </div>
      </div>

      <p className="mono-label mt-6 text-xs text-ink/40">
        Insurers accepted <span className="text-bronze">— confirm before launch</span>
      </p>
      <ul className="mt-3 flex flex-wrap gap-2.5">
        {insurers.map((insurer) => (
          <li
            key={insurer.name}
            className="border border-ink/15 bg-bone-dim px-3.5 py-1.5 text-sm font-medium text-ink/80"
          >
            {insurer.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
