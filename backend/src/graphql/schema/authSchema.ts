import { gql } from 'apollo-server-express';

export default gql`
  type AuthData {
    userId: String!
    email: String!
    name: String!
    role: UserRole!
    token: String!
  }

  input AuthInput {
    login: String!
    password: String!
    remember: Boolean!
  }

  input RegisterInput {
    name: String!
    email: String!
    phoneNumber: String!
    password: String!
    confirm_password: String!
  }

  extend type Query {
    login(authInput: AuthInput!): AuthData!
    refresh: AuthData!
    logout: Boolean! @auth
  }

  extend type Mutation {
    register(registerInput: RegisterInput!): Boolean!
  }
`;
