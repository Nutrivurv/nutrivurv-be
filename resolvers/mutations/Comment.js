const Comment = {
  async createComment(parent, args, { prisma, request }, info) {
    return prisma.mutation.createComment(
      {
        data: {
          ...args.data,
          user_id: request.user_id,
          user: {
            connect: {
              id: request.user_id,
            },
          },
          post: {
            connect: {
              id: args.postId,
            },
          },
        },
      },
      info
    );
  },
  async deleteComment(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      const commentExists = await prisma.query.comments({
        where: {
          id: args.id,
        },
      });
      if (commentExists[0].user_id == request.user_id) {
        return prisma.mutation.deleteComment(
          {
            where: {
              id: args.id,
            },
          },
          info
        );
      } else {
        throw new Error("Can't find comment with that ID");
      }
    } else {
      throw new Error("Can't find comment with that ID");
    }
  },
  async updateComment(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      const commentExists = await prisma.query.comments({
        where: {
          id: args.id,
        },
      });
      if (commentExists[0].user_id == request.user_id) {
        return prisma.mutation.updateComment(
          {
            where: {
              id: args.id,
            },
            data: args.data,
          },
          info
        );
      } else {
        throw new Error("Can't find comment with that ID");
      }
    } else {
      throw new Error("Can't find comment with that ID");
    }
  },
};
export default Comment;
