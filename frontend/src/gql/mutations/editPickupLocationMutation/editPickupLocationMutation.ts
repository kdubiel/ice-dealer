import gql from 'graphql-tag';
import { PickupLocation, PickupLocationStatus } from 'gql/types';

export interface EditPickupLocationMutationData {
  editPickupLocation: PickupLocation;
}

export interface EditPickupLocationMutationVariables {
  _id: string;
  city: string;
  status: PickupLocationStatus;
  zipCode?: string;
  streetName?: string;
  buildingNumber?: string;
}

export interface EditPickupLocationMutationInput {
  editPickupLocationInput: EditPickupLocationMutationVariables;
}

export const EDIT_PICKUP_LOCATION_MUTATION = gql`
  mutation editPickupLocation(
    $editPickupLocationInput: EditPickupLocationInput!
  ) {
    editPickupLocation(editPickupLocationInput: $editPickupLocationInput) {
      _id
      city
      zipCode
      streetName
      buildingNumber
      status
    }
  }
`;
