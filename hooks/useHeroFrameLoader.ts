"use client";

import { useEffect, useRef, useState } from "react";
import { CRITICAL_FRAMES, TOTAL_FRAMES, frameSrc } from "@/lib/hero/frames";

export type HeroFrameLoaderState = {
  /** True once the critical-frame preload attempt has settled (success or failure). */
  criticalSettled: boolean;
  /** True once at least one frame has loaded successfully. */
  hasAnyFrame: boolean;
  loadedCount: number;
};

const BATCH_SIZE = 8;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

/**
 * Loads the hero frame sequence progressively: critical frames first (so the
 * experience can reveal quickly), then the remainder in small idle-time
 * batches. Never blocks — consumers should treat `criticalSettled` as the
 * signal to decide whether to reveal the animated sequence or fall back to
 * a static poster.
 */
export function useHeroFrameLoader(enabled: boolean) {
  const framesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const [state, setState] = useState<HeroFrameLoaderState>({
    criticalSettled: false,
    hasAnyFrame: false,
    loadedCount: 0,
  });

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    async function run() {
      const results = await Promise.allSettled(
        CRITICAL_FRAMES.map(async (index) => {
          const img = await loadImage(frameSrc(index));
          framesRef.current.set(index, img);
          return index;
        })
      );

      if (cancelled) return;

      const anySucceeded = results.some((r) => r.status === "fulfilled");
      setState({
        criticalSettled: true,
        hasAnyFrame: anySucceeded,
        loadedCount: framesRef.current.size,
      });

      if (!anySucceeded) return;

      const remaining: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i += 1) {
        if (!framesRef.current.has(i)) remaining.push(i);
      }

      let cursor = 0;
      const loadNextBatch = () => {
        if (cancelled || cursor >= remaining.length) return;
        const batch = remaining.slice(cursor, cursor + BATCH_SIZE);
        cursor += BATCH_SIZE;

        Promise.allSettled(
          batch.map(async (index) => {
            const img = await loadImage(frameSrc(index));
            framesRef.current.set(index, img);
          })
        ).finally(() => {
          if (cancelled) return;
          setState((s) => ({ ...s, loadedCount: framesRef.current.size }));
          scheduleIdle(loadNextBatch);
        });
      };

      scheduleIdle(loadNextBatch);
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { framesRef, ...state };
}

function scheduleIdle(fn: () => void) {
  if (typeof window === "undefined") return;
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void) => number;
  };
  if (typeof w.requestIdleCallback === "function") {
    w.requestIdleCallback(fn, { timeout: 1000 });
  } else {
    setTimeout(fn, 200);
  }
}
