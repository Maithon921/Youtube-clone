import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createError(401, "Access token missing"));
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Invalid token"));
    req.user = user;
    next();
  });
};
