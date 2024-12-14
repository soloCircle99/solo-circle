import express from "express"
import path from "path";
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(cookieParser())

import googleRouters from "./routes/google.routes.js"
import facebookRoutes from "./routes/facebook.routes.js"

app.use("/api/auth", googleRouters, facebookRoutes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

export { app }