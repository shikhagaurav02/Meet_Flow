import "dotenv/config";

import dns from "node:dns";

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import connectToSocket from "./Controller/socketManager.js";

import userRoutes from "./Routes/userRoutes.js";

const app = express();

app.use(cors());

const httpServer = createServer(app);

const io = connectToSocket(httpServer);


app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/users", userRoutes);

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


const start = async () => {


    try {
        const connectionDb = await mongoose.connect(process.env.MONGO_URL);

        console.log(
            `MongoDB connected to Host: ${connectionDb.connection.host}`
        );

        httpServer.listen(app.get("port"), () => {
            console.log(`Listening on Port ${app.get("port")}`);
        });

    } catch (error) {
        console.log("MongoDB Error:", error.message);
    }
};


start();
