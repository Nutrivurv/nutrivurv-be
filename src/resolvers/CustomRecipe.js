import getUserId from "../utils/getUserId";

const CustomRecipe = {
  ingredient_list: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, { prisma, request }, info) {
      const userId = getUserId(request, false);

      return prisma.query.ingredientLists({
        where: {
          recipe_id: parent.id
        }
      });
    }
  }
};

export { CustomRecipe as default };
