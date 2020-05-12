import { gql } from 'apollo-server-express';

export default gql`
  type User {
    _id: ID!
    createdAt: String! @auth(roles: [ADMIN])
    updatedAt: String! @auth(roles: [ADMIN])
    name: String!
    email: String!
    phoneNumber: String!
    password: String! @auth(roles: [ADMIN])
    status: UserStatus! @auth(roles: [ADMIN])
    role: UserRole!
  }

  enum UserStatus {
    NEW
    DELETED
    CONFIRMED
  }

  enum UserRole {
    CLIENT
    ADMIN
  }

  input CreateUserInput {
    name: String!
    email: String!
    phoneNumber: String!
    password: String!
    confirm_password: String!
    status: UserStatus!
    role: UserRole!
  }

  input EditUserInput {
    _id: String!
    name: String!
    email: String!
    phoneNumber: String!
    password: String
    confirm_password: String
    status: UserStatus!
    role: UserRole!
  }

  input ChangeUserPasswordInput {
    email: String!
    password: String!
  }

  input DeleteUserInput {
    _id: String!
  }

  input ResetPasswordInput {
    token: String!
    password: String!
    confirm_password: String!
  }

  input RequestPasswordResetInput {
    email: String!
  }

  extend type Query {
    getUsersList: [User!]! @auth(roles: [ADMIN])
  }

  extend type Mutation {
    createUser(createUserInput: CreateUserInput!): User! @auth(roles: [ADMIN])
    editUser(editUserInput: EditUserInput!): User! @auth(roles: [ADMIN])
    deleteUser(deleteUserInput: DeleteUserInput!): Boolean!
      @auth(roles: [ADMIN])
    changeUserPassword(changeUserPasswordInput: ChangeUserPasswordInput): User!
      @auth(roles: [CLIENT])
    resetPassword(resetPasswordInput: ResetPasswordInput!): Boolean!
    requestPasswordReset(
      requestPasswordResetInput: RequestPasswordResetInput!
    ): Boolean!
  }
`;
