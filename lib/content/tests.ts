import type { DiagnosticTest } from "@/lib/content/types";

// Approximate durations, preparation and results timing are indicative and
// must be confirmed by LHC's clinical team before launch. Never display a
// fixed price unless it has been confirmed — use the "confirmed_after_assessment"
// price kind instead of a placeholder amount.
export const tests: DiagnosticTest[] = [
  {
    slug: "electrocardiogram",
    name: "Electrocardiogram (ECG)",
    shortLabel: "ECG",
    clinicalPurpose:
      "A resting ECG records the electrical activity of your heart to help identify rhythm problems, strain, or signs of past or current heart issues.",
    whatItMeasures:
      "The timing and strength of the electrical signals that make your heart beat, captured from sensors placed on your chest, arms and legs.",
    whatToExpect:
      "You will lie down while small sticky sensors are attached to your skin. The recording itself takes only a couple of minutes and is not uncomfortable.",
    approximateDuration: "15 minutes, including preparation", // [VERIFY]
    preparation:
      "No special preparation is usually required. Wear clothing that allows easy access to your chest, wrists and ankles.",
    resultsTiming: "Discussed with your consultant on the same visit", // [VERIFY]
    price: { kind: "confirmed_after_assessment" },
    relevantSymptoms: ["chest-pain", "palpitations", "dizziness-blackouts"],
    relevantConditions: ["coronary-artery-disease", "atrial-fibrillation"],
    relevantSpecialists: ["syed-ahsan", "antonio-creta", "filip-zemrak"],
  },
  {
    slug: "echocardiogram",
    name: "Echocardiogram",
    shortLabel: "Echo",
    clinicalPurpose:
      "An ultrasound scan of the heart used to assess the heart's chambers, valves and overall pumping function.",
    whatItMeasures:
      "The structure and movement of the heart muscle and valves, and the direction and speed of blood flow through the heart.",
    whatToExpect:
      "A trained sonographer or cardiologist moves a handheld probe across your chest while you lie on a couch. It is painless and uses no radiation.",
    approximateDuration: "30 to 45 minutes", // [VERIFY]
    preparation: "No fasting or special preparation is usually required.",
    resultsTiming: "Reviewed by your consultant, typically the same day", // [VERIFY]
    price: { kind: "confirmed_after_assessment" },
    relevantSymptoms: ["breathlessness", "chest-pain"],
    relevantConditions: [
      "heart-failure",
      "valvular-heart-disease",
      "cardiomyopathy",
    ],
    relevantSpecialists: ["sveeta-badiani", "robin-chung", "konstantinos-savvatis"],
  },
  {
    slug: "heart-monitor",
    name: "Ambulatory Heart Monitor",
    shortLabel: "Heart monitor",
    clinicalPurpose:
      "A wearable recorder that tracks your heart's rhythm over an extended period, to capture symptoms that come and go.",
    whatItMeasures:
      "Your heart rhythm continuously over a period agreed with your consultant, typically ranging from 24 hours to two weeks.", // [VERIFY]
    whatToExpect:
      "Small sensors are fitted to your chest and connected to a discreet, lightweight recorder that you wear during your normal daily activities.",
    approximateDuration: "Fitting takes around 15 minutes; wear time varies by device", // [VERIFY]
    preparation:
      "Keep a brief diary of any symptoms and their timing while wearing the monitor, if asked to do so by your consultant.",
    resultsTiming: "Analysed and discussed at a follow-up appointment", // [VERIFY]
    price: { kind: "confirmed_after_assessment" },
    relevantSymptoms: ["palpitations", "dizziness-blackouts"],
    relevantConditions: ["atrial-fibrillation"],
    relevantSpecialists: ["antonio-creta", "rui-providencia", "syed-ahsan"],
  },
  {
    slug: "exercise-stress-test",
    name: "Exercise Stress Test",
    shortLabel: "Stress test",
    clinicalPurpose:
      "Records your heart's electrical activity and blood pressure while you exercise, to help assess how your heart performs under exertion.",
    whatItMeasures:
      "Changes in your ECG trace, heart rate and blood pressure as exercise intensity gradually increases on a treadmill or exercise bike.",
    whatToExpect:
      "You will walk on a treadmill or pedal an exercise bike at increasing intensity while connected to ECG sensors and a blood pressure cuff, supervised throughout.",
    approximateDuration: "45 minutes, including preparation and recovery", // [VERIFY]
    preparation:
      "Wear comfortable clothing and supportive footwear. You may be asked to avoid heavy meals and caffeine beforehand.",
    resultsTiming: "Initial findings discussed on the day; full report to follow", // [VERIFY]
    price: { kind: "confirmed_after_assessment" },
    relevantSymptoms: ["chest-pain", "breathlessness"],
    relevantConditions: ["coronary-artery-disease"],
    relevantSpecialists: ["antonis-pavlidis", "emmanuel-androulakis"],
  },
  {
    slug: "cardiopulmonary-exercise-test",
    name: "Cardiopulmonary Exercise Test (CPET)",
    shortLabel: "CPET",
    clinicalPurpose:
      "A detailed assessment of how your heart and lungs work together during exercise, often used to investigate breathlessness or assess fitness for a procedure.",
    whatItMeasures:
      "Your breathing, oxygen use and heart's response while you exercise at gradually increasing intensity, using a breathing mask and ECG sensors.",
    whatToExpect:
      "You will exercise on a treadmill or bike wearing a lightweight breathing mask and ECG sensors, supervised by clinical staff throughout.",
    approximateDuration: "60 minutes, including preparation and recovery", // [VERIFY]
    preparation:
      "Wear comfortable exercise clothing and supportive footwear. Specific guidance will be provided when your test is booked.",
    resultsTiming: "A detailed report is prepared and reviewed with your consultant", // [VERIFY]
    price: { kind: "confirmed_after_assessment" },
    relevantSymptoms: ["breathlessness"],
    relevantConditions: ["heart-failure", "cardiomyopathy"],
    relevantSpecialists: ["sveeta-badiani"],
  },
  {
    slug: "blood-pressure-monitoring",
    name: "Ambulatory Blood Pressure Monitoring",
    shortLabel: "BP monitoring",
    clinicalPurpose:
      "Tracks your blood pressure over a full day and night to build an accurate picture beyond a single clinic reading.",
    whatItMeasures:
      "Your blood pressure at set intervals throughout your normal routine, including while you sleep.",
    whatToExpect:
      "A cuff connected to a small, portable monitor is fitted to your upper arm. It inflates automatically at intervals during the monitoring period.",
    approximateDuration: "Fitting takes around 10 minutes; worn for 24 hours", // [VERIFY]
    preparation: "Wear loose-fitting sleeves on the day of fitting.",
    resultsTiming: "Reviewed with your consultant at a follow-up appointment", // [VERIFY]
    price: { kind: "confirmed_after_assessment" },
    relevantSymptoms: ["high-blood-pressure", "dizziness-blackouts"],
    relevantConditions: ["hypertension"],
    relevantSpecialists: ["martin-thomas", "ankur-gulati", "filip-zemrak"],
  },
  {
    slug: "heart-screening",
    name: "Heart Screening",
    shortLabel: "Screening",
    clinicalPurpose:
      "A structured assessment for people without diagnosed heart problems who want a clear picture of their cardiovascular health, including those with a family history.",
    whatItMeasures:
      "A consultant-led combination of history-taking, examination and diagnostics selected to suit your personal and family risk factors.",
    whatToExpect:
      "You will meet a consultant cardiologist who will discuss your health and family history, followed by an appropriate combination of tests such as ECG and echocardiogram.",
    approximateDuration: "60 to 90 minutes, depending on tests included", // [VERIFY]
    preparation: "Bring details of any family history of heart disease if known.",
    resultsTiming: "Discussed with your consultant, with a written summary to follow", // [VERIFY]
    price: { kind: "confirmed_after_assessment" },
    relevantSymptoms: ["family-history", "high-blood-pressure"],
    relevantConditions: ["coronary-artery-disease", "hypertension"],
    relevantSpecialists: ["anantharaman-ramasamy", "emmanuel-androulakis"],
  },
];

export function getTestBySlug(slug: string): DiagnosticTest | undefined {
  return tests.find((t) => t.slug === slug);
}
