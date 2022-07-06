// import express from "express";
const express = require("express");
// import "dotenv/config";
const dotenv = require("dotenv");
// import cors from "cors";
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ["http://localhost:3000"];

const options = {
  origin: allowedOrigins,
};

app.use(cors(options));


app.use('/api/users', require('./routes/userRoutes'));

app.listen(PORT, () => {
  console.log(`New Server running on port ${PORT}`);
});
