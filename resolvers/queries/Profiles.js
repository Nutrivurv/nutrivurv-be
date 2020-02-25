import getUserId from "../../utils/getUserId";

const Profiles = {
  myProfile(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.profile({
      where: {
        user_id: userId
      }
    });
  },
  profiles(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      const opArgs = {
        first: args.first,
        skip: args.skip,
        after: args.after,
        orderBy: args.orderBy
      };

      if (args.query) {
        opArgs.where = {
          OR: [
            {
              name_contains: args.query
            }
          ]
        };
      }

      return prisma.query.profiles(opArgs, info);
    }
  }
};
export default Profiles;
