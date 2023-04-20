const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const app = express();

const httpServer = http.Server(app);

connectDb();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/accounts", require("./routes/accountRoutes"));
app.use("/api/conversations", require("./routes/conversationRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentsRoutes"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//socket code under here
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];

const addUser = (userId, username, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, username, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected. \t " + socket.id);

  //take userId, username, and socketId from user
  socket.on("addUser", ({ userId, username }) => {
    addUser(userId, username, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("join", ({ username, room }) => {
    socket.join(room);
    socket.emit("message", {
      text: `${username}, welcome to room ${room}.`,
    });
  });
  
  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      username: getUser(senderId).username,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
