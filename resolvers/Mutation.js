import User from "./mutations/User.js";
import Profile from "./mutations/Profile.js";
import IngredientList from "./mutations/IngredientList.js";
import DailyRecord from "./mutations/DailyRecord.js";
import CustomRecipe from "./mutations/CustomRecipe.js";
import CustomIngredient from "./mutations/CustomIngredient.js";
import FavoriteFood from "./mutations/FavoriteFoods.js";

export default {
  ...User,
  ...Profile,
  ...IngredientList,
  ...DailyRecord,
  ...CustomIngredient,
  ...CustomRecipe,
  ...FavoriteFood
};
