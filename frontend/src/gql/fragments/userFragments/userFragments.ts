import gql from 'graphql-tag';

export default {
  base: gql`
    fragment BaseUser on User {
      _id
      name
      email
      phoneNumber
    }
  `,
};
