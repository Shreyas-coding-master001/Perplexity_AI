import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";
import { config } from "../config/config.js";

const GeminiModel =  new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash-lite",
    apiKey: config.GOOGLE_API_KEY
});

const MistralModel = new ChatMistralAI({
    model : "mistral-small-latest",
    apiKey : config.MISTRAL_API_KEY
});

export async function getMessage(messages){
    try{
        const response = await GeminiModel.invoke(
            messages.map(msg => {
            if(msg.role === "user"){
                return new HumanMessage(msg.content);
            }else if(msg.role === "assistant"){
                return new AIMessage(msg.content);
            }
        }));

        return response.content;
    }catch(error){
        console.error("Error in getModel:", error);
        throw error;
    }
}

export async function getTitle(message){
    try{
        const response = await MistralModel.invoke([
            new SystemMessage(`You are a helpful assistant that generates a title for the given content.
                User will provide you with first message of chat conversation, and your task is to generate a concise and relevant title for it.
                `),
            new HumanMessage(`Generate a title for this content: ${message}`)
        ]);

        return response.content;
    }catch(error){
        console.error("Error in getTitle:", error);
        throw error;
    }
}