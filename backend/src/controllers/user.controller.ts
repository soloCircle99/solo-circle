import { Request, Response } from "express";
import { UserInterFace } from "../utils/generateAccessToken";

interface AuthRequest extends Request {
  user?: UserInterFace;
}

export const getUserData = async (req: AuthRequest, res: Response) => {
  try {
    res.json({ message: "User data fetched successfully", userData: req.user });
  } catch (error) {
    res.status(401).json({ message: "Error in fetch user controller" });
  }
};
