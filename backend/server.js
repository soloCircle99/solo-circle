import dotenv from "dotenv"
dotenv.config({ path: '.env' })
import { app } from "./src/app.js";
const port = process.env.PORT

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})