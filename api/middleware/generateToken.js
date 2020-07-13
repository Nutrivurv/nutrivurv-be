const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'This should be a secret';

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7 days' });
};

module.exports = generateToken;
