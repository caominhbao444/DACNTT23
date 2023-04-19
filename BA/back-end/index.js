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
const io = require("socket.io")(httpServer);

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

io.on("connection", (socket) => {
  console.log("a user connected. \t "+ socket.id);
  
  socket.on("disconnect", () => {
    console.log("a user disconnected!\t"+ socket.id );
  });
});