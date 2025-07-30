const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.Jwt_USER_SECRET;

const createToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

module.exports = { createToken, verifyToken };
