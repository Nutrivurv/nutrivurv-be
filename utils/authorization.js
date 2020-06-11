const jwt = require('jsonwebtoken');

const authorization = (resolve, parent, args, ctx) => {
  const { request } = ctx.request;
  if (request) {
    if (
      request.body.query.includes('login') ||
      request.body.query.includes('createUser')
    ) {
      return resolve();
    }
  }
  const token = request.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded || !decoded.userId) {
    throw new Error(`Not authorised!`);
  }
  ctx.request.user_id = decoded.userId;
  return resolve();
};

module.exports = authorization;
