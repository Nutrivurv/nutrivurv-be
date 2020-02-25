import getUserId from "../../utils/getUserId";

const CustomIngredient = {
  async createCustomIngredient(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.createCustomIngredient(
      {
        data: {
          ...args.data,
          user_id: userId,
          user: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
  },
  async deleteCustomIngredient(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      const ingredientExists = await prisma.query.customIngredients({
        where: {
          id: args.id
        }
      });
      if (ingredientExists[0].user_id == userId) {
        return prisma.mutation.deleteCustomIngredient(
          {
            where: {
              id: args.id
            }
          },
          info
        );
      } else {
        throw new Error("Can't find Ingredient with that ID");
      }
    } else {
      throw new Error("Can't find Ingredient with that ID");
    }
  },
  async updateCustomIngredient(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      const ingredientExists = await prisma.query.customIngredients({
        where: {
          id: args.id
        }
      });
      if (ingredientExists[0].user_id == userId) {
        return prisma.mutation.updateCustomIngredient(
          {
            where: {
              id: args.id
            },
            data: args.data
          },
          info
        );
      } else {
        throw new Error("Can't find Ingredient with that ID");
      }
    } else {
      throw new Error("Can't find Ingredient with that ID");
    }
  }
};

export default CustomIngredient;
