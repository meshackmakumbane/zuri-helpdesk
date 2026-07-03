import { WebSocketServer, WebSocket } from "ws";
import crypto from "crypto";

const clients = new Map();
let wss = null;

export const initializeWebsocket = (server) => {
    wss = new WebSocketServer({
        server,
    });

    wss.on("connection", (socket) => {
        const clientId = crypto.randomUUID();

        clients.set(clientId, socket);

        console.log(`Client connected: ${clientId}`);

        socket.send(
            JSON.stringify({
                type: "connected",
                clientId,
                message: "Connected successfully.",
            })
        );

        socket.on("message", (rawData) => {
            try {
                const message = JSON.parse(rawData.toString());

                console.log(message);

                switch (message.type) {
                    case "chat":
                        broadcast("chat", {
                            clientId,
                            message: message.message,
                            timestamp: new Date().toISOString(),
                        });
                        break;

                    case "typing":
                        broadcast("typing", {
                            clientId,
                        });
                        break;

                    default:
                        socket.send(
                            JSON.stringify({
                                type: "error",
                                message: "Unknown message type.",
                            })
                        );
                }
            } catch (err) {
                socket.send(
                    JSON.stringify({
                        type: "error",
                        message: "Invalid JSON payload.",
                    })
                );
            }
        });

        socket.on("close", () => {
            clients.delete(clientId);
            console.log(`Client disconnected: ${clientId}`);
        });

        socket.on("error", (err) => {
            console.error(`Socket error (${clientId}):`, err.message);
            clients.delete(clientId);
        });
    });

    console.log("WebSocket server started.");
};

export const broadcast = (type, data) => {
    if (!wss) return;

    const payload = JSON.stringify({
        type,
        ...data,
    });

    clients.forEach((socket) => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(payload);
        }
    });
};