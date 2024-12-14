import { Router } from "express"
import { facebookLogin, facebookCallback } from "../controllers/facebook.controller.js"

const router = Router()

router.route("/facebook/login").get(facebookLogin)
router.route("/facebook/callback").get(facebookCallback)

export default router