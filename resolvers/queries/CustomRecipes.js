const CustomRecipes = {
  myRecipes(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      return prisma.query.customRecipes({
        where: {
          user_id: request.user_id
        }
      });
    } else {
      return null;
    }
  },
  recipe(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      return prisma.query.customRecipe({
        where: {
          id: args.id
        }
      });
    } else {
      return null;
    }
  }
};
export default CustomRecipes;
