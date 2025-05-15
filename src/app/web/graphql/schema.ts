import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    firstname: String!
    lastname: String!
    id: Float
    email: String!
    phoneNumber: String!
    intern: Intern!
  }

  type Intern {
    id: Int!
    name: String!
  }

  type Query {
    users(limit: Int, offset: Int): [User]
    user(id: ID!): User
    intern(id: ID!): Intern
    interns: [Intern]
  }

  input UserInput {
    firstname: String!
    lastname: String!
    id: Float
    email: String!
    phoneNumber: String!
  }

  input InternInput {
    id: Int
    name: String!
  }

  type Mutation {
    createUser(user: UserInput!): User
    updateUser(user: UserInput!): User
    deleteUser(id: ID!): Int

    createIntern(intern: InternInput!): Intern
    updateIntern(intern: InternInput!): Intern
    deleteIntern(id: ID!): Int
  }
`;

export default typeDefs;
