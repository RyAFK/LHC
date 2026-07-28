import { TOTAL_FRAMES } from "@/lib/hero/frames";

type ChapterCalibrationRailProps = {
  chapterId: number;
  frame: number;
  progress: number;
};

/**
 * Real technical readout in IBM Plex Mono. Mobile keeps only chapter,
 * frame count and progress; desktop adds a decorative calibration tick rule.
 */
export function ChapterCalibrationRail({ chapterId, frame, progress }: ChapterCalibrationRailProps) {
  return (
    <div className="pointer-events-none absolute bottom-6 left-5 right-5 sm:left-8 sm:right-8">
      <div
        aria-hidden="true"
        className="mb-3 hidden h-px w-full bg-bone/15 sm:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(244,240,232,0.35) 0 1px, transparent 1px 24px)",
        }}
      />
      <div className="mono-label flex items-center justify-between text-[0.65rem] text-bone/70">
        <span>CH.0{chapterId}</span>
        <span>
          FRAME {String(frame).padStart(3, "0")}/{TOTAL_FRAMES}
        </span>
        <span>{Math.round(progress * 100)}%</span>
      </div>
    </div>
  );
}
