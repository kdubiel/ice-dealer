import gql from 'graphql-tag';
import { Tokens } from 'gql/types';

export interface RegisterMutationData {
  register: Tokens;
}

export interface RegisterInput {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirm_password: string;
}

export interface RegisterMutationVariables {
  registerInput: RegisterInput;
}

export const REGISTER_MUTATION = gql`
  mutation register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput)
  }
`;
