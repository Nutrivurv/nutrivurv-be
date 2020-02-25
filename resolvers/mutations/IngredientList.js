import getUserId from "../../utils/getUserId";

const IngredientList = {
  async createIngredientList(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.createIngredientList(
      {
        data: {
          ...args.data,
          user_id: userId,
          user: {
            connect: {
              id: userId
            }
          },
          recipe: {
            connect: {
              id: args.data.recipe_id
            }
          }
        }
      },
      info
    );
  },
  async updateIngredientList(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      const ingredientListExists = await prisma.query.ingredientList({
        where: {
          id: args.id
        }
      });
      if (ingredientListExists.user_id == userId) {
        return prisma.mutation.updateIngredientList(
          {
            where: {
              id: args.id
            },
            data: args.data
          },
          info
        );
      } else {
        throw new Error("Can't find IngredientList with that ID");
      }
    } else {
      throw new Error("Can't find IngredientList with that ID");
    }
  },
  async deleteIngredientList(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      const ingredientListExist = await prisma.query.ingredientList({
        where: {
          id: args.id
        }
      });
      if (ingredientListExist[0].user_id == userId) {
        return prisma.mutation.deleteIngredientList(
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
  }
};

export default IngredientList