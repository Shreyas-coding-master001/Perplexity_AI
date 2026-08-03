import express from "express";
import { authControllerLogin, authControllerRegister, authControllerVerifyEmail, getMeController } from "../controllers/auth.controller.js";
import { authValidatorRegister, authValidatorLogin } from "../validators/auth.validator.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const authRoute = express.Router();
/**
 * @route /api/auth/register
 * @access Public
 * @description This route is used to register a new user. It accepts user details such as name, email, password, avatar, and role in the request body. The route validates the input data using the authValidatorRegister middleware before passing it to the authControllerRegister function for processing. If the registration is successful, it returns a success response along with the user's details and a JWT token set in an HTTP-only cookie. If there are validation errors or any issues during registration, it returns an appropriate error response.
 * @body {name, email, password, avatar, role} - The user details to be registered.
 * @returns {JSON} - A JSON response indicating the success or failure of the registration process, along with relevant messages and data.
 */
authRoute.post("/register", authValidatorRegister, authControllerRegister);

/**
 * @route /api/auth/login
 * @access Public
 * @description This route is used to authenticate a user. It accepts the user's email and password in the request body. The route validates the input data using the authValidatorLogin middleware before passing it to the authControllerLogin function for processing. If the login is successful, it returns a success response along with a JWT token set in an HTTP-only cookie. If there are validation errors or any issues during authentication, it returns an appropriate error response.
 * @body {email, password} - The user's email and password for authentication.
 * @returns {JSON} - A JSON response indicating the success or failure of the login process, along with relevant messages and data.
 */
authRoute.post("/login", authValidatorLogin, authControllerLogin);


authRoute.get("/verify-email", authControllerVerifyEmail);

authRoute.get("/get-me", checkAuth, getMeController);

export default authRoute;