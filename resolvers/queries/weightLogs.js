const WeightLogs = {
  myWeightLogs(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      const opArgs = {
        first: args.first,
        skip: args.skip,
        after: args.after,
        orderBy: args.orderBy,
        where: { user_id: request.user_id },
      };

      return prisma.query.weightLogs(opArgs, info);
    } else {
      return null;
    }
  },
  async myWeightLogCount(parent, args, { prisma, request }, info) {
    const count = await prisma.query.weightLogs({
      where: {
        user_id: request.user_id,
      },
    });
    if (count && count.length > 0) {
      return count.length;
    } else {
      return 0;
    }
  },
  weightLog(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      return prisma.query.weightLog({
        where: {
          id: args.id,
        },
      });
    } else {
      return null;
    }
  },
};

export default WeightLogs;
