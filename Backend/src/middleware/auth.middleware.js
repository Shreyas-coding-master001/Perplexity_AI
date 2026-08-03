import jwt from "jsonwebtoken";
import {config} from "../config/config.js";

export function checkAuth(req, res, next){
    const token = req.cookies.token;

    // console.log("Token from cookie:", token); // Debugging line to check the token value

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized access",
            data: null,
            error: "No token provided"
        });
    }

    const user_id = jwt.verify(token, config.JWT_SECRET_KEY).id;

    req.user_id = user_id;
    
    next();
}