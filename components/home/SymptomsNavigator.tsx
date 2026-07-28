import { symptoms } from "@/lib/content/symptoms";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmergencyNotice } from "@/components/shared/EmergencyNotice";
import { SymptomCard } from "@/components/home/SymptomCard";
import { Reveal } from "@/components/ui/Reveal";

/** Section 4: connects symptoms to information, assessments and specialists — never a diagnosis. */
export function SymptomsNavigator() {
  return (
    <section className="bg-bone-dim py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Symptoms navigator"
            title="Recognise something below?"
            lede="Select a symptom to understand how LHC approaches it, which assessments may be relevant, and which specialists focus on it."
          />
        </Reveal>

        {/* Not gated behind scroll reveal — safety guidance should be immediately visible. */}
        <div className="mt-8">
          <EmergencyNotice />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {symptoms.map((symptom, i) => (
            <Reveal key={symptom.slug} delayMs={Math.min(i, 5) * 100}>
              <SymptomCard symptom={symptom} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
