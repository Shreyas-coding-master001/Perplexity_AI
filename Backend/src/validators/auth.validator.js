import { body, validationResult } from "express-validator";

export function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            message: "Validation errors",
            errors: errors
        });
    }

    next();
}

export const authValidatorRegister = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().notEmpty().isEmail().withMessage("Please provide a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("avatar").optional().isURL().withMessage("Avatar must be a valid URL"),
    body("role").optional().isIn(["user", "admin"]).withMessage("Role must be either 'user' or 'admin'"),

    validateRequest
];


export const authValidatorLogin = [
    body("email").trim().notEmpty().isEmail().withMessage("Please provide a valid email address"),
    body("password").notEmpty().withMessage("Password is required"),

    validateRequest
];