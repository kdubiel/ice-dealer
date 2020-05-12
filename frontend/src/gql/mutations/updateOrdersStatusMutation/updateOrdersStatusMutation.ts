import { OrderStatus, Order } from 'gql/types';
import gql from 'graphql-tag';
import OrderFragments from 'gql/fragments/orderFragments/orderFragments';
import PickupLocationFragments from 'gql/fragments/pickupLocationFragments/pickupLocationFragments';
import UserFragments from 'gql/fragments/userFragments/userFragments';

export interface UpdateOrdersStatusMutationData {
  updateOrdersStatus: Order[];
}

export interface UpdateOrdersStatusMutationVariables {
  orders: string[];
  status: OrderStatus;
}

export interface UpdateOrdersStatusMutationInput {
  updateOrdersStatusInput: UpdateOrdersStatusMutationVariables;
}

export const UPDATE_ORDERS_STATUS_MUTATION = gql`
  mutation updateOrdersStatus(
    $updateOrdersStatusInput: UpdateOrdersStatusInput!
  ) {
    updateOrdersStatus(updateOrdersStatusInput: $updateOrdersStatusInput) {
      ...BaseOrder
      pickupLocation {
        ...BasePickupLocation
      }
      purchaser {
        ...BaseUser
      }
      createdAt
      updatedAt
    }
  }
  ${OrderFragments.base}
  ${PickupLocationFragments.base}
  ${UserFragments.base}
`;
