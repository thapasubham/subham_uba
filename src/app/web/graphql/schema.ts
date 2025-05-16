import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    firstname: String!
    lastname: String!
    id: Float
    email: String!
    phoneNumber: String!
  }

  type Mentor {
    firstname: String!
    lastname: String!
    id: Float
    email: String!
    phoneNumber: String!
    role: String
  }

  type Intern {
    id: Int!
    name: String!
  }
  scalar Date

  type InternDetails {
    id: Int!
    started_at: Date
    end_at: Date
    isCertified: Boolean
    intern: Intern
    mentor: Mentor
    user: User
  }
  type Query {
    users(limit: Int, offset: Int): [User]
    user(id: ID!): User
    intern(id: ID!): Intern
    interns: [Intern]
    internDetail(id: ID!): InternDetails
    internDetails: [InternDetails]
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
