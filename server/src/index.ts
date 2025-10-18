import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
import type { User } from "../../shared/types/User/index";
import type { Message } from "../../shared/types/Message/index";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});
let users: User[] = [];
let messages: Message<string>[] = [];
io.on("connection", (socket) => {
  console.log("Connected " + socket.id);

  socket.on("message/send", (data: Message<string>) => {
    console.log(`Messaggio arrivato ${data.text} da ${data.auth.nickname}`);
    messages.push(data);
    console.log(messages);
    io.emit("message/receive", messages);
  });

  socket.on("user/new", (user: User) => {
    console.log(`User ${user.nickname} sta entrando in chat....`);
  });

  socket.on("user/online", (user: User) => {
    console.log(`${user.nickname} è adesso online`);
    if (!users.find((u) => user.nickname === u.nickname)) {
      users.push(user);
    }
    io.emit("users/list", users);
  });

  socket.on("user/left", (user: User) => {
    console.log(`${user.nickname} è adesso uscito`);
    users = users.filter((u) => user.nickname !== u.nickname);

    io.emit("users/update", users);
  });
});

httpServer.listen(process.env.SERVER_PORT || 3000, () =>
  console.log(`Server in ascolto sulla porta ${process.env.SERVER_PORT}`)
);
