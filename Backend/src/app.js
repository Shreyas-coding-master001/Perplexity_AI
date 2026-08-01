import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

//Routes
import authRoute from "./routes/auth.route.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
    res.status(200).json({
        "success": true,
        "Message": "Welcome to my Shreyas Perplexity backend",
        "time": new Date()
    });
});