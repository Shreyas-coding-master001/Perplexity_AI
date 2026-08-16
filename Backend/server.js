import {app} from "./src/app.js";
import {config} from "./src/config/config.js";
import connectDB from "./src/config/db.js";
import { getModel } from "./src/services/ai.service.js";
import {createServer} from "http";
import { initServer } from "./src/sockets/server.socket.js";

const port = config.port;

connectDB();

const httpServer = createServer(app);

initServer(httpServer);

httpServer.listen(port, () => console.log(`Server is Running on ${port}`));