export interface AssessmentOption {
  id: string;
  label: string;
}

export interface AssessmentQuestion {
  id: string;
  title: string;
  description: string;
  type: "choice" | "number";
  options?: AssessmentOption[];
  placeholder?: string;
  required: boolean;
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "age",
    title: "Age",
    description: "Select your age range.",
    type: "choice",
    options: [
      { id: "age_under_30", label: "Under 30" },
      { id: "age_30_40", label: "30–40" },
      { id: "age_40_50", label: "40–50" },
      { id: "age_above_50", label: "Above 50" },
    ],
    required: true,
  },
  {
    id: "gender",
    title: "Gender",
    description: "Choose your gender.",
    type: "choice",
    options: [
      { id: "gender_male", label: "Male" },
      { id: "gender_female", label: "Female" },
      { id: "gender_prefer_not", label: "Prefer not to say" },
    ],
    required: true,
  },
  {
    id: "height",
    title: "Height",
    description: "Provide your height.",
    type: "number",
    placeholder: "Enter height in cm",
    required: true,
  },
  {
    id: "weight",
    title: "Weight",
    description: "Provide your weight.",
    type: "number",
    placeholder: "Enter weight in kg",
    required: true,
  },
  {
    id: "smoke",
    title: "Do you smoke?",
    description: "Tell us about your smoking habits.",
    type: "choice",
    options: [
      { id: "smoke_never", label: "Never" },
      { id: "smoke_occasional", label: "Occasionally" },
      { id: "smoke_frequent", label: "Frequently" },
    ],
    required: true,
  },
  {
    id: "activity",
    title: "Physical Activity",
    description: "Select your typical activity level.",
    type: "choice",
    options: [
      { id: "activity_low", label: "Low" },
      { id: "activity_moderate", label: "Moderate" },
      { id: "activity_high", label: "High" },
    ],
    required: true,
  },
  {
    id: "family_diabetes",
    title: "Family History of Diabetes",
    description: "Any family history of diabetes?",
    type: "choice",
    options: [
      { id: "family_diabetes_yes", label: "Yes" },
      { id: "family_diabetes_no", label: "No" },
    ],
    required: true,
  },
  {
    id: "family_heart",
    title: "Family History of Heart Disease",
    description: "Any family history of heart disease?",
    type: "choice",
    options: [
      { id: "family_heart_yes", label: "Yes" },
      { id: "family_heart_no", label: "No" },
    ],
    required: true,
  },
];
