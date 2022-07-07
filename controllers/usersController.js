const asyncHandler = require("express-async-handler");
const { v4: uuidV4 } = require ('uuid')
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
  const newUser = await userRecord.create({
    id: uuidV4(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
  });

  res.status(200).json(newUser);
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
