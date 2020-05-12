import gql from 'graphql-tag';

export interface ResetPasswordMutationData {
  resetPassword: Boolean;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
  confirm_password: string;
}

export interface ResetPasswordMutationVariables {
  resetPasswordInput: ResetPasswordInput;
}

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($resetPasswordInput: ResetPasswordInput!) {
    resetPassword(resetPasswordInput: $resetPasswordInput)
  }
`;
