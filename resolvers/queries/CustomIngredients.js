import getUserId from "../../utils/getUserId";

const CustomIngredients = {
  myIngredients(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      return prisma.query.customIngredients({
        where: {
          user_id: userId
        }
      });
    } else {
      return null;
    }
  },
  ingredient(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      return prisma.query.customIngredient({
        where: {
          id: args.id
        }
      });
    } else {
      return null;
    }
  }
};

export default CustomIngredients;
