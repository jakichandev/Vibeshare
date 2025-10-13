import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("clientConnection", (data) => console.log(data.msg));
  socket.on("message/send", (data) => console.log(data));
});

httpServer.listen(process.env.SERVER_PORT || 3000, () =>
  console.log(`Server in ascolto sulla porta ${process.env.SERVER_PORT}`)
);
