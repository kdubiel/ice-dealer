import gql from 'graphql-tag';
import { PickupLocation } from 'gql/types';

export interface GetPickupLocationsQueryData {
  getPickupLocationList: PickupLocation[];
}

export interface GetPickupLocationsQueryVariables {}

export const GET_PICKUP_LOCATIONS_QUERY = gql`
  {
    getPickupLocationList {
      _id
      city
      zipCode
      streetName
      buildingNumber
      status
    }
  }
`;
