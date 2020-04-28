const Comments = {
  myComments(parent, args, { prisma, request }, info) {
    return prisma.query.comments({
      where: {
        user_id: request.user_id,
      },
    });
  },
  comment(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      return prisma.query.comment(
        {
          where: {
            id: args.id,
          },
        },
        info
      );
    }
  },
  comments(parent, args, { prisma, request }, info) {
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

      return prisma.query.comments(opArgs, info);
    }
  },
};
export default Comments;
