import gql from 'graphql-tag';
import { Order } from 'gql/types';
import OrderFragments from 'gql/fragments/orderFragments/orderFragments';
import PickupLocationFragments from 'gql/fragments/pickupLocationFragments/pickupLocationFragments';

export interface GetMyOrdersQueryData {
  getMyOrders: Order[];
}

export interface GetMyOrdersQueryVariables {}

export const GET_MY_ORDERS_QUERY = gql`
  query {
    getMyOrders {
      ...BaseOrder
      pickupLocation {
        ...BasePickupLocation
      }
      createdAt
    }
  }
  ${OrderFragments.base}
  ${PickupLocationFragments.base}
`;
