import { heroChapters } from "@/lib/hero/frames";
import { BookingCTA } from "@/components/shared/BookingCTA";

/**
 * Static, stacked rendering of the three hero chapters. This is what
 * server-rendered HTML, no-JS visitors, and prefers-reduced-motion visitors
 * see — every headline, supporting line and CTA in normal document flow,
 * no canvas required.
 */
export function HeroChapterStack() {
  return (
    <div className="border-y border-bronze/20 bg-ink">
      <div className="mx-auto max-w-3xl divide-y divide-bone/10 px-5 sm:px-8">
        {heroChapters.map((chapter) => (
          <div key={chapter.id} className="py-12 sm:py-16">
            <p className="mono-label text-xs text-bronze">CH.0{chapter.id}</p>
            <h2 className="prose-measure mt-3 font-display text-2xl font-bold leading-tight text-bone sm:text-3xl">
              {chapter.headline}
            </h2>
            {chapter.support && (
              <p className="prose-measure mt-3 text-base leading-7 text-stone">
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
  );
}
