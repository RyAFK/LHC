import { emergencyNoticeLink, emergencyNoticeText } from "@/lib/site-config";
import { AlertIcon } from "@/components/icons/Icons";

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
      <span className="flex shrink-0 flex-col items-center gap-1 text-oxblood">
        <AlertIcon className="h-5 w-5" aria-hidden="true" />
        <span aria-hidden="true" className="mono-label text-xs font-semibold">
          999
        </span>
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
