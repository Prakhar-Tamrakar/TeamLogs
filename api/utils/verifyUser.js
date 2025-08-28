import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_new_token;

  if (!token) {
    return next(errorHandler(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {     
      return next(errorHandler(403, "Token is not valid!"));
    }
    req.user = user;
    next();
  });
};

// import jwt from 'jsonwebtoken';
// import { errorHandler } from './error.js';

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   console.log(token);


//   if (!token) return next(errorHandler(401, 'Unauthorized'));

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     console.log(err)
//     if (err) return next(errorHandler(403, 'Forbidden'));

//     req.user = user;
//     next();
//   });
// };