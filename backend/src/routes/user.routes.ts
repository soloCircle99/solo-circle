import { Router } from "express"
import { googleCallback, googleLogin } from "../controllers/user.controller.js"

const router = Router()

router.route("/google/login").get(googleLogin)
router.route("/google/callback").get(googleCallback)

export default router