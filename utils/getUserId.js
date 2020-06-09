const jwt = require('jsonwebtoken');

const isLoggedIn = async (resolve, parent, args, ctx, info) => {
  const { request, connection } = ctx.request;
  const permit = () => {
    if (request) {
      if (request.headers) {
        if (request.headers.authorization) {
          return request.headers.authorization;
        } else if (
          request.headers.cookie &&
          request.headers.cookie.includes('token=')
        ) {
          return request.headers.cookie
            .split('; ')
            .filter((cv) => {
              return cv.includes('token');
            })[0]
            .split('=')[1];
        }
      }
    } else if (connection) {
      if (connection.context) {
        if (connection.context.Authorization) {
          return connection.context.Authorization;
        }
      }
    }
  };

  if (request) {
    if (
      request.body.query.includes('login') ||
      request.body.query.includes('createUser')
    ) {
      return resolve();
    }
  }

  if (!permit()) {
    throw new Error(`Not authorised!`);
  }

  const token = permit().replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded || !decoded.userId) {
    throw new Error(`Not authorised!`);
  }
  ctx.request.user_id = decoded.userId;
  return resolve();
};

module.exports = isLoggedIn;
