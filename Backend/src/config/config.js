import dotenv from "dotenv";

dotenv.config();
  
if(!process.env.PORT) {
        throw new Error("PORT is not Defined in Environment Variables");
}
if(!process.env.NODE_ENVIRONMENT) {
        throw new Error("Node_ENVIRONMENT is not Defined in Environment Variables");
}
if(!process.env.JWT_SECRET_KEY) throw new Error("JWT SECRET KEY is not defined in Environment Variables")
if(!process.env.MONGO_URI) throw new Error("MONGODB URI is not defined in Environment Variables")

if(!process.env.OAUTH_CLIENT_ID) throw new Error("OAUTH_CLIENT_ID is not defined in Environment Variables");
if(!process.env.OAUTH_CLIENT_SECRET) throw new Error("OAUTH_CLIENT_SECRET is not defined in Environment Variables");
if(!process.env.OAUTH_REFREASH_TOKEN) throw new Error("OAUTH_REFREASH_TOKEN is not defined in Environment Variables");
if(!process.env.USER_EMAIL) throw new Error("USER_EMAIL is not defined in Environment Variables");
if(!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not defined in Environment Variables");
if(!process.env.MISTRAL_API_KEY) throw new Error("MISTRAL_API_KEY is not defined in Environment Variables");


export const config = {
        port : process.env.PORT,
        NODE_ENVIRONMENT : process.env.NODE_ENVIRONMENT,
        JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
        MONGO_URI : process.env.MONGO_URI,
        OAUTH_CLIENT_ID : process.env.OAUTH_CLIENT_ID,
        OAUTH_CLIENT_SECRET : process.env.OAUTH_CLIENT_SECRET,
        OAUTH_REFREASH_TOKEN : process.env.OAUTH_REFREASH_TOKEN,
        USER_EMAIL : process.env.USER_EMAIL,
        GOOGLE_API_KEY : process.env.GEMINI_API_KEY,
        MISTRAL_API_KEY : process.env.MISTRAL_API_KEY
};