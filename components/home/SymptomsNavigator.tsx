import { symptoms } from "@/lib/content/symptoms";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmergencyNotice } from "@/components/shared/EmergencyNotice";
import { SymptomCard } from "@/components/home/SymptomCard";

/** Section 4: connects symptoms to information, assessments and specialists — never a diagnosis. */
export function SymptomsNavigator() {
  return (
    <section className="bg-bone-dim py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Symptoms navigator"
          title="Recognise something below?"
          lede="Select a symptom to understand how LHC approaches it, which assessments may be relevant, and which specialists focus on it."
        />

        <div className="mt-8">
          <EmergencyNotice />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {symptoms.map((symptom) => (
            <SymptomCard key={symptom.slug} symptom={symptom} />
          ))}
        </div>
      </Container>
    </section>
  );
}
