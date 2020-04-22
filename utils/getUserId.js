const jwt = require("jsonwebtoken");

const isLoggedIn = async (resolve, parent, args, ctx, info) => {
  if (
    ctx.request.request.headers.cookie &&
    ctx.request.request.headers.cookie.includes("token=")
  ) {
    const cookiePermit = ctx.request.request.headers.cookie
      .split("; ")
      .filter((cv) => {
        return cv.includes("token");
      })[0]
      .split("=")[1];
    const cookieToken = cookiePermit.replace("Bearer ", "");
    const decodedCookie = jwt.verify(cookieToken, process.env.JWT_SECRET);
    ctx.request.user_id = decodedCookie.userId;
    return resolve();
  }

  const permit = ctx.request.request
    ? ctx.request.request.headers.authorization
    : ctx.request.connection.context.Authorization;
  if (ctx.request.request) {
    if (
      ctx.request.request.body.query.includes("login") ||
      ctx.request.request.body.query.includes("createUser")
    ) {
      return resolve();
    }
  }
  if (!permit) {
    throw new Error(`Not authorised!`);
  }
  const token = permit.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  ctx.request.user_id = decoded.userId;
  return resolve();
};

module.exports = isLoggedIn;
