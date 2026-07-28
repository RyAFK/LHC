import { insurers } from "@/lib/content/insurers";

export function InsurerPanel() {
  return (
    <div className="border border-ink/10 bg-bone px-6 py-8 sm:px-8">
      <h3 className="font-display text-lg font-semibold text-ink">
        Self-pay and insured patients
      </h3>
      <p className="prose-measure mt-3 text-sm leading-6 text-ink/70">
        You are welcome to book as a self-pay patient, or using private
        medical insurance. If you plan to claim through insurance, please
        confirm your cover and any excess with your insurer before your
        appointment.
      </p>

      <p className="mono-label mt-6 text-xs text-ink/40">
        Insurers accepted <span className="text-bronze">— confirm before launch</span>
      </p>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        {insurers.map((insurer) => (
          <li key={insurer.name} className="text-sm font-medium text-ink/80">
            {insurer.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
