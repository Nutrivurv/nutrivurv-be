const Posts = {
  myPosts(parent, args, { prisma, request }, info) {
    return prisma.query.posts({
      where: {
        user_id: request.user_id,
      },
    });
  },
  post(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      return prisma.query.post(
        {
          where: {
            id: args.id,
          },
        },
        info
      );
    }
  },
  posts(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      const opArgs = {
        first: args.first,
        skip: args.skip,
        after: args.after,
        orderBy: args.orderBy,
      };

      if (args.query) {
        opArgs.where = {
          OR: [
            {
              name_contains: args.query,
            },
          ],
        };
      }

      return prisma.query.posts(opArgs, info);
    }
  },
};
export default Posts;
