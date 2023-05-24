import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/users.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userExists = await User.findByPk(decoded.userId, {
        attributes: {
          exclude: ["password"],
        },
      });
      req.user = userExists;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Invalid Token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, Token Not Found");
  }
});

export { protect };
