const express = require("express");
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

//Same endpoint - short syntax

router.route('/').get(getUsers).post(addUser);
router.route('/:id').put(updateUser).delete(deleteUser);

module.exports = router;
