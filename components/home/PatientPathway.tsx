import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    step: "01",
    title: "Speak to our team",
    body: "Call or book online to arrange your first appointment. We will help direct you to the right consultant for your needs.",
  },
  {
    step: "02",
    title: "Consultant assessment and diagnostics",
    body: "Meet your consultant for a detailed assessment. Where needed, relevant diagnostic tests are arranged as part of one connected visit.",
  },
  {
    step: "03",
    title: "Clear plan and follow-up",
    body: "Your consultant explains the findings in plain English, agrees a clear plan with you, and arranges any follow-up that is needed.",
  },
];

/** Section 5: reassuring three-step pathway. */
export function PatientPathway() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What to expect"
          title="A clear, connected pathway"
          lede="Every patient follows the same considered process, from first contact to a plan you understand."
        />

        <ol className="mt-12 grid gap-10 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.step} className="border-t-2 border-bronze pt-5">
              <span className="mono-label text-xs text-ink/40">{s.step}</span>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                {s.title}
              </h3>
              <p className="prose-measure mt-3 text-sm leading-6 text-ink/65">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
