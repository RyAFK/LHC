function initialsOf(name: string): string {
  return name
    .replace(" [VERIFY]", "")
    .split(" ")
    .filter((word) => word !== "Dr")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

/**
 * A designed placeholder for a specialist headshot: an abstract bust mark on
 * a calibration-ring backdrop (echoing the hero's ECG/scan-line motif),
 * with an initials badge. Stands in until real consultant photography is
 * supplied — see the [VERIFY] checklist.
 */
export function SpecialistAvatar({ name, className = "" }: { name: string; className?: string }) {
  const initials = initialsOf(name);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-ink-raised ${className}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-70" aria-hidden="true">
        <circle cx="100" cy="100" r="88" stroke="#AA875C" strokeWidth="0.75" fill="none" opacity="0.35" />
        <circle cx="100" cy="100" r="62" stroke="#0E5E5C" strokeWidth="0.75" fill="none" opacity="0.4" />
        <circle cx="100" cy="100" r="36" stroke="#F4F0E8" strokeWidth="0.5" fill="none" opacity="0.2" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="#AA875C" strokeWidth="0.4" opacity="0.15" />
        <line x1="100" y1="0" x2="100" y2="200" stroke="#AA875C" strokeWidth="0.4" opacity="0.15" />
      </svg>

      <svg viewBox="0 0 100 100" className="relative h-[46%] w-[46%] text-bone/40" aria-hidden="true">
        <circle cx="50" cy="36" r="18" fill="currentColor" />
        <path d="M14 92c2-22 16-34 36-34s34 12 36 34" fill="currentColor" />
      </svg>

      <span
        aria-hidden="true"
        className="mono-label absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center border border-bronze/50 bg-ink text-xs font-semibold text-bone"
      >
        {initials || "LHC"}
      </span>
    </div>
  );
}
