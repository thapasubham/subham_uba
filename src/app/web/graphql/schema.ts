import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    firstname: String!
    lastname: String!
    id: Float
    email: String!
    phoneNumber: String!
    role: Role
  }

  type Mentor {
    firstname: String!
    lastname: String!
    id: Float
    email: String!
    phoneNumber: String!
    role: Role
  }
  scalar Date

  type Intern {
    id: Int!
    name: String!
  }

  type AuthToken {
    bearerToken: String
    refreshToken: String
  }

  type Permission {
    id: Int!
    name: String!
  }
  type Role {
    id: Int!
    name: String!
    permission: [Permission]
  }

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
    users(limit: Int!, offset: Int!): [User]
    user(id: ID!): User
    intern(id: ID!): Intern
    interns: [Intern]
    internDetail(id: ID!): InternDetails
    internDetails(limit: Int!, offset: Int!): [InternDetails]
    mentors(limit: Int!, offset: Int!): [Mentor]
    mentor(id: ID!): Mentor
    role(id: ID!): Role
    roles: [Role]
    permission(id: ID!): Permission
    permissions: [Permission]
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

  input detailInput {
    started_at: Date!
    end_at: Date!
    intern: Int!
    mentor: Float!
    user: Float!
  }

  input MentorInput {
    firstname: String!
    lastname: String!
    id: Float
    email: String!
    phoneNumber: String!
    role: String
  }

  input RoleInput {
    id: Int
    name: String!
    permission: Int
  }
  input PermissionInput {
    id: Int
    name: String!
  }
  input loginInput {
    email: String
    password: String
  }
  type Mutation {
    createUser(user: UserInput!): User
    updateUser(user: UserInput!): User
    deleteUser(id: ID!): Int
    loginUser(login: loginInput!): AuthToken

    createIntern(intern: InternInput!): Intern
    updateIntern(intern: InternInput!): Intern
    deleteIntern(id: ID!): Int

    createDetails(detail: detailInput!): String
    updateDetails(detail: detailInput!): String
    certify(id: ID!): String

    createMentor(mentor: MentorInput!): Mentor
    updateMentor(mentor: MentorInput!): Mentor
    deleteMentor(id: ID!): Int
    loginMentor(login: loginInput!): AuthToken

    createPermission(permission: PermissionInput!): Permission
    updatePermission(permission: PermissionInput!): Permission
    deletePermission(id: ID!): Int

    createRole(role: RoleInput!): Role
    updateRole(role: RoleInput!): Role
    deleteRole(id: ID!): Int
  }
`;

export default typeDefs;
