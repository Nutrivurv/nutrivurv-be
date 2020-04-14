const Comment = {
  post: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, { prisma, request }, info) {
      if (request.user_id) {
        return prisma.query.post({
          where: {
            id: parent.post.id,
          },
        });
      } else {
        return null;
      }
    },
  },
  user: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, { prisma, request }, info) {
      if (request.user_id) {
        return prisma.query.user({
          where: {
            id: parent.user.id,
          },
        })
      }
    },
  },
};

export { Comment as default };
