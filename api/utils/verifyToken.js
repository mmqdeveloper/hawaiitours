import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import Role from "../models/Role.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token.split([" "](1)), process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    console.log(req.user);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();

    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return next(createError(401, "You are not authenticated!"));

    jwt.verify(token.split(" ")[1], process.env.JWT, (err, user) => {
      if(err) return next(createError(403, "Token is not valid!"));
      if (!user || !user.role || !user.role.permissions || !user.role.permissions.includes(requiredPermission)) {
        return next(createError(403, "You are not authorized!"));
      }
    });

    next();
  }

} 