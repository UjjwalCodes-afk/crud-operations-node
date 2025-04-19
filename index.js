import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import route from "./routes/userRoutes.js";


const app = express();
//middleware
app.use(bodyParser.json());
dotenv.config();

const PORT  = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log(`server running on Port ${PORT}`);
    })
})

app.get('/', (req,res) => {
    res.send("Hello world");
})

app.use("/api/user", route);
