import { Server } from "socket.io";

const connections = {};
const messages = {};
const timeOnline = {};

const normalizeRoom = (path) => {
    if (!path) return "default";
    try {
        // If it's a full URL, extract the pathname
        if (path.startsWith("http://") || path.startsWith("https://")) {
            const urlObj = new URL(path);
            return urlObj.pathname.replace(/^\/+|\/+$/g, "").toLowerCase() || "default";
        }
        return path.replace(/^\/+|\/+$/g, "").toLowerCase() || "default";
    } catch {
        return String(path).trim().toLowerCase();
    }
};

const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        // Join Room
        socket.on("join-call", (rawPath) => {
            const room = normalizeRoom(rawPath);

            if (connections[room] === undefined) {
                connections[room] = [];
            }

            if (!connections[room].includes(socket.id)) {
                connections[room].push(socket.id);
            }
            timeOnline[socket.id] = new Date();

            // Notify everyone in the room
            for (let i = 0; i < connections[room].length; i++) {
                io.to(connections[room][i]).emit(
                    "user-joined",
                    socket.id,
                    connections[room]
                );
            }

            // Send previous chat messages to the new user
            if (messages[room] !== undefined) {
                for (let i = 0; i < messages[room].length; i++) {
                    io.to(socket.id).emit(
                        "chat-message",
                        messages[room][i].data,
                        messages[room][i].sender,
                        messages[room][i]["socket-id-sender"]
                    );
                }
            }
        });

        // WebRTC Signaling
        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        // Chat Messages
        socket.on("chat-message", (data, sender) => {
            const [matchingRoom, found] = Object.entries(connections).reduce(
                ([room, isFound], [roomKey, roomValue]) => {
                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }
                    return [room, isFound];
                },
                ["", false]
            );

            if (found) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = [];
                }

                messages[matchingRoom].push({
                    sender,
                    data,
                    "socket-id-sender": socket.id,
                });

                console.log(
                    `Message in [${matchingRoom}] from ${sender}: ${data}`
                );

                connections[matchingRoom].forEach((id) => {
                    io.to(id).emit(
                        "chat-message",
                        data,
                        sender,
                        socket.id
                    );
                });
            }
        });

        // Disconnect
        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);

            if (timeOnline[socket.id]) {
                const diffTime = Math.abs(
                    new Date() - timeOnline[socket.id]
                );

                console.log(
                    `${socket.id} stayed online for ${Math.floor(
                        diffTime / 1000
                    )} seconds`
                );

                delete timeOnline[socket.id];
            }

            for (const [key, value] of Object.entries(connections)) {
                if (value.includes(socket.id)) {
                    // Notify other users
                    value.forEach((id) => {
                        if (id !== socket.id) {
                            io.to(id).emit("user-left", socket.id);
                        }
                    });

                    // Remove socket
                    const index = connections[key].indexOf(socket.id);
                    if (index !== -1) {
                        connections[key].splice(index, 1);
                    }

                    // Remove empty room
                    if (connections[key].length === 0) {
                        delete connections[key];
                        delete messages[key];
                    }

                    break;
                }
            }
        });
    });

    return io;
};

export default connectToSocket;
