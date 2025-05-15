import { internResolvers } from "./resolver.intern.js";
import { userResolvers } from "./resolvers.user.js";

export const resolvers = {
  Query: {
    ...internResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...internResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};
