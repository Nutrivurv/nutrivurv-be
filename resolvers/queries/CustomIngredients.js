

const CustomIngredients = {
  myIngredients(parent, args, { prisma, request }, info) {
    

    if (request.user_id) {
      return prisma.query.customIngredients({
        where: {
          user_id: request.user_id
        }
      });
    } else {
      return null;
    }
  },
  ingredient(parent, args, { prisma, request }, info) {
    

    if (request.user_id) {
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
