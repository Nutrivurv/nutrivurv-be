const CustomRecipes = {
  myRecipes(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      const opArgs = {
        first: args.first,
        skip: args.skip,
        after: args.after,
        orderBy: args.orderBy,
        where: { user_id: request.user_id },
      };

      return prisma.query.customRecipes(opArgs, info);
    } else {
      return null;
    }
  },
  recipe(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      return prisma.query.customRecipe({
        where: {
          id: args.id,
        },
      });
    } else {
      return null;
    }
  },
};
export default CustomRecipes;
