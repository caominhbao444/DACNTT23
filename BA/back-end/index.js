const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 5000;

const app = express();
connectDb();
// const io = require("socket.io")(httpServer);

// io.on("connection", (socket) => {
//   console.log("nguoi ket noi: \t" + socket.id);

//   socket.on("disconnect", () => {
//     console.log("nguoi ngat ket noi \t" + socket.id);
//   });
// });

// app.get("/", (req, res) => {
//   res.render("trangchu");
// });


app.use(cors(corsOptions));

app.use(express.json());




app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/accounts", require("./routes/accountRoutes"));

app.use(errorHandler);

const httpServer = http.Server(app);
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
