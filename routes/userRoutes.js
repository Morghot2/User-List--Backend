const express = require("express");
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

//Same endpoint - short syntax

router.route('/').get(protect, getUsers).post(protect, addUser);
router.route('/:id').put(protect, updateUser).delete(protect, deleteUser);

module.exports = router;
