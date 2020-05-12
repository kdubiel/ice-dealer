import gql from 'graphql-tag';

export default {
  base: gql`
    fragment BasePickupLocation on PickupLocation {
      _id
      city
      zipCode
      streetName
      buildingNumber
    }
  `,
};
