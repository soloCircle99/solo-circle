import { UserInterFace } from "../utils/generateAccessToken";

declare global {
  namespace Express {
    interface Request {
      user?: UserInterFace;
    }
  }
}