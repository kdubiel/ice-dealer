import gql from 'graphql-tag';

export interface RequestPasswordResetMutationData {
  requestPasswordReset: Boolean;
}

export interface RequestPasswordResetInput {
  email: string;
}

export interface RequestPasswordResetMutationVariables {
  requestPasswordResetInput: RequestPasswordResetInput;
}

export const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation requestPasswordReset(
    $requestPasswordResetInput: RequestPasswordResetInput!
  ) {
    requestPasswordReset(requestPasswordResetInput: $requestPasswordResetInput)
  }
`;
