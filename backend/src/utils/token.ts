import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function generateToken(payload: object): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): string | jwt.JwtPayload {
  return jwt.verify(token, env.JWT_SECRET);
}
