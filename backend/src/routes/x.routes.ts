import { Router } from "express"
import { XCallback, XLogin } from "../controllers/x.controller.js"

const router = Router()

router.route("/x/login").get(XLogin)
router.route("/x/callback").get(XCallback)

export default router