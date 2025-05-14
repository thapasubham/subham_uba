import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    firstname: String
    lastname: String
    id: Float
    email: String
    intern:
  }

  type InternshipDetail{
    intern_id: number
    name: string
    mentorName: String
    startDate: 
    endDate:
    isCertified: Boolean
  }

  scalar Date{

  }

  type Query {
    users(limit: Int, offset: Int): [User]
    user(id: ID!): User
  }

  input UserInput {
    firstname: String!
    lastname: String!
    id: Float
  }

  type Mutation {
    createUser(user: UserInput!): User
    updateUser(user: UserInput!): User
    deleteUser(id: ID!): ID
  }
`;

export default typeDefs;
