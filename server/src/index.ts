import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
import type { User } from "vibeshare_types/types/User";
import type { Message } from "vibeshare_types/types/Message";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let users: User[] = [];
let messages: Message<string>[] = [];
const PORT =
  process.env.ENVIRONMENT === "development"
    ? process.env.DEV_SERVER_PORT
    : process.env.PROD_SERVER_PORT;

io.on("connection", (socket) => {
  console.log("Connected " + socket.id);

  socket.on("message/send", (data: Message<string>) => {
    console.log(`Messaggio arrivato ${data.text} da ${data.auth.nickname}`);
    messages.push(data);
    console.log(messages);
    io.emit("message/receive", messages);
  });

  socket.on("messages/get", () => {
    console.log("Invio messaggi...");
    io.emit("messages/receive", messages);
  });

  socket.on("page/refresh", (user: User) => {
    console.log(`L'utente ${user.nickname} ha ricaricato la pagina`);
    socket.emit("messages/receive", messages);
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

httpServer.listen(PORT, () =>
  console.log(`Server in ascolto sulla porta ${PORT}`)
);
