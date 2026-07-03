import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { createUser, findUserByEmail } from "../services/auth.service";
import { generateToken } from "../utils/token";

export async function register(req: Request, res: Response) {
  try {
    const parseResult = registerSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: parseResult.error.errors.map((err) => err.message).join(", "),
      });
    }

    const { name, email, password } = parseResult.data;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const user = await createUser(name, email, password);
    const token = generateToken({ userId: user.id, email: user.email });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create account",
    });
  }
}
