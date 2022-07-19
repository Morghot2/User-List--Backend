const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const appUser = require("../models/appUserModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.cookies.access_token) {
    try {
      token = req.cookies.access_token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.appUser = await appUser.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No token");
  }
});
module.exports = { protect };
