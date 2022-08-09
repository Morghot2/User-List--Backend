const mongoose = require("mongoose");

const userRecordSchema = mongoose.Schema(
  {
    appUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "appUser",
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    age: {
      type: Number,
    },
    photo: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserRecord", userRecordSchema);
