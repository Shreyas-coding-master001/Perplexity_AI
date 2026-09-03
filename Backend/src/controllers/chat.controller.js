import { getMessage, getTitle } from "../services/ai.service.js";
import chatModel from "../models/chats.model.js";
import messageModel from "../models/message.model.js";

/**
 * @route POST /api/chats/messages
 * @description Handles chat messages and interactions with the AI service.
 * @param {message, chatId: Optional} req 
 * @returns {Promise<void>}
 */
export async function chatController(req, res) {
    const {message, chatId} = req.body;

    let chat = chatId ? await chatModel.findOne({_id : chatId, user : req.user_id}) : null;
    
    if(!chatId){
        const title = await getTitle(message);
        chat = await chatModel.create({
            user : req.user_id,
            title : title
        });

    }

    const userMessage = await messageModel.create({
        chat : chat._id,
        user : req.user_id,
        content : message,
        role : "user"
    });
    
    const messages = await messageModel.find({chat : chat.id});

    console.log(messages)

    const aiResp = await getMessage(messages);

    const AImessage = await messageModel.create({
        chat : chat._id,
        user : req.user_id,
        content : aiResp,
        role : "assistant"
    });  

    res.status(201).json({
        success: true,
        message: "Message received successfully",
        chat,
        userMessage,
        AImessage
    });
}

/**
 * @route GET /api/chats
 * @description Fetches all chats for the authenticated user.
 * @returns {Promise<void>}
 */
export async function getChats(req, res) {
    const chats = await chatModel.find({user : req.user_id});

    if(!chats){
        return res.status(404).json({
            success: false,
            message: "No chats found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Chats fetched successfully",
        chats
    });
}

/**
 * @route GET /api/chats/messages/:chatId
 * @description Fetches all messages for a specific chat.
 * @param {chatId} req 
 * @returns {Promise<void>}
 */
export async function getMessages(req, res) {
    const {chatId} = req.params;

    const isChat = await chatModel.findOne({_id : chatId, user : req.user_id});

    if(!isChat) return res.status(404).json({
        success: false,
        message: "Chat not found"
    });

    const messages = await messageModel.find({chat : chatId});

    res.status(200).json({
        success: true,
        message: "Messages fetched successfully",
        messages
    });
}