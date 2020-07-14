const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (tokenHeader) {
    const [bearer, token] = tokenHeader.split(' ');

    if (bearer.toUpperCase() === 'BEARER' && token) {
      jwt.verify(
        token,
        process.env.JWT_SECRET || 'jwt-secret',
        (err, decodedToken) => {
          if (err) {
            res.status(401).json({ message: 'invalid token' });
          } else {
            req.decodedJWT = decodedToken;
            next();
          }
        }
      );
    } else {
      res.status(400).json({
        message: 'invalid scheme, or token missing.',
      });
    }
  } else {
    res.status(401).json({ message: 'no authorization header' });
  }
};
