import type { Specialist } from "@/lib/content/types";
import { conditions as allConditions } from "@/lib/content/conditions";
import { tests as allTests } from "@/lib/content/tests";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { RelatedLinkList } from "@/components/shared/RelatedLinkList";
import { BookingCTA } from "@/components/shared/BookingCTA";
import { ReviewQuote, ReviewsPendingNotice } from "@/components/shared/ReviewQuote";
import { SpecialistAvatar } from "@/components/shared/SpecialistAvatar";
import { doctifyProfileUrl } from "@/lib/content/reviews";
import { Reveal } from "@/components/ui/Reveal";

export function SpecialistProfile({ specialist }: { specialist: Specialist }) {
  const conditionsTreated = allConditions.filter((c) =>
    specialist.conditionsTreated.includes(c.slug)
  );
  const testsPerformed = allTests.filter((t) => specialist.testsPerformed.includes(t.slug));
  const displayName = specialist.name.replace(" [VERIFY]", "");
  const displayCredentials = specialist.credentials.replace(" [VERIFY]", "");

  return (
    <article>
      <div className="border-b border-ink/10 bg-bone-dim py-10 sm:py-14">
        <Container className="max-w-4xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Specialists", path: "/specialists" },
              { name: displayName, path: `/specialists/${specialist.slug}` },
            ]}
          />

          {specialist.profileStatus === "sample" && (
            <p className="mono-label mt-4 inline-block bg-bronze/15 px-3 py-1 text-[0.65rem] text-bronze">
              Sample profile — confirm before launch
            </p>
          )}

          <Reveal scale className="mt-4">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <SpecialistAvatar
                name={specialist.name}
                photo={specialist.photo}
                className="aspect-square w-28 shrink-0 border border-ink/10"
              />
              <div>
                <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
                  {displayName}
                </h1>
                <p className="mt-1 text-ink/60">{displayCredentials}</p>
                <p className="mt-2 font-medium text-teal">{specialist.mainSpecialty}</p>
                {specialist.nhsAppointment && (
                  <p className="mono-label mt-2 text-[0.7rem] text-ink/40">
                    NHS appointment available
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </div>

      <Container className="max-w-4xl py-12">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            {specialist.bio && (
              <Reveal>
                <section>
                  <h2 className="font-display text-lg font-semibold text-ink">Biography</h2>
                  <div className="prose-measure mt-3 space-y-3 text-sm leading-6 text-ink/75">
                    {specialist.bio.split("\n\n").map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            )}

            <Reveal className={specialist.bio ? "mt-10" : ""}>
              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  Specialist interests
                </h2>
                <ul className="prose-measure mt-3 space-y-2 text-sm text-ink/75">
                  {specialist.specialistInterests.map((interest) => (
                    <li key={interest} className="flex gap-2">
                      <span aria-hidden="true" className="text-bronze">·</span>
                      {interest}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal className="mt-10">
              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  Training and qualifications
                </h2>
                <ul className="prose-measure mt-3 space-y-2 text-sm text-ink/75">
                  {specialist.training.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal className="mt-10">
              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  Research and publications
                </h2>
                <ul className="prose-measure mt-3 space-y-2 text-sm text-ink/75">
                  {specialist.researchPublications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal className="mt-10">
              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  Patient reviews
                </h2>
                <div className="mt-4">
                  {specialist.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {specialist.reviews.map((review) => (
                        <ReviewQuote key={review.quote} review={review} />
                      ))}
                    </div>
                  ) : (
                    <ReviewsPendingNotice doctifyUrl={doctifyProfileUrl} />
                  )}
                </div>
              </section>
            </Reveal>
          </div>

          <Reveal delayMs={150}>
            <aside className="space-y-8 lg:border-l lg:border-ink/10 lg:pl-8">
              <div>
                <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink/50">
                  Languages
                </h2>
                <p className="mt-2 text-sm text-ink/75">{specialist.languages.join(", ")}</p>
              </div>

              <div>
                <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink/50">
                  Availability
                </h2>
                <p className="mt-2 text-sm text-ink/75">{specialist.availability.summary}</p>
              </div>

              <RelatedLinkList
                title="Conditions treated"
                items={conditionsTreated.map((c) => ({ label: c.name, href: `/conditions/${c.slug}` }))}
              />
              <RelatedLinkList
                title="Tests or procedures"
                items={testsPerformed.map((t) => ({ label: t.name, href: `/tests/${t.slug}` }))}
              />

              <BookingCTA
                source={`specialist_${specialist.slug}`}
                label="Book appointment"
                className="w-full"
                size="lg"
              />
            </aside>
          </Reveal>
        </div>
      </Container>
    </article>
  );
}
