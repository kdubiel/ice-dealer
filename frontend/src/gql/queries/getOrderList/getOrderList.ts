import gql from 'graphql-tag';
import { Order } from 'gql/types';
import OrderFragments from 'gql/fragments/orderFragments/orderFragments';
import PickupLocationFragments from 'gql/fragments/pickupLocationFragments/pickupLocationFragments';
import UserFragments from 'gql/fragments/userFragments/userFragments';

export interface GetOrderListQueryData {
  getOrderList: Order[];
}

export interface GetOrderListQueryVariables {}

export const GET_ORDER_LIST_QUERY = gql`
  query {
    getOrderList {
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
