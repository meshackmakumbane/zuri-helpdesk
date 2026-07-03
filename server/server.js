import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from 'cors'

import connectDB from "./config/connectDB.js";
import { initializeWebsocket } from "./websocket/websocket.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

/* ---------- Middleware ---------- */
app.use(express.json());
app.use(cors())

/* ---------- Health Check ---------- */
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});
 
/* ---------- Initialize WebSocket ---------- */
initializeWebsocket(server); 

/* ---------- Error Middleware ---------- */
app.use(errorMiddleware)

/* ---------- Start Server ---------- */
const startServer = async () => {
    try {
        await connectDB();

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1); 
    }
};

startServer(); 