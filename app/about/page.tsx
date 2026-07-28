import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { TrustRail } from "@/components/shared/TrustRail";
import { ClinicLocation } from "@/components/shared/ClinicLocation";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About London Heart Centre",
  description:
    "London Heart Centre is a consultant-led private cardiology clinic at 22 Upper Wimpole Street, London.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])
          ),
        }}
      />

      <div className="border-b border-ink/10 bg-ink py-12 text-bone sm:py-16">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
          <p className="mono-label mt-4 text-xs text-bronze">Est. 1978 [VERIFY]</p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            About London Heart Centre
          </h1>
          <p className="prose-measure mt-4 text-base leading-7 text-stone">
            A consultant-led cardiology clinic at 22 Upper Wimpole Street,
            combining specialist depth with clear, unhurried explanation.
          </p>
        </Container>
      </div>

      <TrustRail />

      <Container className="max-w-3xl py-14">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Our approach</h2>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
            Every patient is seen by a consultant cardiologist, not a
            generalist team. Diagnostics are chosen for the individual —
            never applied as a standard package — and results are explained
            in plain English, with a clear plan for what happens next.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">Our heritage</h2>
          <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
            London Heart Centre has provided specialist heart care in London
            since 1978.{" "}
            <span className="mono-label text-bronze">[VERIFY]</span> Over
            that time, the clinic&rsquo;s approach to diagnostics has evolved
            considerably — its commitment to unhurried, consultant-led care
            has not.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-xl font-semibold text-ink">Visit us</h2>
          <div className="mt-6">
            <ClinicLocation />
          </div>
        </section>
      </Container>
    </article>
  );
}
