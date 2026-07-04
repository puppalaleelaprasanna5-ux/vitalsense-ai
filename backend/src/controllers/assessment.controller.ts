import { Request, Response } from "express";
import { assessmentSchema } from "../validators/assessment.validator.js";
import { createAssessment } from "../services/assessment.service.js";
import { getAssessmentHistory } from "../services/assessment.service.js";
import { predictHeart, predictDiabetes } from "../ml/predict.service.js";

export async function createAssessmentHandler(req: Request, res: Response) {
  try {
    const parseResult = assessmentSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: parseResult.error.issues.map((err: any) => err.message).join(", "),
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
      });
    }

    let heartPrediction;
    let diabetesPrediction;

    try {
      heartPrediction = await predictHeart(parseResult.data.answers);
      diabetesPrediction = await predictDiabetes(parseResult.data.answers);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Machine Learning prediction failed",
      });
    }

    const heartRisk = Number(heartPrediction.riskPercentage ?? 0);
    const diabetesRisk = Number(diabetesPrediction.riskPercentage ?? 0);
    const healthScore = Math.max(0, Math.min(100, 100 - (heartRisk + diabetesRisk) / 2));

    const assessment = await createAssessment(req.user.id, {
      ...parseResult.data,
      heartRisk,
      diabetesRisk,
      healthScore,
    });

    return res.status(201).json({
      success: true,
      assessment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to save assessment",
    });
  }
}

export async function getHistory(req: Request, res: Response) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Access token required" });
    }

    const assessments = await getAssessmentHistory(req.user.id);

    return res.status(200).json({
      success: true,
      count: assessments.length,
      assessments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to fetch assessment history" });
  }
}
