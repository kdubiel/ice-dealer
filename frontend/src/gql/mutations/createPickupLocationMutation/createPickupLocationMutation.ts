import gql from 'graphql-tag';
import { PickupLocation, PickupLocationStatus } from 'gql/types';

export interface CreatePickupLocationMutationData {
  createPickupLocation: PickupLocation;
}

export interface CreatePickupLocationMutationVariables {
  city: string;
  status: PickupLocationStatus;
  zipCode?: string;
  streetName?: string;
  buildingNumber?: string;
}

export interface CreatePickupLocationMutationInput {
  createPickupLocationInput: CreatePickupLocationMutationVariables;
}

export const CREATE_PICKUP_LOCATION_MUTATION = gql`
  mutation createPickupLocation(
    $createPickupLocationInput: CreatePickupLocationInput!
  ) {
    createPickupLocation(
      createPickupLocationInput: $createPickupLocationInput
    ) {
      _id
      city
      zipCode
      streetName
      buildingNumber
      status
    }
  }
`;
