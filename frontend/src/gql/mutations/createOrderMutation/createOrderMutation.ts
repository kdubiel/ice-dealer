import gql from 'graphql-tag';
import { Order } from 'gql/types';

export interface CreateOrderMutationData {
  createOrder: Order;
}

export interface CreateOrderMutationVariables {
  pickupLocation: string;
  amount: number;
}

export interface CreateOrderMutationInput {
  createOrderInput: CreateOrderMutationVariables;
}

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      _id
    }
  }
`;
