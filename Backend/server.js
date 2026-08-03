import {app} from "./src/app.js";
import {config} from "./src/config/config.js";
import connectDB from "./src/config/db.js";
import { getModel } from "./src/services/ai.service.js";

const port = config.port;

connectDB();

app.listen(port, () => console.log(`Server is Running on ${port}`));