import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user-model";

export interface AuthRequest extends Request {
  user: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(401).json({
        error: "Authentication is required",
      });
    const token = authorization;
    const decodedToken = jwt.verify(token, "express") as { _id: string };
    const { _id } = decodedToken;
    const existingUser = await User.findOne({ _id });

    if (existingUser) {
      req.user = existingUser.id;
    }
    next();
  } catch (error) {
    console.log("error in authmiddleware", error);
    throw error;
  }
};
