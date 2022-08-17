const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/appUserModel");
const {createBucket} = require("../GCP/cloudStorage");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

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
      token: generateToken(newAppUser._id),
    });
    
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const appUser = await User.findOne({ email });
  if (appUser && (await bcrypt.compare(password, appUser.password))) {
    res
    .cookie("access_token", generateToken(appUser._id), {
      httpOnly: true,
    })
    .status(201)
    .json({
      _id: appUser.id,
      firstName: appUser.firstName,
      lastName: appUser.lastName,
      email: appUser.email,
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
    throw new Error("Invalid email or password");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("access_token").status(200).json({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    isLogged: false
    
  });
});

const getMe = asyncHandler(async (req, res) => {
  const { _id, firstName, lastName, email } = await User.findById(
    req.appUser._id
  );
  res.status(200).json({ _id, firstName, lastName, email, isLogged: true });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
};
