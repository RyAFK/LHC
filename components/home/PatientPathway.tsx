import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhoneCallIcon, StethoscopeIcon, FileTextIcon } from "@/components/icons/Icons";

const steps = [
  {
    step: "01",
    title: "Speak to our team",
    body: "Call or book online to arrange your first appointment. We will help direct you to the right consultant for your needs.",
    Icon: PhoneCallIcon,
  },
  {
    step: "02",
    title: "Consultant assessment and diagnostics",
    body: "Meet your consultant for a detailed assessment. Where needed, relevant diagnostic tests are arranged as part of one connected visit.",
    Icon: StethoscopeIcon,
  },
  {
    step: "03",
    title: "Clear plan and follow-up",
    body: "Your consultant explains the findings in plain English, agrees a clear plan with you, and arranges any follow-up that is needed.",
    Icon: FileTextIcon,
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

        <ol className="relative mt-14 grid gap-10 sm:grid-cols-3">
          <div
            aria-hidden="true"
            className="absolute top-[26px] left-0 right-0 hidden h-px bg-bronze/25 sm:block"
          />
          {steps.map((s) => (
            <li key={s.step} className="relative">
              <span className="relative z-10 flex h-[52px] w-[52px] items-center justify-center border-2 border-bronze bg-bone text-oxblood">
                <s.Icon className="h-6 w-6" />
              </span>
              <span className="mono-label mt-4 block text-xs text-ink/40">{s.step}</span>
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
