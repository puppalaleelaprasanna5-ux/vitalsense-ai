import type { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma.js";

export async function createAssessment(userId: string, assessment: {
  healthScore: number;
  heartRisk: number;
  diabetesRisk: number;
  answers: Prisma.InputJsonValue;
}) {
  return prisma.assessment.create({
    data: {
      userId,
      healthScore: assessment.healthScore,
      heartRisk: assessment.heartRisk,
      diabetesRisk: assessment.diabetesRisk,
      answers: assessment.answers,
    },
  });
}
