const asyncHandler = require("express-async-handler");
const { v4: uuidV4 } = require("uuid");
const { default: mongoose } = require("mongoose");
const userRecord = require("../models/usersRecordsModel");
const User = require("../models/appUserModel");

const getUsers = asyncHandler(async (req, res) => {
  const userRecords = await userRecord.find({ appUser: req.appUser.id });
  res.status(200).json(userRecords);
});

const addUser = asyncHandler(async (req, res) => {
  const newUser = await userRecord.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
    appUser: req.appUser.id,
  });
  res.status(200).json(newUser);
});

const updateUser = asyncHandler(async (req, res) => {
  const userRecordToChange = await userRecord.findById(req.params.id);
  if (!userRecordToChange) {
    res.status(400);
    throw new Error("User record not found");
  }

  const currentAppUser = await User.findById(req.appUser.id);
  if (!currentAppUser) {
    res.status(401);
    throw new Error("User not found");
  }
  if (userRecordToChange.appUser.toString() !== currentAppUser.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedUserRecord = await userRecord.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedUserRecord);
});

const deleteUser = asyncHandler(async (req, res) => {
  const deleteUserRecord = await userRecord.findById(req.params.id);

  if (!deleteUserRecord) {
    res.status(400);
    throw new Error("User record not found");
  }

  const currentAppUser = await User.findById(req.appUser.id);
  if (!currentAppUser) {
    res.status(401);
    throw new Error("User not found");
  }

  if (deleteUserRecord.appUser.toString() !== currentAppUser.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await deleteUserRecord.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getUsers,
  updateUser,
  addUser,
  deleteUser,
};
