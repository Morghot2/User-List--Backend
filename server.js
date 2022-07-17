const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");

connectDB()
const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ["http://localhost:3000", "https://users-manage-dashboard.herokuapp.com/"];

const options = {
  origin: allowedOrigins,
  credentials: true
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/appusers', require('./routes/appUserRoutes'));

app.listen(PORT, () => {
  console.log(`New Server running on port ${PORT}`);
});
