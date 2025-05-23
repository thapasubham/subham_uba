import { GraphQLScalarType } from "graphql";
import { internResolvers } from "./resolver.intern.js";
import { userResolvers } from "./resolvers.user.js";
import { internDetailResolvers } from "./resolver.details.js";
import { mentor } from "./resolver.mentor.js";

export const resolvers = {
  Query: {
    ...internResolvers.Query,
    ...userResolvers.Query,
    ...internDetailResolvers.Query,
    ...mentor.Query,
  },
  Mutation: {
    ...internResolvers.Mutation,
    ...userResolvers.Mutation,
    ...internDetailResolvers.Mutation,
    ...mentor.Mutation,
  },
};

const dateType = new GraphQLScalarType({
  name: "Date",
  description: "Used for date types",

  parseValue(value: any) {
    return new Date(value);
  },

  serialize(value: any) {
    return value.getTime();
  },
});
