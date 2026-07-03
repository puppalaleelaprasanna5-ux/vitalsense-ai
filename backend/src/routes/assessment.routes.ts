import { Router } from "express";
import { createAssessmentHandler, getHistory } from "../controllers/assessment.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createAssessmentHandler);
router.get("/history", authMiddleware, getHistory);

export default router;
