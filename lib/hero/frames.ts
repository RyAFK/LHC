// Hero scroll-sequence configuration and pure progress/frame math.
// Kept dependency-free so it can be unit-reasoned about and reused by both
// the canvas engine and the static reduced-motion fallback.

export const TOTAL_FRAMES = 96;
export const FRAME_BASE_PATH = "/media/lhc-heart-sequence";

export function frameSrc(index: number): string {
  return `${FRAME_BASE_PATH}/frame_${String(index).padStart(4, "0")}.webp`;
}

/** Preloaded before the experience is revealed. */
export const CRITICAL_FRAMES = [0, 20, 21, 60, 61, 95] as const;

export const SMOOTHING_FACTOR = 0.12;

export type HeroChapter = {
  id: 1 | 2 | 3;
  headline: string;
  support?: string;
  annotation?: string;
  cta?: { label: string; href: string };
  /** Inclusive scroll-progress range [0,1] during which this chapter is the active caption. */
  progressStart: number;
  progressEnd: number;
};

export const heroChapters: HeroChapter[] = [
  {
    id: 1,
    headline: "Private cardiology, made clear.",
    annotation: "Established 1978 · Upper Wimpole Street",
    progressStart: 0,
    progressEnd: 0.32,
  },
  {
    id: 2,
    headline: "Answers without unnecessary delay.",
    support:
      "Consultant assessment and advanced diagnostics in one connected pathway.",
    progressStart: 0.32,
    progressEnd: 0.78,
  },
  {
    id: 3,
    headline: "One specialist pathway. Clear next steps.",
    cta: { label: "Book a consultation", href: "/book" },
    progressStart: 0.78,
    progressEnd: 1,
  },
];

export function chapterForProgress(progress: number): HeroChapter {
  const match = heroChapters.find(
    (c) => progress >= c.progressStart && progress < c.progressEnd
  );
  return match ?? heroChapters[heroChapters.length - 1];
}

/**
 * Maps scroll progress (0-1) to a frame index, per the suggested mapping:
 * 0.00-0.18 frames 0-20, 0.18-0.32 dwell, 0.32-0.65 frames 21-60,
 * 0.65-0.78 dwell, 0.78-1.00 frames 61-95.
 */
export function frameForProgress(progress: number): number {
  const p = Math.min(1, Math.max(0, progress));

  if (p <= 0.18) {
    return Math.round(lerp(0, 20, p / 0.18));
  }
  if (p <= 0.32) {
    return 20;
  }
  if (p <= 0.65) {
    return Math.round(lerp(21, 60, (p - 0.32) / (0.65 - 0.32)));
  }
  if (p <= 0.78) {
    return 60;
  }
  return Math.round(lerp(61, 95, (p - 0.78) / (1 - 0.78)));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

/** Searches outward from `target` for the nearest index present in `loaded`. Never returns null when `loaded` is non-empty. */
export function nearestLoadedFrame(
  target: number,
  loaded: ReadonlySet<number>
): number | null {
  if (loaded.has(target)) return target;

  for (let delta = 1; delta < TOTAL_FRAMES; delta += 1) {
    const down = target - delta;
    const up = target + delta;
    if (down >= 0 && loaded.has(down)) return down;
    if (up < TOTAL_FRAMES && loaded.has(up)) return up;
  }
  return null;
}
