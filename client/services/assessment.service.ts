import api from "../lib/api";

export interface AssessmentPayload {
  healthScore: number;
  heartRisk: number;
  diabetesRisk: number;
  answers: Record<string, any>;
}

export async function createAssessment(data: AssessmentPayload) {
  const res = await api.post("/assessments", data);
  return res.data;
}

const assessmentService = { createAssessment };
export default assessmentService;
