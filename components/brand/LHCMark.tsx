type LHCMarkProps = {
  className?: string;
  showFullName?: boolean;
  dark?: boolean;
};

/**
 * Temporary text mark for London Heart Centre. Per brand instruction, this
 * must not approximate the existing LHC logo — it is a deliberately plain
 * wordmark until a permanent identity is designed.
 */
export function LHCMark({ className = "", showFullName = true, dark = false }: LHCMarkProps) {
  const textColor = dark ? "text-bone" : "text-ink";
  const subColor = dark ? "text-stone" : "text-ink/60";

  return (
    <span className={`inline-flex items-baseline gap-2.5 ${className}`}>
      <span
        className={`font-display text-2xl font-bold tracking-tight ${textColor}`}
      >
        LHC
      </span>
      {showFullName && (
        <span
          className={`hidden font-sans text-xs font-medium uppercase tracking-[0.14em] sm:inline ${subColor}`}
        >
          London Heart Centre
        </span>
      )}
    </span>
  );
}
