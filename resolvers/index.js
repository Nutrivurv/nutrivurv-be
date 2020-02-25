import { extractFragmentReplacements } from "prisma-binding";
import Query from "./Query";
import Mutation from "./Mutation";
import Subscription from "./Subscription";
import User from "./User";
import CustomRecipe from "./CustomRecipe";

const resolvers = {
  Query,
  Mutation,
  // Subscription,
  User,
  CustomRecipe
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
