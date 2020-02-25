import getUserId from "../../utils/getUserId";
const CustomRecipes = {
  myRecipes(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      return prisma.query.customRecipes({
        where: {
          user_id: userId
        }
      });
    } else {
      return null;
    }
  },
  recipe(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
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
