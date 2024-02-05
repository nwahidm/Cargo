const jwt = require("jsonwebtoken");
const Secret = process.env.JWT_SECRET;

const signToken = (payload) => {
  return jwt.sign(payload, Secret);
};

const verifyToken = (token) => {
  return jwt.verify(token, Secret);
};

module.exports = { signToken, verifyToken };