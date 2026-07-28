"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const POSTER = "/media/hero-loop/hero-loop-poster.webp";

/**
 * Ambient 10-second hero background: a seamless, autoplaying loop rendered
 * from six supplied keyframes (see README — "Hero loop" for provenance and
 * how it was encoded). Pauses when scrolled out of view and collapses to a
 * single static frame under prefers-reduced-motion, matching the brief this
 * asset shipped with.
 */
export function HeroLoop() {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={POSTER}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[85%_50%] sm:object-center"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover object-[85%_50%] sm:object-center"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER}
    >
      <source src="/media/hero-loop/hero-loop.webm" type="video/webm" />
      <source src="/media/hero-loop/hero-loop.mp4" type="video/mp4" />
    </video>
  );
}
