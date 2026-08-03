import jwt from "jsonwebtoken";
import {config} from "../config/config.js";
import userModel from "../models/user.model.js";
import {sendEmail} from "../services/mail.service.js";

/**
 * @route /api/auth/register
 * @param {name, email, password, avatar, role} req.body   
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

    const isUserExist = await userModel.findOne({ email });

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
        
        const token = await jwt.sign({id: user._id}, config.JWT_SECRET_KEY, {expiresIn: "1d"});

        sendEmail({
            to: user.email,
            subject: "Register Notification",
            html: `
            <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #f8f9fa; border: 1px solid #e5e5e5; border-radius: 10px;">

                <h1 style="color: #333333; font-size: 28px; margin-bottom: 20px; text-align: center;">
                    Hello ${user.name},
                </h1>

                <h3 style="color: #555555; font-size: 18px; font-weight: normal; margin-bottom: 30px; text-align: center;">
                    Please click the button below to verify your email address.
                </h3>

                <div style="text-align: center; margin: 35px 0;">
                    <a href="http://localhost:3000/api/auth/verify-email?token=${token}"
                    target="_blank"
                    style="display: inline-block; text-decoration: none; background-color: #007bff; color: #ffffff; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: bold;">
                        Verify Email
                    </a>
                </div>

                <p style="color: #666666; font-size: 15px; line-height: 1.6; margin-bottom: 15px;">
                    If you didn't create this account, you can safely ignore this email. If you believe someone is trying to access your account, please reset your password immediately.
                </p>

                <hr style="border: none; border-top: 1px solid #dddddd; margin: 30px 0;">

                <p style="color: #888888; font-size: 14px; text-align: center; margin-bottom: 5px;">
                    Thank you for choosing us!
                </p>

                <p style="color: #aaaaaa; font-size: 12px; text-align: center; margin: 0;">
                    This is an automated email. Please do not reply.
                </p>

            </div>
            `,
        })


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
 * @description This function handles user login. It checks if the user exists, verifies the email, compares the provided password with the stored hashed password, and generates a JWT token for authenticated sessions. If any of these checks fail, it returns an appropriate error message.
 * @param {name, password} req.body
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
        
        if(!user.isVerified){
            return res.status(400).json({
                success: false,
                message: "Please verify your email first",
                data: null,
                error: "Email not verified"
            });
        }

        const isMatch = await user.comparePassword(password);

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

/**
 * @route /api/auth/get-me
 * @description This function retrieves the authenticated user's details. It checks if the user is authenticated by verifying the JWT token and then fetches the user's information from the database. If the user is not authenticated or if there are any issues retrieving the user details, it returns an appropriate error message.
 * @returns {JSON}
 */
export async function getMeController(req, res){
    const userId = req.user_id;
    
    const user = await userModel.findById(userId);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found",
            data: null,
            error: "User not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "User details fetched successfully",
        user: user 
    });
}

/**
 * @route /api/auth/verify-email?token=token
 * @description This function verifies the user's email using the token sent to their email during registration. If the token is valid, it updates the user's isVerified status to true and sends a success message. If the token is invalid or expired, it returns an error message.
 * @param {token} req.params
 * @returns {html}
 */
export async function authControllerVerifyEmail(req, res){
    const { token } = req.query;

    if(!token){
        return res.status(400).json({
            success: false,
            message: "Token is required"
        });
    }

    const user_id = await jwt.verify(token, config.JWT_SECRET_KEY);

    const user = await userModel.findByIdAndUpdate(user_id.id, {isVerified: true}, {new: true});

    if(!user.isVerified){
        return res.status(400).json({
            success: false,
            message: "Email verification failed"
        });
    }

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENVIRONMENT === "production",
        sameSite: "strict",
        maxAge: 12 * 60 * 60 * 1000 // 12 hours
    });

    res.send(`
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #f8f9fa; border: 1px solid #e5e5e5; border-radius: 10px;">
            <h1 style="color: #333333; font-size: 28px; margin-bottom: 20px; text-align: center;">
                Email Verified Successfully!
            </h1>
            <p style="color: #666666; font-size: 15px; line-height: 1.6;">
                Hello ${user.name},
            </p>
            <p style="color: #666666; font-size: 15px; line-height: 1.6;">
                Your email has been verified successfully. You can now access all the features of our platform.
            </p>
        </div>
    `);     
}