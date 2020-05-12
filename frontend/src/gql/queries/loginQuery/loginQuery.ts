import gql from 'graphql-tag';
import { UserData } from 'context';

export interface LoginQueryData {
  login: UserData;
}

export interface LoginQueryVariables {
  login: string;
  password: string;
  remember: boolean;
}

export const LOGIN_QUERY = gql`
  query Login($login: String!, $password: String!, $remember: Boolean!) {
    login(
      authInput: { login: $login, password: $password, remember: $remember }
    ) {
      userId
      email
      name
      role
      token
    }
  }
`;
