const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const socket = require("socket.io");

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:3000",
  "https://celadon-empanada-d6316b.netlify.app",
];

const options = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/appusers", require("./routes/appUserRoutes"));

const server = app.listen(PORT, () => {
  console.log(`New Server running on port ${PORT}`);
});

const io = socket(server, {
  // path: "/api/users",
  cors: {
    origin: allowedOrigins,
  },
});
io.on("connection", (socket) => {
  console.log("New client connected");
});
