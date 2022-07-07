const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const userRecord = require("../models/usersRecordsModel");

const getUsers = asyncHandler(async (req, res) => {
  const userRecords = await userRecord.find();
  res.status(200).json(userRecords);
});
const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update user ${req.params.id}` });
});
const addUser = asyncHandler(async (req, res) => {
  //   req.body === {} ? res.status(400).json({ message: "Please provide at least one kind of data" }) : res.status(200).json({ message: "Add user" });
  res.status(200).json({ message: "Add user" });
});
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete user ${req.params.id}` });
});

module.exports = {
  getUsers,
  updateUser,
  addUser,
  deleteUser,
};
