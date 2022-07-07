
const mongoose = require('mongoose')

const appUserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add your name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please add a your last name'],
      },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('appUser', appUserSchema)