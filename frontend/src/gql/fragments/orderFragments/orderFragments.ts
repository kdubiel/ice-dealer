import gql from 'graphql-tag';

export default {
  base: gql`
    fragment BaseOrder on Order {
      _id
      amount
      status
    }
  `,
};
