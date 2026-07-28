"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useHeroFrameLoader } from "@/hooks/useHeroFrameLoader";
import { drawCover, sizeCanvasForDpr } from "@/lib/hero/canvasEngine";
import {
  SMOOTHING_FACTOR,
  chapterForProgress,
  frameForProgress,
  heroChapters,
  nearestLoadedFrame,
} from "@/lib/hero/frames";
import { HeroChapterStack } from "@/components/hero/HeroChapterStack";
import { ChapterCalibrationRail } from "@/components/hero/ChapterCalibrationRail";
import { BookingCTA } from "@/components/shared/BookingCTA";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * The 320vh (220vh mobile) sticky scroll-scrubbed hero sequence. Defaults to
 * the static chapter stack (matching SSR output) and only switches into the
 * canvas-driven animated mode once motion is permitted and at least one
 * frame has loaded successfully. See README for current asset status.
 */
export function HeroSequence() {
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const { framesRef, criticalSettled, hasAnyFrame } = useHeroFrameLoader(!reducedMotion);
  const mode = !reducedMotion && criticalSettled && hasAnyFrame ? "animated" : "static";

  if (mode === "static") {
    return <HeroChapterStack />;
  }

  return <AnimatedSequence framesRef={framesRef} />;
}

function AnimatedSequence({
  framesRef,
}: {
  framesRef: React.RefObject<Map<number, HTMLImageElement>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chapterRefs = useRef<Array<HTMLDivElement | null>>([]);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const [readout, setReadout] = useState({ chapterId: 1, frame: 0, progress: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const tick = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = rect.height - viewportHeight;
      const target = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;

      currentProgressRef.current +=
        (target - currentProgressRef.current) * SMOOTHING_FACTOR;
      const progress = currentProgressRef.current;

      const wrapper = canvas.parentElement;
      if (wrapper) {
        const cssWidth = wrapper.clientWidth;
        const cssHeight = wrapper.clientHeight;
        const ctx = sizeCanvasForDpr(canvas, cssWidth, cssHeight);
        const targetFrame = frameForProgress(progress);
        const nearest = nearestLoadedFrame(targetFrame, new Set(framesRef.current.keys()));
        const image = nearest !== null ? framesRef.current.get(nearest) : undefined;

        if (ctx && image) {
          drawCover(ctx, image, cssWidth, cssHeight);
        }
      }

      const activeChapter = chapterForProgress(progress);
      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const chapter = heroChapters[i];
        const visible =
          progress >= chapter.progressStart && progress < chapter.progressEnd;
        el.style.opacity = visible ? "1" : "0";
        el.style.transform = visible ? "translateY(0)" : "translateY(16px)";
        el.setAttribute("aria-hidden", visible ? "false" : "true");
      });

      setReadout((prev) =>
        prev.chapterId === activeChapter.id &&
        prev.frame === frameForProgress(progress)
          ? prev
          : {
              chapterId: activeChapter.id,
              frame: frameForProgress(progress),
              progress,
            }
      );

      rafIdRef.current = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (rafIdRef.current === null) rafIdRef.current = requestAnimationFrame(tick);
        } else if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      },
      { threshold: 0 }
    );
    io.observe(container);

    return () => {
      io.disconnect();
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="relative h-[220vh] sm:h-[320vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />

        <div className="relative z-10 flex h-full items-end px-5 pb-24 sm:px-8 sm:pb-28">
          <div className="prose-measure max-w-2xl">
            {heroChapters.map((chapter, i) => (
              <div
                key={chapter.id}
                ref={(el) => {
                  chapterRefs.current[i] = el;
                }}
                className="absolute inset-x-5 bottom-24 max-w-2xl opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:inset-x-8 sm:bottom-28"
              >
                <h2 className="font-display text-3xl font-bold leading-[1.1] text-bone sm:text-5xl">
                  {chapter.headline}
                </h2>
                {chapter.support && (
                  <p className="mt-4 max-w-lg text-base leading-7 text-stone sm:text-lg">
                    {chapter.support}
                  </p>
                )}
                {chapter.annotation && (
                  <p className="mono-label mt-4 text-xs text-stone/80">
                    {chapter.annotation}
                  </p>
                )}
                {chapter.cta && (
                  <div className="mt-6">
                    <BookingCTA
                      source={`hero_chapter_${chapter.id}`}
                      href={chapter.cta.href}
                      label={chapter.cta.label}
                      variant="on-dark"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <ChapterCalibrationRail
          chapterId={readout.chapterId}
          frame={readout.frame}
          progress={readout.progress}
        />
      </div>
    </div>
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
