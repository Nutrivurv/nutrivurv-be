const Profiles = {
  myProfile(parent, args, { prisma, request }, info) {
    return prisma.query.profile({
      where: {
        user_id: request.user_id,
      },
    });
  },
  profiles(parent, args, { prisma, request }, info) {
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

      return prisma.query.profiles(opArgs, info);
    }
  },
};
export default Profiles;
