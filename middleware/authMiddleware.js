const jwt = require("jsonwebtoken");
const { connection } = require("../db");
const User = require("../model/user.model");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decodedToken = jwt.verify(token, "masai");

    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
