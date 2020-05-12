import gql from 'graphql-tag';
import { UserData } from 'gql/queries/usersQuery';

export interface CreateUserMutationData {
  createUser: UserData;
}

export interface CreateUserMutationVariables {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirm_password: string;
  role: 'CLIENT' | 'ADMIN';
  status: 'NEW' | 'CONFIRMED' | 'DELETED';
}

export interface CreateUserMutationInput {
  createUserInput: CreateUserMutationVariables;
}

export const CREATE_USER_MUTATION = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      name
      email
      phoneNumber
      role
      status
      createdAt
    }
  }
`;
