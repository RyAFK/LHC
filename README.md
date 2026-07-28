# London Heart Centre — Website Redesign

A production-quality Next.js implementation of the London Heart Centre
website concept: consultant-led cardiology content, a clinically guided
diagnostics pathway, a dedicated GP/referrer route, and a cinematic
scroll-scrubbed hero built on a hand-rolled canvas engine.

**Brand note:** this build uses the temporary text mark **LHC** (with
"London Heart Centre" set alongside it in smaller type) per the brand
instruction not to reproduce the existing logo. See `components/brand/LHCMark.tsx`.

---

## 1. Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

Requires Node 20+. No environment variables are required to run the site —
there is no backend integration yet (see [Forms and booking](#forms-and-booking)).

---

## 2. Stack and architecture

- **Next.js App Router + TypeScript**, server components by default; `"use client"` only where interaction, browser APIs or state are required (header nav, filters, forms, the hero canvas).
- **Tailwind CSS v4** via `@theme` tokens in `app/globals.css` — the brand palette (`ink`, `oxblood`, `teal`, `bone`, `stone`, `bronze`) is defined once there, not hard-coded as hex values in components.
- **Fonts** via `next/font/google`: Manrope (`--font-manrope`, body/interface) and Archivo (`--font-archivo`, headings), plus IBM Plex Mono (`--font-plex-mono`) reserved for real labels, timings, test codes and the hero's calibration readout — never for decorative type.
- **Typed content** lives entirely in `lib/content/*.ts` (no CMS/MDX was introduced — the content shape is simple enough that a typed TS module is the least-dependency option; swapping in MDX or a headless CMS later just means changing these files' data source, not the components that consume them).
- **No Framer Motion.** The spec allowed it "only where genuinely useful" — every interface transition in this build (chapter cross-fades, FAQ disclosure, focus states) is achieved with plain CSS transitions or the native `<details>` element, so the dependency was removed rather than shipped unused.
- **Custom icon system, no icon library.** `components/icons/Icons.tsx` is a small set of hand-drawn line icons (24×24, 1.6px stroke, `currentColor`) covering symptoms, tests, pathway steps, trust-rail stats and utility actions. It exists so the site reads as designed rather than text-only, without pulling in an icon package or generic medical clip-art — every icon is a plain React SVG component.
- **Scroll-reveal animations** (`components/ui/Reveal.tsx`, `hooks/useInView.ts`) fade, lift (44px on one axis) and slightly scale section headings and grid cards into place as they enter the viewport via `IntersectionObserver` — no scroll-position math, no library. 800ms, the brief's `cubic-bezier(.22,1,.36,1)`, staggered across grids. Each reveal fires once and never re-hides on scroll-up. `hooks/usePrefersReducedMotion.ts` (shared with the hero) disables it entirely under `prefers-reduced-motion: reduce`, rendering content already-visible with no transition. Deliberately **not** applied to the emergency notice, urgent-care/urgent-referral guidance, or the final/primary booking CTA — safety and conversion content should never wait on a scroll trigger to appear. Applied throughout: the homepage, every symptom/condition/test/specialist detail page, the referral page, and all index/static pages (`/care`, `/screening`, `/about`, `/contact`, `/book`, `/symptoms`, `/conditions`, `/tests`, `/specialists`).
- **A CSS pitfall worth knowing about**: wrapping a card's root `<Link>` in a `Reveal` div means that anchor is no longer a *direct* CSS Grid child, so it loses Grid's automatic "blockification" of inline children (an `<a>` is `display: inline` by default) — the result is broken, overlapping card layouts. Every card component wrapped in `Reveal` (`SymptomCard`, `ConditionCard`, the `/care` pathway cards, etc.) therefore sets `block h-full` explicitly on its own root element rather than relying on grid context to do it implicitly. If you add a new card type and wrap it in `Reveal`, give its root element an explicit `block` (or `flex`) class.
- The mobile bottom utility bar (`MobileUtilityBar`) carries `[transform:translateZ(0)] [will-change:transform]` — the standard defensive fix for iOS Safari's known rendering glitch where `position: fixed` elements can briefly detach during momentum scrolling. Verified via automated `getBoundingClientRect` checks that it stays correctly pinned to the viewport bottom at every scroll offset. Note: full-page/stitched screenshot tools (not real scrolling) will still show it once at its fixed offset partway down the image — that's inherent to how `position: fixed` is captured by such tools, not a live-site bug.

### Directory guide

```
app/                    routes (see IA below)
components/
  brand/                LHCMark (temporary wordmark)
  layout/                header, mobile nav, mobile utility bar, footer
  hero/                  the cinematic hero: intro, canvas engine, static fallback
  home/                  homepage-only sections (route selector, symptom navigator, etc.)
  shared/                cross-page reusable components (TrustRail, PriceSummary, BookingCTA, ...)
  templates/             SymptomPage, ConditionPage, TestPage, SpecialistProfile, ReferralPage
  ui/                    layout primitives (Container, SectionHeading)
lib/
  content/               typed content models + data (symptoms, conditions, tests, specialists, ...)
  hero/                  frame/progress math + canvas drawing helpers (framework-agnostic)
  analytics.ts           event tracking abstraction
  seo.ts                 JSON-LD builders + per-page metadata helper
  site-config.ts         contact details, navigation, emergency notice copy
hooks/
  useHeroFrameLoader.ts  progressive frame preloader for the hero
scripts/
  extract_frames.py      video → WebP frame sequence extractor
```

---

## 3. Information architecture

All routes from the brief are implemented:

`/`, `/care`, `/screening`, `/symptoms`, `/symptoms/[slug]`, `/conditions`,
`/conditions/[slug]`, `/tests`, `/tests/[slug]`, `/specialists`,
`/specialists/[slug]`, `/for-referrers`, `/about`, `/contact`, `/book`,
`/privacy`, `/accessibility`, plus `sitemap.xml`, `robots.txt` and a 404.

`/conditions` was added as its own index (not just embedded in `/symptoms`)
because the IA explicitly lists it as a first-class route; `/symptoms` also
surfaces conditions inline so the "Symptoms & Conditions" nav item has one
obvious home.

---

## 4. The animated hero — current asset status

### 4a. The ambient hero loop (`HeroIntro`'s backdrop) — done, real asset

`HeroIntro`'s backdrop (the always-visible, static-in-flow section with the
real H1) now plays a real 10-second seamless ambient loop, built from a media
pack the user supplied directly (six PNG keyframes — consultant's eye/ECG →
echocardiogram → anatomical heart → coronary lumen → iris again → back to the
opening frame — plus a written creative brief specifying timing, easing and
loop requirements).

- **Encoding**: each keyframe becomes its own short clip via `ffmpeg`'s
  `zoompan` filter (a slow, near-imperceptible push/pull, 1.5–3% scale change
  per the brief, never more), chained together with `xfade` crossfades
  (`circleopen`/`circleclose` for the two eye↔scan match-dissolves, `fade`
  elsewhere), 1.0s each — long enough that nothing reads as a flash or hard
  cut. Total output is trimmed to exactly 10.000s.
- **Seamless loop, verified**: the final segment is a static hold on the
  opening frame at the same zoom level the loop starts at (no cumulative
  scale/position drift), and the encoded first/last frame were diffed
  pixel-by-pixel (mean channel difference ~1/255 — compression noise, not a
  visible seam) before this was considered done.
- **Assets**: `public/media/hero-loop/hero-loop.mp4` (H.264, ~3.4MB),
  `hero-loop.webm` (VP9, ~1.1MB), `hero-loop-poster.webp` (first-frame
  poster/reduced-motion fallback, 1600×900).
- **Component** (`components/hero/HeroLoop.tsx`): `<video>` with
  `autoplay muted loop playsInline preload="auto"`, WebM source before MP4.
  An `IntersectionObserver` pauses playback once the hero scrolls out of
  view. `usePrefersReducedMotion` swaps the whole thing for the static poster
  `<img>` with no video element in the DOM at all. A left-to-right dark
  gradient sits between the video and the copy so the white H1 stays
  readable without a heavy overlay flattening the imagery; on mobile the
  video's `object-position` is weighted right (~85%) so the narrower crop
  doesn't cut into the eye/heart focal point, matching the brief's
  responsive-behaviour section.

This is a separate concern from the 96-frame scroll-scrubbed chapter sequence
described below (`HeroSequence`) — that engine is still waiting on real
footage; nothing about the ambient loop above changes that.

### 4b. The scroll-scrubbed chapter sequence (`HeroSequence`) — still a placeholder

**The scroll-scrubbed hero video has not been added to this repository.**
Here's exactly why, so it isn't mistaken for an oversight:

The brief supplied a Higgsfield generation ID and confirmed the clip exists
(`kling3_0_turbo`, 1280×720, 4s — resolves to ~96 frames at 24fps, matching
the spec's frame count). It's hosted on Higgsfield's CloudFront distribution.
This session's outbound network policy does not allow that host — confirmed
via a direct request, which the egress proxy rejected with a policy denial
(not a transient failure). Two alternate hosts were also tried
(`higgsfield.ai`, `api.higgsfield.ai`, in case the asset were reachable via
the platform's own domain rather than its CDN) and both were denied with the
same policy rejection, confirming this is a session-level egress restriction
on arbitrary external hosts, not something specific to one URL that's worth
routing around further. `ffmpeg` **is** installed in this environment and the
extraction script below has been validated against a synthetic test clip, so
the pipeline is proven; only the source file is missing.

Per the brief's own instruction for this situation ("If the asset has not yet
been added to the repository, create the full animation engine and use a
deliberate static poster placeholder. Do not block the rest of the build."),
the complete engine is implemented and this is exactly the fallback path it
takes today.

**To finish this once the video is reachable:**

1. Download the source clip from the URL captured against generation ID
   `1cd4d18e-c0d8-438a-a1aa-be4c46b1bcdf` and save it to
   `public/media/lhc-heart-precision.mp4`.
2. Run the extraction script:

   ```bash
   python3 scripts/extract_frames.py public/media/lhc-heart-precision.mp4 public/media/lhc-heart-sequence --fps 24 --width 1920
   ```

   This produces `frame_0000.webp` … `frame_0095.webp` (or however many the
   clip yields — the script prints the count; update `TOTAL_FRAMES` in
   `lib/hero/frames.ts` if it isn't 96).
3. Reload the site. No component changes are needed: `HeroSequence`
   (`components/hero/HeroSequence.tsx`) preloads the critical frames
   (`[0, 20, 21, 60, 61, 95]`) on mount, and switches from the static
   fallback into the animated canvas sequence automatically once at least
   one frame loads successfully.

### How the engine works (`components/hero/`, `lib/hero/`, `hooks/useHeroFrameLoader.ts`)

- **Progressive enhancement, not a fork.** `HeroSequence` always renders
  `HeroChapterStack` (the static, stacked, no-JS-safe version of the three
  chapters) first — this is what SSR/no-JS/crawlers see. A `useSyncExternalStore`
  subscription to `prefers-reduced-motion` plus `useHeroFrameLoader`'s result
  are combined into a single derived `mode` (`"static" | "animated"`); the
  component only swaps to the canvas-driven `AnimatedSequence` once motion is
  allowed **and** at least one frame has loaded. There is never a duplicate
  copy of the chapter copy in the DOM.
- **Frame loading** (`hooks/useHeroFrameLoader.ts`): preloads the 6 critical
  frames via `Promise.allSettled` (so one 404 doesn't block the rest), then
  loads the remaining frames in batches of 8 via `requestIdleCallback`
  (falling back to `setTimeout` where unsupported). Nothing blocks first
  paint — the static intro (`HeroIntro`) is a plain SVG + CSS background, not
  a canvas frame.
- **Canvas engine** (`lib/hero/canvasEngine.ts`): DPR-aware sizing (capped at
  2.5x to bound memory on very high-density displays) and cover-fit drawing
  (crops to fill, never letterboxes).
- **Progress → frame mapping** (`lib/hero/frames.ts`): implements the exact
  suggested mapping (0–0.18 → frames 0–20, 0.18–0.32 dwell, 0.32–0.65 →
  21–60, 0.65–0.78 dwell, 0.78–1.00 → 61–95) with `nearestLoadedFrame()`
  searching outward from the target index so a still-loading frame never
  produces a blank canvas.
- **Scroll scrubbing**: an `IntersectionObserver` starts/stops the
  `requestAnimationFrame` loop entirely (not just skips work) when the
  sequence leaves the viewport, satisfying the "pause when off-screen"
  performance requirement. Progress is smoothed with
  `current += (target - current) * 0.12` exactly as specified.
- **Reduced motion**: `useHeroFrameLoader` is passed `enabled=false` when
  `prefers-reduced-motion: reduce`, so no frames are fetched at all — the
  static chapter stack (which already contains every headline, supporting
  line and CTA in normal document flow) is the permanent, final state.

### Reconciling the two hero specs

The brief gives an exact headline/CTA set for "the cinematic animated hero"
(section 1: *"Expert heart care, without the uncertainty."*) and a separate,
different set of headlines for "Hero chapters" (*"Private cardiology, made
clear."*, etc.), with a progress mapping that would otherwise make chapter 1
the very first thing visible — directly conflicting with section 1's H1.

Resolution used here: `HeroIntro` renders section 1's copy verbatim as the
page's real, static, always-in-flow `<h1>` (this is also the LCP element).
Immediately below it, the 320vh/220vh chapter sequence plays out using the
"Hero chapters" copy. Both explicit instructions are honoured in full; they
just don't occupy the same pixels at the same time.

---

## 5. Frame extraction

```bash
python3 scripts/extract_frames.py public/media/lhc-heart-precision.mp4 public/media/lhc-heart-sequence --fps 24 --width 1920
```

Requires `ffmpeg` on `PATH`. Flags: `--fps` (default 24), `--width` (default
1920, height computed to preserve aspect ratio), `--quality` (WebP quality,
default 82). Frames are written as `frame_0000.webp`, `frame_0001.webp`, …

---

## 6. Animation chapter map

| Chapter | Progress range | Headline | Support / annotation | CTA |
|---|---|---|---|---|
| 1 | 0.00 – 0.32 (rise 0–0.18 over frames 0–20, dwell 0.18–0.32 on frame 20) | "Private cardiology, made clear." | "Established 1978 · Upper Wimpole Street" | — |
| 2 | 0.32 – 0.78 (rise 0.32–0.65 over frames 21–60, dwell 0.65–0.78 on frame 60) | "Answers without unnecessary delay." | "Consultant assessment and advanced diagnostics in one connected pathway." | — |
| 3 | 0.78 – 1.00 (rise over frames 61–95) | "One specialist pathway. Clear next steps." | — | "Book a consultation" → `/book` |

Defined in `lib/hero/frames.ts` (`heroChapters`, `frameForProgress`,
`chapterForProgress`) and consumed identically by both the animated canvas
overlay and the static fallback stack — one source of truth for the copy.

---

## 7. Performance notes

- **LCP**: the hero's H1 is plain server-rendered HTML and is the LCP
  candidate; it never waits on the video. The ambient loop's `<video poster>`
  displays the poster image immediately while the (already-preloading) video
  buffers in, and reduced-motion visitors get a plain `<img>` instead of a
  video element at all.
- **The frame sequence never blocks first paint.** `HeroSequence` renders
  the static chapter stack synchronously; frame loading only starts in a
  `useEffect` after mount, and only if motion is allowed.
- **Critical-frame budget**: only 6 frames (`[0, 20, 21, 60, 61, 95]`) are
  preloaded before the animated mode is even considered — at typical hero
  frame sizes this is comfortably inside the ~1.2MB budget; verify actual
  byte size once real frames are extracted (`ls -la public/media/lhc-heart-sequence`).
- **Remaining frames load in idle-time batches of 8**, never as one large
  burst, so they don't compete with interaction-critical JS.
- **Canvas work pauses off-screen** via `IntersectionObserver` disconnecting
  the `requestAnimationFrame` loop entirely, not just skipping draw calls.
- **DPR is capped at 2.5x** in `sizeCanvasForDpr` to bound canvas memory/fill
  cost on very high-density displays without visibly softening the image.
- Below-the-fold content (specialist cards, test cards) ships no images
  beyond inline SVG/text placeholders, so there's nothing large to lazy-load
  yet — when real specialist photography is added, use `next/image` with
  explicit `width`/`height` and `loading="lazy"` to protect CLS.
- Run Lighthouse against `npm run build && npm run start` (not `next dev`,
  which is unoptimized) before launch; this hasn't been done in this
  environment because there's no headless Chrome target wired up here — see
  the [VERIFY] checklist.

---

## 8. SEO implementation

- **Per-page metadata** goes through `pageMetadata()` in `lib/seo.ts`, which
  derives `title`, `description`, `alternates.canonical` and a matching
  `openGraph` block from one call — every route in `app/` uses it (or, for
  the four dynamic routes, calls it from `generateMetadata`).
- **JSON-LD**: `Organization` and `MedicalClinic` are emitted once in the
  root layout; `BreadcrumbList` on every content page; `Physician` on each
  specialist profile; `["MedicalTest", "Service"]` on each test page (the
  more precise `MedicalTest` type is kept alongside `Service` rather than
  instead of it, since the brief calls for `Service` specifically and
  `Product` is explicitly disallowed for clinical services). See `lib/seo.ts`.
- **`AggregateRating` is deliberately omitted.** The Doctify figure (4.93/207)
  is flagged `confirm_before_launch` in `lib/content/trust.ts` and its
  eligibility/provenance has not been verified — adding `AggregateRating`
  without that would be exactly the kind of unverified structured-data claim
  the brief warns against.
- **`sitemap.xml`** (`app/sitemap.ts`) and **`robots.txt`** (`app/robots.ts`)
  are generated from the same content arrays that drive the pages, so a new
  symptom/condition/test/specialist entry is automatically included.
- **Redirect map placeholder** (`lib/redirects.ts` + `next.config.ts`): a
  typed, currently-empty `shopifyRedirects` array with the commented-out
  shape a real migration would need. The old Shopify URL structure was not
  supplied, so this is intentionally empty rather than guessed — see the
  [VERIFY] checklist.
- **Breadcrumbs** render visibly (`components/shared/Breadcrumbs.tsx`) and
  feed the `BreadcrumbList` JSON-LD from the same `items` array.
- Internal linking is data-driven, not manual: every symptom/condition/test
  links to its cross-referenced counterparts via the `relevantX` slug arrays
  in `lib/content/*.ts`.

---

## 9. Accessibility notes

- Skip link, visible `:focus-visible` outline (teal, 2px, 2px offset) defined
  once in `app/globals.css` and inherited everywhere — no component
  overrides `outline: none`.
- All interactive targets are `min-h-11`/`min-w-11` (44px) — nav links,
  mobile menu button, filter checkboxes, the mobile utility bar.
- FAQs use native `<details>/<summary>` (`FAQAccordion`), so they're
  keyboard- and screen-reader-accessible with zero JS.
- Forms (`ReferralForm`, `ContactForm`, `BookingRequestForm`) use associated
  `<label htmlFor>` on every field, `required` + `reportValidity()` for
  native validation messaging, and an `role="alert"` summary on submit
  failure.
- The emergency notice (`EmergencyNotice`) is a plain, always-visible
  bordered block — no color-only signalling, no flashing, no modal.
- `prefers-reduced-motion: reduce` is honoured at both the CSS level
  (`scroll-behavior` disabled in `app/globals.css`) and the hero engine level
  (scrubbing disabled entirely, see §4).
- The canvas element is `aria-hidden="true"`; equivalent content (the
  chapter headlines) always exists as real, non-hidden DOM text.
- Not yet done in this environment: a full automated WCAG 2.2 AA audit
  (axe/Lighthouse) and manual screen-reader pass — see the [VERIFY] checklist.

---

## 10. Analytics event map

`lib/analytics.ts` exports a typed `track()` function (no real provider
wired up — events are logged to the console in development and dispatched
as a `window` `CustomEvent`, so a real provider can subscribe later without
touching call sites).

| Event | Fired from |
|---|---|
| `cta_book_click` | Every `BookingCTA` instance (header, mobile nav, mobile utility bar, hero, homepage sections, all templates) |
| `cta_call_click` | Every `CallAction` instance, plus the mobile utility bar's Call button |
| `route_select` | The four "Where should I start?" cards (`RouteSelector`) |
| `symptom_select` | Symptom cards on the homepage and `/symptoms` index (`SymptomCard`) |
| `test_view` | The "View test" link on `TestCard`, and on mount of each `/tests/[slug]` page (`ViewTracker`) |
| `specialist_select` | "View profile" link on `SpecialistCard` |
| `referrer_start` | On mount of `/for-referrers` (`ViewTracker`) |
| `form_start` | First focus into the referral form, contact form, or booking request form |
| `form_submit` | Successful client-side validation + submit of any of the three forms |
| `booking_handoff` | Successful submit of the booking request form on `/book` |

---

## 11. Forms and booking

There is no backend yet. `ReferralForm`, `ContactForm` and
`BookingRequestForm` do real client-side validation (native HTML
`required`/`type` constraints + `reportValidity()`) and show a genuine
confirmation state on submit, but nothing is actually transmitted anywhere —
each confirmation state says so explicitly with a `[VERIFY submission
routing]` marker. Wiring these to a real endpoint (booking system, CRM,
secure email) is the next step before launch.

---

## 12. [VERIFY] checklist

Everything below is either explicitly flagged in the code with `[VERIFY]`
or a `confirm_before_launch` status field, collected here for convenience.
**None of this content should be treated as factual about the real London
Heart Centre.**

- [ ] **Trust rail figures** (`lib/content/trust.ts`): established year
      (1978), Doctify rating (4.93/207), insurer acceptance, location — still
      marked `confirm_before_launch`. The specialist count is now `verified`
      (it's derived from `specialists.length`, so it can't drift out of sync
      with the actual directory).
- [x] **Specialist profiles** (`lib/content/specialists.ts`): replaced with
      18 real consultants — names, credentials, photos and full biographies
      sourced directly from londonheartcentre.com/pages/our-team
      (`profileStatus: "verified"`). Still worth an LHC review pass before
      launch: `conditionsTreated`/`testsPerformed`/`patientConcerns` are this
      project's own mapping of each bio onto our fixed taxonomy (not a
      verbatim claim), and `nhsAppointment`/`availability` are inferred from
      bio text rather than confirmed directly. The source page also lists a
      19th person, Dr Siva Sundar, whose bio describes a GP/executive-health
      concierge role rather than a cardiology consultancy — he's been left
      out of this cardiology-specific directory; confirm with LHC whether he
      should appear elsewhere on the site instead.
- [ ] **Patient reviews** (`lib/content/reviews.ts`): intentionally empty.
      No Doctify excerpts were supplied, so none were invented. Populate with
      real, permissioned excerpts, or the site will keep showing the honest
      "pending" state.
- [ ] **Insurers accepted** (`lib/content/insurers.ts`): lists commonly
      recognised UK insurers but none of these relationships have been
      confirmed — verify actual current agreements.
- [ ] **AggregateRating JSON-LD**: only add this once the Doctify figure's
      eligibility, provenance and policy compliance are confirmed (see §8).
- [ ] **Clinical review metadata** on every symptom/condition page
      (`ClinicalReviewFooter`): reviewer name is a `[VERIFY]` placeholder;
      needs a real named clinical reviewer, and the NHS/BHF source links
      should be checked for currency.
- [ ] **Hero video asset**: not present in the repo — see §4 for exactly
      what's needed to complete it.
- [ ] **Shopify redirect map** (`lib/redirects.ts`): currently empty —
      needs the real old-site URL list.
- [ ] **Production domain** (`lib/site-config.ts` → `siteConfig.url`): set to
      a placeholder `.example` domain; update before deploying.
- [ ] **Form backends**: referral, contact and booking forms are UI-only
      (see §11).
- [ ] **Lighthouse / axe accessibility audit**: not run in this environment
      (no headless browser target configured here) — run against a
      production build before launch.

---

## 13. Handover — key decisions

- **Specialist headshot placeholder is a designed avatar, not a flat
  initials box.** `components/shared/SpecialistAvatar.tsx` combines a bust
  icon with calibration-ring linework (echoing the hero's ECG/scan-line
  motif) and an initials badge — visually consistent with the brand, and a
  single component so swapping in real photography later is a one-file
  change everywhere it's used (card, profile header).
- **Progressive enhancement over feature-detection branching** for the
  hero: rather than trying to render two different trees for "JS/motion OK"
  vs "reduced/no-JS", the component always starts in the static state (which
  is also what SSR produces) and only swaps to the canvas-driven state once
  it's actually earned it (frames loaded, motion allowed). This removes an
  entire class of hydration-mismatch and duplicate-content bugs.
- **No CMS/MDX.** The brief asked for "typed local data or MDX" — given the
  content shape (symptoms/conditions/tests/specialists all cross-reference
  each other by slug), a handful of typed TypeScript arrays in
  `lib/content/` was the lower-dependency choice and keeps the cross-linking
  fully type-checked at build time. Swapping to a CMS later is a data-layer
  change, not a component rewrite.
- **Framer Motion was installed, then removed.** Every interface transition
  this build actually needed was achievable with plain CSS transitions
  (`transition-[opacity,transform]` + the specified cubic-bezier) or, for
  the FAQ disclosure, the native `<details>` element. Since the brief says
  to use it "only where genuinely useful" and nothing here met that bar, it
  was uninstalled rather than left as dead weight.
- **Sample specialist data is clearly marked, not just quietly fake.** Real
  people's names, credentials and clinical histories are the kind of claims
  the brief explicitly says not to invent. Rather than skip the specialist
  template entirely, six clearly-flagged placeholder profiles
  (`profileStatus: "sample"`, a visible "confirm before launch" badge on
  every card and profile page) demonstrate the full card/profile/filter UI
  without asserting anything factual.
- **The hero's two conflicting copy specs were resolved by sequencing, not
  by picking one.** See §4 — both the exact section-1 headline and the
  exact three chapter headlines appear, in full, just not simultaneously.
- **`useSyncExternalStore` over `useEffect` + `useState`** for reduced-motion
  detection (`components/hero/HeroSequence.tsx`): this is the correct React
  primitive for subscribing to external, synchronously-readable browser
  state (`matchMedia`), avoids an extra render-then-correct flash, and
  satisfies the stricter React Compiler lint rule against synchronous
  `setState` calls inside effect bodies.
- **Diagnostics are never products.** No `Product` schema, no cart/basket
  language anywhere in the codebase (verified — see the acceptance-criteria
  check in the final QA pass), and every test's price is either a real
  `£X` or the literal string "Price confirmed after assessment" — the
  `PriceSummary` component has no code path that can render `£0`.
- **How the real specialist data got in**: this session couldn't fetch
  `londonheartcentre.com` directly (`WebFetch` was blocked for every URL
  tried in this session, including neutral test pages — a session-level
  restriction, not that site's bot protection), so the team page was saved
  client-side as a `.mht` (MHTML) archive and attached. MHTML is just a MIME
  multipart message, so Python's standard-library `email` module parses it
  directly — no scraping library needed. That yielded the original page HTML
  plus every embedded image as raw bytes. The images were served as
  WebP/AVIF despite `.jpg`/`.png` URLs (content negotiation), so `ffmpeg`
  (already present in this environment) re-encoded all 18 headshots to a
  consistent 640px-wide WebP. Bios were extracted from the repeating
  `multicolumn-card` HTML structure with a small regex parser — no bio text
  was rewritten, only lightly re-flowed from `<br><br>`-separated HTML into
  paragraphs.
