import type { Condition } from "@/lib/content/types";

const pendingReview = (sources: Condition["review"]["sources"]) => ({
  reviewerName: "[VERIFY] Named consultant cardiologist",
  reviewerRole: "Consultant Cardiologist, London Heart Centre",
  publishedDate: "2026-07-28",
  reviewDate: "2027-01-28",
  sources,
});

export const conditions: Condition[] = [
  {
    slug: "coronary-artery-disease",
    name: "Coronary Artery Disease",
    overview:
      "Coronary artery disease develops when the blood vessels supplying the heart muscle become narrowed, usually by a gradual build-up of fatty deposits. This can reduce blood flow to the heart, particularly during exertion.",
    commonSymptoms: [
      "Chest pain or tightness, often brought on by exertion",
      "Breathlessness with activity",
      "Pain spreading to the arm, neck or jaw",
    ],
    urgentCareGuidance:
      "Sudden, severe chest pain that does not ease, especially with sweating, sickness or breathlessness, needs immediate emergency care. Call 999.",
    assessmentOverview:
      "Assessment typically combines a detailed history, examination, resting ECG and often an exercise stress test or further imaging, selected by your consultant.",
    treatmentOverview:
      "Management ranges from lifestyle and risk-factor changes to medication, and in some cases procedures to improve blood flow. Your consultant will explain the options relevant to you.",
    relevantTests: [
      "electrocardiogram",
      "exercise-stress-test",
      "heart-screening",
    ],
    relevantSpecialists: ["naomi-ellery", "julian-ferris"],
    review: pendingReview([
      { label: "NHS — Coronary heart disease", href: "https://www.nhs.uk/conditions/coronary-heart-disease/" },
    ]),
  },
  {
    slug: "atrial-fibrillation",
    name: "Atrial Fibrillation",
    overview:
      "Atrial fibrillation is an irregular, often fast, heart rhythm that starts in the upper chambers of the heart. It is one of the most common heart rhythm conditions and can range from occasional to persistent.",
    commonSymptoms: [
      "Palpitations or an irregular heartbeat",
      "Breathlessness or reduced exercise tolerance",
      "Tiredness or dizziness",
    ],
    urgentCareGuidance:
      "New palpitations with chest pain, fainting or severe breathlessness need urgent assessment. If symptoms are severe or sudden, call 999.",
    assessmentOverview:
      "Diagnosis usually involves an ECG to capture the rhythm directly, often supported by a longer period of ambulatory heart monitoring if symptoms are intermittent.",
    treatmentOverview:
      "Management may include medication to control heart rate or rhythm, and an assessment of stroke risk. Some patients are suitable for procedural treatment, discussed individually.",
    relevantTests: ["electrocardiogram", "heart-monitor"],
    relevantSpecialists: ["rajan-kapoor", "naomi-ellery"],
    review: pendingReview([
      { label: "NHS — Atrial fibrillation", href: "https://www.nhs.uk/conditions/atrial-fibrillation/" },
    ]),
  },
  {
    slug: "heart-failure",
    name: "Heart Failure",
    overview:
      "Heart failure means the heart is not pumping blood around the body as efficiently as it should. It is a long-term condition that is usually managed rather than cured, and many people live well with appropriate treatment.",
    commonSymptoms: [
      "Breathlessness, especially when lying flat or with activity",
      "Fatigue and reduced ability to exercise",
      "Swelling in the ankles, feet or abdomen",
    ],
    urgentCareGuidance:
      "Sudden, severe breathlessness, especially at rest, or breathlessness with chest pain needs urgent assessment. If severe, call 999.",
    assessmentOverview:
      "Assessment typically includes a detailed history and examination, blood tests, ECG and an echocardiogram to assess how the heart is pumping.",
    treatmentOverview:
      "Treatment usually combines medication, lifestyle guidance and regular monitoring, with the aim of controlling symptoms and protecting the heart over the long term.",
    relevantTests: ["echocardiogram", "cardiopulmonary-exercise-test"],
    relevantSpecialists: ["helena-voss"],
    review: pendingReview([
      { label: "NHS — Heart failure", href: "https://www.nhs.uk/conditions/heart-failure/" },
    ]),
  },
  {
    slug: "hypertension",
    name: "Hypertension (High Blood Pressure)",
    overview:
      "Hypertension means the pressure of blood in your arteries is consistently higher than it should be. It rarely causes symptoms directly but is a significant long-term risk factor for heart and vascular disease.",
    commonSymptoms: [
      "Usually none — often identified on routine measurement",
      "Occasionally headaches or visual disturbance at very high readings",
    ],
    urgentCareGuidance:
      "Very high blood pressure readings with chest pain, severe headache, visual changes or confusion need urgent medical attention. Call 999 if severe.",
    assessmentOverview:
      "Assessment includes accurate blood pressure measurement, often supported by ambulatory monitoring, alongside a review of overall cardiovascular risk.",
    treatmentOverview:
      "Management typically combines lifestyle measures with medication where needed, tailored to your individual risk and response to treatment.",
    relevantTests: ["blood-pressure-monitoring", "heart-screening"],
    relevantSpecialists: ["marcus-whitfield"],
    review: pendingReview([
      { label: "NHS — High blood pressure", href: "https://www.nhs.uk/conditions/high-blood-pressure-hypertension/" },
    ]),
  },
  {
    slug: "valvular-heart-disease",
    name: "Valvular Heart Disease",
    overview:
      "Valvular heart disease occurs when one or more of the heart's valves does not open or close properly, affecting how efficiently blood flows through the heart.",
    commonSymptoms: [
      "Breathlessness, particularly with exertion",
      "A heart murmur identified on examination",
      "Fatigue or, in some cases, palpitations",
    ],
    urgentCareGuidance:
      "Sudden severe breathlessness, chest pain or fainting needs urgent assessment. If severe, call 999.",
    assessmentOverview:
      "An echocardiogram is the key test used to assess valve structure and function, often alongside a clinical examination and ECG.",
    treatmentOverview:
      "Some valve conditions are simply monitored over time, while others may eventually need a procedure. Your consultant will explain what is appropriate for your situation.",
    relevantTests: ["echocardiogram"],
    relevantSpecialists: ["sarah-okonkwo", "helena-voss"],
    review: pendingReview([
      { label: "NHS — Heart valve disease", href: "https://www.nhs.uk/conditions/heart-valve-disease/" },
    ]),
  },
  {
    slug: "cardiomyopathy",
    name: "Cardiomyopathy",
    overview:
      "Cardiomyopathy describes a group of conditions affecting the heart muscle itself, which can affect how well the heart pumps or relaxes. Some forms run in families.",
    commonSymptoms: [
      "Breathlessness with activity",
      "Palpitations",
      "Dizziness or, occasionally, blackouts",
    ],
    urgentCareGuidance:
      "Breathlessness at rest, fainting, or palpitations with chest pain need urgent assessment. If severe, call 999.",
    assessmentOverview:
      "Assessment usually involves an ECG and echocardiogram, and may include further imaging or heart rhythm monitoring depending on findings.",
    treatmentOverview:
      "Management depends on the type and severity, and may include medication, monitoring, lifestyle guidance and, where relevant, family screening.",
    relevantTests: ["echocardiogram", "cardiopulmonary-exercise-test"],
    relevantSpecialists: ["helena-voss", "julian-ferris"],
    review: pendingReview([
      { label: "NHS — Cardiomyopathy", href: "https://www.nhs.uk/conditions/cardiomyopathy/" },
    ]),
  },
];

export function getConditionBySlug(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}
