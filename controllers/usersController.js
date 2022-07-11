const asyncHandler = require("express-async-handler");
const { v4: uuidV4 } = require("uuid");
const { default: mongoose } = require("mongoose");
const userRecord = require("../models/usersRecordsModel");

const getUsers = asyncHandler(async (req, res) => {
  const userRecords = await userRecord.find({appUser: req.appUser.id});
  res.status(200).json(userRecords);
});
const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await userRecord.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedUser);
});
const addUser = asyncHandler(async (req, res) => {
  const newUser = await userRecord.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
    appUser: req.appUser.id
  });

  res.status(200).json(newUser);
});
const deleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await userRecord.findByIdAndDelete(req.params.id);

  res.status(200).json({id: req.params.id});
});

module.exports = {
  getUsers,
  updateUser,
  addUser,
  deleteUser,
};
