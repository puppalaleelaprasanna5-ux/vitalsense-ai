import { Router } from "express";
import { createAssessmentHandler } from "../controllers/assessment.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createAssessmentHandler);

export default router;
