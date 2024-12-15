import { Router } from "express";
import { authentication } from "../middlewares/authentication.middleware";
import { getUserData } from "../controllers/user.controller";

const router = Router();

router.get("/getUserData", authentication, getUserData);

export default router;
