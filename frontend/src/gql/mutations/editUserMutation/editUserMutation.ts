import gql from 'graphql-tag';
import { UserData } from 'context';

export interface EditUserMutationData {
  editUser: UserData;
}

export interface EditUserMutationVariables {
  _id: string;
  name: string;
  email: string;
  password?: string;
  confirm_password?: string;
  role: 'CLIENT' | 'ADMIN';
  status: 'NEW' | 'CONFIRMED' | 'DELETED';
}

export interface EditUserMutationInput {
  editUserInput: EditUserMutationVariables;
}

export const EDIT_USER_MUTATION = gql`
  mutation editUser($editUserInput: EditUserInput!) {
    editUser(editUserInput: $editUserInput) {
      _id
      email
      name
      role
      status
      phoneNumber
      createdAt
    }
  }
`;
