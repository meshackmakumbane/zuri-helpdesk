import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import connectDB from "./config/connectDB.js";
import { initializeWebsocket } from "./websocket/websocket.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

import businessRoutes from './routes/businessRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

/* ---------- Trust Proxy ---------- */
app.set("trust proxy", 1);

/* ---------- Middleware ---------- */
app.use(express.json());

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

app.use(cookieParser());

/* ---------- Health Check ---------- */
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});

/* ---------- API Routes ---------- */
app.use("/api/business", businessRoutes);
app.use('/api/users', userRoutes)
// app.use("/api/tickets", ticketRoutes);

/* ---------- 404 ---------- */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
    });
});

/* ---------- Error Middleware ---------- */
app.use(errorMiddleware);

/* ---------- Start Server ---------- */
const startServer = async () => {
    try {
        await connectDB(); 

        initializeWebsocket(server); 

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();