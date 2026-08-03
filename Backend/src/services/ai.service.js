import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "../config/config.js";

export async function getModel(){
    try{
        const model =  new ChatGoogleGenerativeAI({
            model: "gemini-3.5-flash-lite",
            apiKey: config.GOOGLE_API_KEY
        });

        const response = await model.invoke("What is the capital of india?");

        console.log(response.content);
    }catch(error){
        console.error("Error in getModel:", error);
    }
}