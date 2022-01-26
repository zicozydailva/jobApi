const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(402).json("Invalid Authentication ");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // ATTACH USER TO JOB ROUTE
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = authUser;
