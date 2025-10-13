import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
import type { MsgAuth } from "../../shared/types/Message/index";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  let users: MsgAuth[] = [];

  socket.on("connection/active", (data) => console.log(data.msg));

  socket.on("user/new", (user: MsgAuth) => {
    users.push(user);
    console.log(user);
  });
  socket.on("users", (data) => {
    socket.emit("users/list", users);
  });

  socket.on("message/send", (data) => console.log(data));
});

httpServer.listen(process.env.SERVER_PORT || 3000, () =>
  console.log(`Server in ascolto sulla porta ${process.env.SERVER_PORT}`)
);
