import {config} from "./config.js";
import mongoose from "mongoose";

function connectDB(){
    mongoose.connect(config.MONGO_URI)
    .then(() => console.log("MongoDB is connected!!"))
    .catch(error => console.log(error));
}

export default connectDB;