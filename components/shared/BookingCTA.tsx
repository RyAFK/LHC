"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "ghost" | "on-dark";
type Size = "md" | "lg";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 font-display font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-teal text-bone hover:bg-teal-strong",
  secondary:
    "border border-ink/20 bg-transparent text-ink hover:border-ink/40 hover:bg-ink/5",
  ghost: "text-teal hover:text-teal-strong underline underline-offset-4",
  "on-dark": "bg-bone text-ink hover:bg-stone",
};

const sizes: Record<Size, string> = {
  md: "text-sm py-2.5",
  lg: "text-base py-3.5",
};

type BookingCTAProps = {
  href?: string;
  label?: string;
  source: string;
  variant?: Variant;
  size?: Size;
  className?: string;
};

/** Primary booking call to action. Visually prominent, deliberately calm. */
export function BookingCTA({
  href = "/book",
  label = "Book a consultation",
  source,
  variant = "primary",
  size = "md",
  className = "",
}: BookingCTAProps) {
  return (
    <Link
      href={href}
      onClick={() => track({ name: "cta_book_click", source })}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {label}
    </Link>
  );
}
