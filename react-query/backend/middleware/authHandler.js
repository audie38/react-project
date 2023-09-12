const asyncHandler = require("express-async-handler");
const { verifyToken } = require("../utils/token");

const protect = asyncHandler(async (req, res, next) => {
  let token = req?.cookies?.jwt;
  if (!token) {
    return res.status(401).json({ message: "UnAuthorized" });
  }

  const validationResult = await verifyToken(token);
  if (!validationResult.isValidToken) {
    return res.status(401).json({ message: "UnAuthorized" });
  }

  req.user = validationResult.existingUser;
  next();
});

module.exports = protect;
