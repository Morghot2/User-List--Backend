const express = require("express");
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
