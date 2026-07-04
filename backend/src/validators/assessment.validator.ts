import { z } from "zod";

export const assessmentSchema = z.object({
  answers: z.record(z.string(), z.any()),
});
