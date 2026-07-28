import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CallAction } from "@/components/shared/CallAction";
import { ViewTracker } from "@/components/shared/ViewTracker";
import { ReferralForm } from "@/components/templates/ReferralForm";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

export function ReferralPage() {
  return (
    <article>
      <ViewTracker event={{ name: "referrer_start", step: "page_view" }} />

      <div className="border-b border-ink/10 bg-ink py-12 text-bone sm:py-16">
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "For Referrers", path: "/for-referrers" },
            ]}
          />
          <Reveal scale>
            <p className="mono-label mt-4 text-xs text-bronze">For healthcare professionals</p>
            <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Refer a patient to London Heart Centre
            </h1>
            <p className="prose-measure mt-4 text-base leading-7 text-stone">
              A dedicated pathway for GPs and healthcare professionals referring
              patients for consultant cardiology assessment and diagnostics.
            </p>
          </Reveal>
        </Container>
      </div>

      <Container className="max-w-3xl py-12">
        <Reveal>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">Who can refer</h2>
            <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
              GPs, allied health professionals and other consultants may refer
              patients for cardiology assessment. Self-referral is also
              available for patients who prefer to book directly.
            </p>
          </section>
        </Reveal>

        <Reveal className="mt-10">
          <section className="grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Patient information required
              </h2>
              <ul className="prose-measure mt-3 space-y-2 text-sm leading-6 text-ink/75">
                <li>Full name and date of birth</li>
                <li>Contact details</li>
                <li>Private medical insurance details, if applicable</li>
              </ul>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Clinical information required
              </h2>
              <ul className="prose-measure mt-3 space-y-2 text-sm leading-6 text-ink/75">
                <li>Presenting complaint and relevant history</li>
                <li>Current medication</li>
                <li>Relevant previous investigations or letters</li>
              </ul>
            </div>
          </section>
        </Reveal>

        {/* Not gated behind scroll reveal — urgent referral guidance should be immediately visible. */}
        <section className="mt-10 border-l-4 border-oxblood bg-oxblood/5 px-5 py-4">
          <h2 className="font-display text-base font-semibold text-ink">
            Urgent referrals
          </h2>
          <p className="prose-measure mt-2 text-sm leading-6 text-ink/75">
            For urgent clinical concerns, please telephone our clinical team
            directly rather than submitting the form below. If a patient may
            be experiencing a medical emergency, direct them to call 999.
          </p>
          <div className="mt-3">
            <CallAction source="referral_urgent" />
          </div>
        </section>

        <Reveal className="mt-10">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              What happens next
            </h2>
            <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
              Referrals are reviewed by our clinical team, who will confirm
              receipt and arrange an appropriate appointment.{" "}
              <span className="mono-label text-bronze">[VERIFY response time]</span>
            </p>
          </section>
        </Reveal>

        <Reveal className="mt-10">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              Reports and communication
            </h2>
            <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
              A clinic letter is sent to the referring clinician after each
              consultation, along with relevant diagnostic results, to keep
              shared care fully informed.
            </p>
          </section>
        </Reveal>

        <Reveal className="mt-10">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              CPD and educational resources
            </h2>
            <p className="prose-measure mt-3 text-sm leading-6 text-ink/75">
              Educational resources and CPD-accredited sessions for referring
              colleagues are being developed.{" "}
              <span className="mono-label text-bronze">[VERIFY]</span>
            </p>
          </section>
        </Reveal>

        <Reveal className="mt-14">
          <section className="border-t border-ink/10 pt-10">
            <h2 className="font-display text-xl font-semibold text-ink">
              Submit a referral
            </h2>
            <p className="prose-measure mt-2 mb-8 text-sm leading-6 text-ink/70">
              Prefer to speak to someone first? Call {siteConfig.telephone} to
              discuss a referral with our clinical team.
            </p>
            <ReferralForm />
          </section>
        </Reveal>
      </Container>
    </article>
  );
}
