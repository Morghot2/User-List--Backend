const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/appUserModel");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newAppUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  if (newAppUser) {
    res.status(201).json({
      _id: newAppUser.id,
      firstName: newAppUser.firstName,
      lastName: newAppUser.lastName,
      email: newAppUser.email,
    //   token: generateToken(newAppUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login user" });
});

const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "User data" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
