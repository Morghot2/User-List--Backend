const asyncHandler = require("express-async-handler");
// var urlToImage = require("url-to-image");
var fs = require("fs");
const { default: mongoose } = require("mongoose");
const userRecord = require("../models/usersRecordsModel");
const User = require("../models/appUserModel");
const imageToBase64 = require("image-to-base64");

// const base64_encode = (file) => {
//   const bitmap = fs.readFileSync(file);
//   return new Buffer.from(bitmap).toString("base64");
// };

const getUsers = asyncHandler(async (req, res) => {
  const userRecords = await userRecord.find({ appUser: req.appUser.id });
  const convertedImageRecords = userRecords.map((record) => {
    imageToBase64(record.photo) // Image URL
      .then((response) => {
        console.log(`${response}++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`); // "iVBORw0KGgoAAAANSwCAIA..."
      })
      .catch((error) => {
        console.log(error); // Logs an error if there was one
      });
    // const image = urlToImage(record.photo, `${record._id}.png`);
    // const convertedImage = base64_encode(`${record._id}.png`);
  });

  res.status(200).json(userRecords);
});

const addUser = asyncHandler(async (req, res) => {
  const newUser = await userRecord.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
    appUser: req.appUser.id,
    photo: "test",
  });
  res.status(200).json(newUser);
  req.app
    .get("io")
    .sockets.emit("Records", { message: "Add", recordData: newUser });
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

  req.app.get("io").sockets.emit("Records", {
    message: "Update",
    recordData: {
      recordToChangeId: req.params.id,
      userValues: { ...req.body, _id: req.params.id },
    },
  });
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
  req.app
    .get("io")
    .sockets.emit("Records", { message: "Delete", recordData: req.params.id });
});

module.exports = {
  getUsers,
  updateUser,
  addUser,
  deleteUser,
};
