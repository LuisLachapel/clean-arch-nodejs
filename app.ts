import dontenv from "dotenv";
import Server from "./src/models/server.model"; "./src/models/server.model"

dontenv.config();

try {
    const server = new Server();
    server.listen()
} catch (error) {
    console.error(error);
}