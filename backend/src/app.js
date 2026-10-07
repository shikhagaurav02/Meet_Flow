import "dotenv/config";

import dns from "node:dns";

try {
    dns.setServers([
        "8.8.8.8",
        "1.1.1.1"
    ]);
} catch (e) {
    // DNS server override is optional
}

import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import connectToSocket from "./Controller/socketManager.js";

import userRoutes from "./Routes/userRoutes.js";

const app = express();

app.set("port", process.env.PORT || 8000);

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Health check endpoints for Render and status monitoring
app.get("/", (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "MeetFlow Backend API",
        version: "1.0.0"
    });
});

app.get("/health", (req, res) => {
    const dbState = mongoose.connection.readyState;
    const states = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
    res.status(200).json({
        status: "healthy",
        database: states[dbState] || "unknown",
        uptime: process.uptime()
    });
});

app.use("/api/v1/users", userRoutes);

const httpServer = createServer(app);
connectToSocket(httpServer);

const start = async () => {
    const port = app.get("port");

    httpServer.listen(port, () => {
        console.log(`Server listening on Port ${port}`);
    });

    if (process.env.MONGO_URL) {
        try {
            const connectionDb = await mongoose.connect(process.env.MONGO_URL);
            console.log(
                `MongoDB connected to Host: ${connectionDb.connection.host}`
            );
        } catch (error) {
            console.error("MongoDB Connection Error:", error.message);
        }
    } else {
        console.warn("WARNING: MONGO_URL is not set in environment variables.");
    }
};

start();
