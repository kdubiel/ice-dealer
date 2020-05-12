import gql from 'graphql-tag';
import { PickupLocation } from 'gql/types';

export interface DeletePickupLocationMutationData {
  deletePickupLocation: PickupLocation;
}

export interface DeletePickupLocationMutationVariables {
  _id: string;
}

export interface DeletePickupLocationMutationInput {
  deletePickupLocationInput: DeletePickupLocationMutationVariables;
}

export const DELETE_PICKUP_LOCATION_MUTATION = gql`
  mutation deletePickupLocation(
    $deletePickupLocationInput: DeletePickupLocationInput!
  ) {
    deletePickupLocation(deletePickupLocationInput: $deletePickupLocationInput)
  }
`;
