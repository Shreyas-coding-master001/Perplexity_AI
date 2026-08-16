import {io} from "socket.io-client";
import {API} from "../../../config/config.js";

export function SockectConnection(){
    const socket = io(API, {
        withCredentials : true
    });

    socket.on("connect", () => {
        console.log("User Connected To Socket.IO Server");
    });
}

