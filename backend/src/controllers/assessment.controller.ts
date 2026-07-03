import { Request, Response } from "express";
import { assessmentSchema } from "../validators/assessment.validator.js";
import { createAssessment } from "../services/assessment.service.js";
import { getAssessmentHistory } from "../services/assessment.service.js";

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

    const assessment = await createAssessment(req.user.id, parseResult.data);

    return res.status(201).json({
      success: true,
      message: "Assessment saved successfully",
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
