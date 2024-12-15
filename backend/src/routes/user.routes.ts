import { Router } from "express";
import { authentication } from "../middlewares/authentication.middleware.js";
import { getUserData } from "../controllers/user.controller.js";

const router = Router();

router.get("/getUserData", authentication, getUserData);

export default router;