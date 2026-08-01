import jwt from "jsonwebtoken";
import {config} from "../config/config.js";
import userModel from "../models/user.model.js";

/**
 * @route /api/auth/register
 * @param {name, email, password, avatar, role} req.body
 * @param {*} res.status.json   
 * * @returns {JSON}
 */
export async function authControllerRegister(req, res){
    const { name, email, password, avatar, role } = req.body;
    let user= null;

    if(!name || !email || !password){
        return res.status(400).json({
            success: false, 
            message: "Invalid credentials",
        });
    }

    const isUserExist = await userModel.findOne({email});

    if(isUserExist){
        return res.status(400).json({
            success: false, 
            message: "User wiith this email already exists",
            data: null,
            error: "User already exists"
        });
    }

    try{
        user = await userModel.create({name, email, password, avatar, role});
        
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid creadentials",
                data: null,
                error: "User not created"
            });
        }
        
        const token = await jwt.sign({id: user._id, name: user.name}, config.JWT_SECRET_KEY, {expiresIn: "1d"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT === "production",
            sameSite: "strict",
            maxAge: 12 * 60 * 60 * 1000 // 12 hours
        });

        return res.status(201).json({
            success: true,
            message : "User Registered Successfully",
            use: {
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                isVerified: user.isVerified,
            }
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            message: "Error occurred while registering user",
            data: null,
            error: error.message,
            errorStack: error.stack
        });
    }
}

/**
 * @route /api/auth/login
 * @param {name, password} req.body
 * @param {name,email,avator,role,isVerified} res.status.json 
 * @returns {JSON}
 */
export async function authControllerLogin(req, res){
    const { email, password } = req.body;
    let user = null;

    try{
        const user = await userModel.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Please Register first",
                data: null,
                error: "User not found"
            });
        }
         
        const isMatch = await user.comparePassword(password);

        console.log(isMatch);
        
        if(!isMatch){
            return res.status(404).json({
                success: false,
                message: "Invalid credentials",
                data: null
            });
        }
        

        const token = await jwt.sign({id: user._id, name: user.name}, config.JWT_SECRET_KEY, {expiresIn: "1d"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT === "production",
            sameSite: "strict",
            maxAge: 12 * 60 * 60 * 1000 // 12 hours
        });

        return res.status(201).json({
            success: true,
            message : "User Logged in Successfully",
            user: {
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                isVerified: user.isVerified,
            }
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            message: "Error occurred while logging in user",
            data: null,
            error: error.message,
            errorStack: error.stack
        });
    }
    
}