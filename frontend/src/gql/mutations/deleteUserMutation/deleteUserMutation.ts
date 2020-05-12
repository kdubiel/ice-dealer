import gql from 'graphql-tag';
import { UserData } from 'context';

export interface DeleteUserMutationData {
  deleteUser: UserData;
}

export interface DeleteUserMutationVariables {
  _id: string;
}

export interface DeleteUserMutationInput {
  deleteUserInput: DeleteUserMutationVariables;
}

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($deleteUserInput: DeleteUserInput!) {
    deleteUser(deleteUserInput: $deleteUserInput)
  }
`;
