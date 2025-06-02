import { GraphQLScalarType } from "graphql";
import { internResolvers } from "./resolver.intern.js";
import { userResolvers } from "./resolvers.user.js";
import { internDetailResolvers } from "./resolver.details.js";
import { mentor } from "./resolver.mentor.js";
import { roleResolvers } from "./resolver.role.js";
import { permissionResolvers } from "./resolver.permission.js";

export const resolvers = {
  Query: {
    ...internResolvers.Query,
    ...userResolvers.Query,
    ...internDetailResolvers.Query,
    ...mentor.Query,
    ...roleResolvers.Query,
    ...permissionResolvers.Query,
  },
  Mutation: {
    ...internResolvers.Mutation,
    ...userResolvers.Mutation,
    ...internDetailResolvers.Mutation,
    ...mentor.Mutation,
    ...permissionResolvers.Mutation,
    ...roleResolvers.Mutation,
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
