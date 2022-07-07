const mongoose = require("mongoose");

// type UserType = {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     age: number;
//   };

const userRecordSchema = mongoose.Schema(
  {
    id: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserRecord", userRecordSchema);