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


export const config = {
    port : process.env.PORT,
    NODE_ENVIRONMENT : process.env.NODE_ENVIRONMENT,
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
    MONGO_URI : process.env.MONGO_URI
};