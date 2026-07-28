import { emergencyNoticeLink, emergencyNoticeText } from "@/lib/site-config";

type EmergencyNoticeProps = {
  className?: string;
};

/** Clinical-safety notice. Prominent but not alarmist — no flashing or siren styling. */
export function EmergencyNotice({ className = "" }: EmergencyNoticeProps) {
  return (
    <div
      role="note"
      aria-label="Emergency guidance"
      className={`flex gap-4 border-l-4 border-oxblood bg-oxblood/5 px-5 py-4 ${className}`}
    >
      <span aria-hidden="true" className="mono-label pt-0.5 text-xs font-semibold text-oxblood">
        999
      </span>
      <p className="text-sm leading-6 text-ink">
        {emergencyNoticeText}{" "}
        <a
          href={emergencyNoticeLink}
          className="font-semibold text-oxblood underline underline-offset-2"
        >
          NHS guidance on chest pain
        </a>
        .
      </p>
    </div>
  );
}
