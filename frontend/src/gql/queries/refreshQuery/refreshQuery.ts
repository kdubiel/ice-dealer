import gql from 'graphql-tag';
import { UserData } from 'context';

export type RefreshQueryData = {
  refresh: UserData;
};

export const REFRESH_QUERY = gql`
  {
    refresh {
      userId
      email
      name
      role
      token
    }
  }
`;
