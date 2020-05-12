import { gql } from 'apollo-server-express';

export default gql`
  type PickupLocation {
    _id: ID!
    createdAt: String! @auth(roles: [ADMIN])
    updatedAt: String! @auth(roles: [ADMIN])
    isDeleted: Boolean! @auth(roles: [ADMIN])
    status: PickupLocationStatus!
    city: String!
    zipCode: String
    streetName: String
    buildingNumber: String
  }

  input CreatePickupLocationInput {
    city: String!
    status: PickupLocationStatus
    zipCode: String
    streetName: String
    buildingNumber: String
  }

  input EditPickupLocationInput {
    _id: String!
    city: String!
    status: PickupLocationStatus
    zipCode: String
    streetName: String
    buildingNumber: String
  }

  input DeletePickupLocationInput {
    _id: String!
  }

  enum PickupLocationStatus {
    AVAILABLE
    UNAVAILABLE
  }

  extend type Query {
    getPickupLocationList: [PickupLocation!]! @auth
  }

  extend type Mutation {
    createPickupLocation(
      createPickupLocationInput: CreatePickupLocationInput!
    ): PickupLocation! @auth(roles: [ADMIN])
    editPickupLocation(
      editPickupLocationInput: EditPickupLocationInput!
    ): PickupLocation! @auth(roles: [ADMIN])
    deletePickupLocation(
      deletePickupLocationInput: DeletePickupLocationInput!
    ): Boolean! @auth(roles: [ADMIN])
  }
`;
