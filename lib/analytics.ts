// Analytics abstraction. No real analytics provider is wired up yet: events are
// dispatched as CustomEvents on window and logged in development, so a real
// provider (GA4, server-side tracking, etc.) can subscribe later without any
// call-site changes.

export type AnalyticsEvent =
  | { name: "cta_book_click"; source: string }
  | { name: "cta_call_click"; source: string }
  | { name: "route_select"; route: string }
  | { name: "symptom_select"; symptom: string }
  | { name: "test_view"; test: string }
  | { name: "specialist_select"; specialist: string }
  | { name: "referrer_start"; step: string }
  | { name: "form_start"; form: string }
  | { name: "form_submit"; form: string }
  | { name: "booking_handoff"; destination: string };

const EVENT_CHANNEL = "lhc:analytics";

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    console.info(`[analytics] ${event.name}`, event);
  }

  window.dispatchEvent(new CustomEvent(EVENT_CHANNEL, { detail: event }));
}

export function onAnalyticsEvent(
  handler: (event: AnalyticsEvent) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const listener = (e: Event) => {
    handler((e as CustomEvent<AnalyticsEvent>).detail);
  };

  window.addEventListener(EVENT_CHANNEL, listener);
  return () => window.removeEventListener(EVENT_CHANNEL, listener);
}
