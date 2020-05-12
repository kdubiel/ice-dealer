import gql from 'graphql-tag';

export type LogoutQueryData = boolean;

export const LOGOUT_QUERY = gql`
  {
    logout
  }
`;
