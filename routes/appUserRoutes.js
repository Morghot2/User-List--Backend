const express = require("express");
const {registerUser, loginUser, getMe, logoutUser} = require("../controllers/appUsersController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/me", protect, getMe)

module.exports = router;