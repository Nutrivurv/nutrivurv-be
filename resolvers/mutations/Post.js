const Post = {
  async createPost(parent, args, { prisma, request }, info) {
    return prisma.mutation.createPost(
      {
        data: {
          ...args.data,
          user_id: request.user_id,
          user: {
            connect: {
              id: request.user_id,
            },
          },
        },
      },
      info
    );
  },
  async deletePost(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      const postExists = await prisma.query.posts({
        where: {
          id: args.id,
        },
      });
      if (postExists[0].user_id == request.user_id) {
        return prisma.mutation.deletePost(
          {
            where: {
              id: args.id,
            },
          },
          info
        );
      } else {
        throw new Error("Can't find post with that ID");
      }
    } else {
      throw new Error("Can't find post with that ID");
    }
  },
  async updatePost(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      const postExists = await prisma.query.posts({
        where: {
          id: args.id,
        },
      });
      if (postExists[0].user_id == request.user_id) {
        return prisma.mutation.updatePost(
          {
            where: {
              id: args.id,
            },
            data: args.data,
          },
          info
        );
      } else {
        throw new Error("Can't find post with that ID");
      }
    } else {
      throw new Error("Can't find post with that ID");
    }
  },
};
export default Post;
