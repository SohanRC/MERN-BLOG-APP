import express from "express"
import { config } from "dotenv"
config();
import cors from "cors"
import { dbConnect } from "./config/dbConnect.js";

const app = express();
const PORT = process.env.PORT || 3000;


// middlewares
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true,
}))

// routers




// start server
dbConnect().then(() => {
    app.listen(PORT, (err) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log(`Server running at port : ${PORT}`)
    })
})
