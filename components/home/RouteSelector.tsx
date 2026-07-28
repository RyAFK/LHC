"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  HeartPulseIcon,
  StethoscopeIcon,
  ClipboardListIcon,
  BuildingIcon,
  ArrowRightIcon,
} from "@/components/icons/Icons";

const routes = [
  {
    id: "symptoms",
    label: "I have symptoms",
    description: "Explore common symptoms and how LHC can help investigate them.",
    href: "/symptoms",
    Icon: HeartPulseIcon,
  },
  {
    id: "screening",
    label: "I want a heart screening",
    description: "A consultant-led check for people without a diagnosed condition.",
    href: "/screening",
    Icon: StethoscopeIcon,
  },
  {
    id: "tests",
    label: "I know which test I need",
    description: "Go straight to diagnostic services, preparation and pricing.",
    href: "/tests",
    Icon: ClipboardListIcon,
  },
  {
    id: "referrer",
    label: "I am referring a patient",
    description: "Information and a dedicated pathway for healthcare professionals.",
    href: "/for-referrers",
    Icon: BuildingIcon,
  },
];

/** Section 3: navigation, not medical diagnosis. */
export function RouteSelector() {
  return (
    <section id="where-should-i-start" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Start here"
          title="Where should I start?"
          lede="Choose the route that matches where you are today. This helps you find the right information — it does not diagnose or triage your symptoms."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {routes.map((route) => (
            <Link
              key={route.id}
              href={route.href}
              onClick={() => track({ name: "route_select", route: route.id })}
              className="group flex flex-col justify-between border border-ink/10 bg-bone px-6 py-6 transition-colors hover:border-teal/40 hover:bg-teal/5"
            >
              <div>
                <span className="flex h-11 w-11 items-center justify-center border border-bronze/30 bg-bronze/10 text-oxblood transition-colors group-hover:border-teal/40 group-hover:bg-teal/10 group-hover:text-teal">
                  <route.Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {route.label}
                </h3>
                <p className="prose-measure mt-2 text-sm leading-6 text-ink/65">
                  {route.description}
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
                Continue
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
