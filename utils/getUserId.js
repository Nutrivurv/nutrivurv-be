import jwt from "jsonwebtoken";

const isLoggedIn = async (resolve, parent, args, ctx, info) => {
  const permit = ctx.request.request.headers.authorization;
  if (
    ctx.request.request.body.query.includes("login") ||
    ctx.request.request.body.query.includes("createUser")
  ) {
    return resolve();
  }
  if (!permit) {
    throw new Error(`Not authorised!`);
  }
  const token = permit.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  ctx.request.user_id = decoded.userId;
  return resolve();
};

export default isLoggedIn;
