const CustomIngredients = {
  myIngredients(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      const opArgs = {
        first: args.first,
        skip: args.skip,
        after: args.after,
        orderBy: args.orderBy,
        where: { user_id: request.user_id },
      };

      return prisma.query.customIngredients(opArgs, info);
    } else {
      return null;
    }
  },
  ingredient(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      return prisma.query.customIngredient({
        where: {
          id: args.id,
        },
      });
    } else {
      return null;
    }
  },
};

export default CustomIngredients;
