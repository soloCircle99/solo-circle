import { Request, Response } from "express";
import { UserInterFace } from "../utils/generateAccessToken";

const mapUserData = (user: UserInterFace) => ({
  id: user.id,
  nickName: user.nickName,
  fullName: user.fullName,
  email: user.email,
  avatar: user.avatar,
  gender: user.gender,
  birthday: user.birthday,
  phoneNumber: user.phoneNumber,
  verified: user.verified,
  role: user.role,
  provider: user.provider,
});


export const getUserData = async (req: Request, res: Response) => {
  try {
    const user = mapUserData(req.user!);
    res.json({ message: "User data fetched successfully", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};