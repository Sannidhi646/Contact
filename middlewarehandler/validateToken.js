const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization; // Corrected from req.authHeader.Authorization
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" "); // Corrected from spilt
    jwt.verify(token[1], process.env.SECERET_KEY, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }

      req.user = decoded.user;

      next();
    });
  }
  if (!token) {
    res.status(401);
    throw new Error("User is not authorized");
  }
});

module.exports = { validateToken };
