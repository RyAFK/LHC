import type { Symptom } from "@/lib/content/types";

const pendingReview = (sources: Symptom["review"]["sources"]) => ({
  reviewerName: "[VERIFY] Named consultant cardiologist",
  reviewerRole: "Consultant Cardiologist, London Heart Centre",
  publishedDate: "2026-07-28",
  reviewDate: "2027-01-28",
  sources,
});

export const symptoms: Symptom[] = [
  {
    slug: "chest-pain",
    name: "Chest Pain",
    shortLabel: "Chest pain",
    overview:
      "Chest pain has many possible causes, ranging from muscular strain to conditions affecting the heart. Because heart-related chest pain can be serious, it is always worth having new or unexplained chest pain properly assessed.",
    redFlags: [
      "Sudden, severe chest pain that does not go away",
      "Chest pain with sweating, sickness or light-headedness",
      "Chest pain spreading to the arm, neck or jaw",
      "Chest pain with shortness of breath",
    ],
    howLHCCanHelp:
      "A consultant cardiologist can take a detailed history, examine you, and arrange appropriate tests to help understand what may be causing your symptoms and what, if anything, needs further investigation.",
    possibleAssessments: [
      "electrocardiogram",
      "echocardiogram",
      "exercise-stress-test",
    ],
    relevantConditions: ["coronary-artery-disease", "valvular-heart-disease"],
    relevantSpecialists: ["antonis-pavlidis", "michael-michail", "anantharaman-ramasamy"],
    faqs: [
      {
        question: "Does chest pain always mean a heart problem?",
        answer:
          "No. Chest pain can come from the muscles, joints, digestive system or lungs as well as the heart. A consultant assessment helps identify the likely cause and whether further tests are needed.",
      },
      {
        question: "What should I do if my chest pain is severe right now?",
        answer:
          "If you have sudden, severe chest pain that does not go away, or chest pain with sweating, sickness, light-headedness or shortness of breath, call 999 immediately. This website cannot provide emergency care.",
      },
    ],
    review: pendingReview([
      { label: "NHS — Chest pain", href: "https://www.nhs.uk/symptoms/chest-pain/" },
    ]),
  },
  {
    slug: "palpitations",
    name: "Palpitations",
    shortLabel: "Palpitations",
    overview:
      "Palpitations are a noticeable awareness of your own heartbeat — it may feel like it is racing, fluttering, pounding or skipping beats. They are common and often harmless, but persistent or concerning palpitations are worth assessing.",
    redFlags: [
      "Palpitations with chest pain",
      "Palpitations with fainting or severe light-headedness",
      "Palpitations with significant breathlessness",
    ],
    howLHCCanHelp:
      "Your consultant can arrange an ECG and, where appropriate, a period of ambulatory heart monitoring to try to capture what your heart rhythm is doing when symptoms occur.",
    possibleAssessments: ["electrocardiogram", "heart-monitor"],
    relevantConditions: ["atrial-fibrillation", "cardiomyopathy"],
    relevantSpecialists: ["antonio-creta", "rui-providencia", "syed-ahsan"],
    faqs: [
      {
        question: "Are palpitations usually serious?",
        answer:
          "Many palpitations are benign and linked to things like caffeine, stress or exertion. However, because some heart rhythm conditions also cause palpitations, a proper assessment is the only way to know for certain.",
      },
      {
        question: "Why might I need to wear a heart monitor?",
        answer:
          "A standard ECG only captures a short snapshot of your heart's rhythm. A wearable monitor can record over a longer period, increasing the chance of capturing an episode as it happens.",
      },
    ],
    review: pendingReview([
      { label: "NHS — Palpitations", href: "https://www.nhs.uk/conditions/palpitations/" },
    ]),
  },
  {
    slug: "breathlessness",
    name: "Breathlessness",
    shortLabel: "Breathlessness",
    overview:
      "Breathlessness that is new, worsening, or out of proportion to your normal activity can have several causes, including conditions affecting the heart or lungs. A cardiology assessment can help establish whether your heart is contributing.",
    redFlags: [
      "Sudden, severe breathlessness",
      "Breathlessness at rest or when lying flat",
      "Breathlessness with chest pain",
    ],
    howLHCCanHelp:
      "Your consultant will take a detailed history and may arrange an echocardiogram or exercise-based testing to assess how well your heart is functioning during activity.",
    possibleAssessments: [
      "echocardiogram",
      "cardiopulmonary-exercise-test",
      "exercise-stress-test",
    ],
    relevantConditions: ["heart-failure", "valvular-heart-disease", "cardiomyopathy"],
    relevantSpecialists: ["filip-zemrak", "martin-thomas", "robin-chung"],
    faqs: [
      {
        question: "How is heart-related breathlessness told apart from other causes?",
        answer:
          "Your consultant will consider your full history alongside tests such as an echocardiogram or cardiopulmonary exercise test, and will work with other specialists if a non-cardiac cause seems more likely.",
      },
    ],
    review: pendingReview([
      { label: "NHS — Shortness of breath", href: "https://www.nhs.uk/conditions/shortness-of-breath/" },
    ]),
  },
  {
    slug: "dizziness-blackouts",
    name: "Dizziness or Blackouts",
    shortLabel: "Dizziness or blackouts",
    overview:
      "Brief dizziness, light-headedness or a loss of consciousness (blackout) can be caused by a range of conditions, including some affecting the heart's rhythm or blood pressure. Assessment focuses on understanding the pattern and possible triggers.",
    redFlags: [
      "Blackout with no clear warning, especially during exertion",
      "Blackout with injury from a fall",
      "Dizziness or blackout with chest pain or palpitations",
    ],
    howLHCCanHelp:
      "A consultant will take a detailed account of the episode, examine you, and may arrange an ECG, heart monitor or blood pressure assessment depending on what seems most relevant.",
    possibleAssessments: [
      "electrocardiogram",
      "heart-monitor",
      "blood-pressure-monitoring",
    ],
    relevantConditions: ["atrial-fibrillation", "cardiomyopathy"],
    relevantSpecialists: ["nikolaos-papageorgiou", "anantharaman-ramasamy", "syed-ahsan"],
    faqs: [
      {
        question: "Should I see a cardiologist for a single fainting episode?",
        answer:
          "A single faint, especially with a clear trigger such as standing quickly, is often benign. However, blackouts during exercise, without warning, or causing injury are worth a proper cardiac assessment.",
      },
    ],
    review: pendingReview([
      { label: "NHS — Dizziness", href: "https://www.nhs.uk/conditions/dizziness/" },
    ]),
  },
  {
    slug: "high-blood-pressure",
    name: "High Blood Pressure",
    shortLabel: "High blood pressure",
    overview:
      "High blood pressure (hypertension) rarely causes noticeable symptoms but is one of the most important long-term risk factors for heart and vascular disease. Accurate measurement and assessment of overall risk are central to managing it well.",
    redFlags: [
      "Very high readings with severe headache, visual changes or confusion",
      "High blood pressure with chest pain or breathlessness",
    ],
    howLHCCanHelp:
      "Your consultant can arrange accurate, ambulatory blood pressure monitoring and assess your broader cardiovascular risk to guide any treatment decisions.",
    possibleAssessments: ["blood-pressure-monitoring", "heart-screening"],
    relevantConditions: ["hypertension"],
    relevantSpecialists: ["martin-thomas", "filip-zemrak", "ankur-gulati"],
    faqs: [
      {
        question: "Why might a single clinic reading not be enough?",
        answer:
          "Blood pressure varies naturally through the day, and some people have higher readings in clinic than at home. Ambulatory monitoring over 24 hours gives a fuller picture.",
      },
    ],
    review: pendingReview([
      { label: "NHS — High blood pressure", href: "https://www.nhs.uk/conditions/high-blood-pressure-hypertension/" },
    ]),
  },
  {
    slug: "family-history",
    name: "Family History of Heart Disease",
    shortLabel: "Family history",
    overview:
      "A family history of heart disease, particularly at a young age, can increase your own risk. Understanding your personal risk allows a consultant to recommend appropriate screening and preventive steps.",
    redFlags: [
      "A family history of sudden cardiac death at a young age",
      "New symptoms such as chest pain, breathlessness or blackouts alongside a relevant family history",
    ],
    howLHCCanHelp:
      "A consultant can review your family history in detail and recommend a tailored heart screening pathway, which may include ECG, echocardiogram or other tests depending on the specific history.",
    possibleAssessments: ["heart-screening", "electrocardiogram", "echocardiogram"],
    relevantConditions: ["cardiomyopathy", "coronary-artery-disease"],
    relevantSpecialists: ["emmanuel-androulakis", "konstantinos-savvatis"],
    faqs: [
      {
        question: "What counts as a significant family history?",
        answer:
          "Heart disease or sudden cardiac death in a close relative, especially before age 60, is generally considered significant and worth discussing with a consultant.",
      },
    ],
    review: pendingReview([
      { label: "British Heart Foundation — Family history", href: "https://www.bhf.org.uk/" },
    ]),
  },
];

export function getSymptomBySlug(slug: string): Symptom | undefined {
  return symptoms.find((s) => s.slug === slug);
}
