import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.js";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Access token required" });
    }

    const token = authHeader.split(" ")[1];

    let decoded: any;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    req.user = {
      id: decoded.userId ?? decoded.id,
      email: decoded.email,
    };

    return next();
  } catch (err) {
    return res.status(500).json({ success: false, message: "Authentication failed" });
  }
}

export default authMiddleware;
