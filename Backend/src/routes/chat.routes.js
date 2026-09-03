import {Router} from "express";
import {checkAuth} from "../middleware/auth.middleware.js";
import { chatController, getChats, getMessages } from "../controllers/chat.controller.js";

const chatsRoute = Router();

chatsRoute.post("/messages", checkAuth, chatController);

chatsRoute.get("/", checkAuth, getChats);

chatsRoute.get("/messages/:chatId", checkAuth, getMessages);

export default chatsRoute;