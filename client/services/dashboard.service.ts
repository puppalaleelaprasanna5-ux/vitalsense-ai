import api from "../lib/api";

export async function getCurrentUser() {
  const res = await api.get("/auth/me");
  return res.data;
}

export async function getAssessmentHistory() {
  const res = await api.get("/assessments/history");
  return res.data;
}

const dashboardService = { getCurrentUser, getAssessmentHistory };
export default dashboardService;
