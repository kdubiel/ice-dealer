import gql from 'graphql-tag';

export interface UserData {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: 'ADMIN' | 'CLIENT';
  status: 'NEW' | 'CONFIRMED' | 'DELETED';
  createdAt: string;
}

export interface GetUsersQueryData {
  getUsersList: UserData[];
}

export interface GetUsersQueryVariables {}

export const GET_USERS_LIST_QUERY = gql`
  {
    getUsersList {
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
