import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma-client";
import { UserInterFace } from "../utils/generateAccessToken";

interface AuthRequest extends Request {
  user?: UserInterFace;
}

export const authentication = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.auth_token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ message: "Unauthorized request!" });
      return;
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { _id: string; email: string; role: string };

    if (!decodedToken) {
      res.status(401).json({ message: "Token expired" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken._id,
      },
    });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Internal Server Error" });
  }
};
