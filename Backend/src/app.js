import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import {config} from "./config/config.js";

//Routes
import authRoute from "./routes/auth.route.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

config.NODE_ENVIRONMENT === "development"? app.use(morgan('dev')) : app.use(morgan('combined'));

//Routes
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
    res.status(200).json({
        "success": true,
        "Message": "Welcome to my Shreyas Perplexity backend",
        "time": new Date()
    });
});