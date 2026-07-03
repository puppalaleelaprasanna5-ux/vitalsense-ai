import { z } from "zod";

export const assessmentSchema = z.object({
  healthScore: z.number().int().nonnegative(),
  heartRisk: z.number().nonnegative(),
  diabetesRisk: z.number().nonnegative(),
  answers: z.record(z.string(), z.any()),
});
