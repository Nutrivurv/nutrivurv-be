import getUserId from "../../utils/getUserId";

const CustomRecipe = {
  async createCustomRecipe(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.createCustomRecipe(
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
  async deleteCustomRecipe(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      const recipeExists = await prisma.query.customRecipes({
        where: {
          id: args.id
        }
      });
      if (recipeExists[0].user_id == userId) {
        return prisma.mutation.deleteCustomRecipe(
          {
            where: {
              id: args.id
            }
          },
          info
        );
      } else {
        throw new Error("Can't find recipe with that ID");
      }
    } else {
      throw new Error("Can't find recipe with that ID");
    }
  },
  async updateCustomRecipe(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      const recipeExists = await prisma.query.customRecipes({
        where: {
          id: args.id
        }
      });
      if (recipeExists[0].user_id == userId) {
        return prisma.mutation.updateCustomRecipe(
          {
            where: {
              id: args.id
            },
            data: args.data
          },
          info
        );
      } else {
        throw new Error("Can't find recipe with that ID");
      }
    } else {
      throw new Error("Can't find recipe with that ID");
    }
  }
};
export default CustomRecipe;
