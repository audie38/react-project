const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

const verifyToken = async (authToken) => {
  const existingData = {
    existingUser: {},
    isValidToken: true,
  };
  const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
  const userExists = await User.findByPk(decoded.userId, {
    attributes: {
      exclude: ["password"],
    },
  });
  if (!userExists) {
    existingData.isValidToken = false;
  }

  existingData.existingUser = userExists;
  return existingData;
};

module.exports = {
  generateToken,
  verifyToken,
};
