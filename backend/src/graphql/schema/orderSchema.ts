import { gql } from 'apollo-server-express';

export default gql`
  type Order {
    _id: ID!
    createdAt: String!
    updatedAt: String! @auth(roles: [ADMIN])
    purchaser: User! @auth(roles: [ADMIN])
    pickupLocation: PickupLocation!
    amount: Int!
    status: OrderStatus!
  }

  input CreateOrderInput {
    pickupLocation: ID!
    amount: Int!
  }

  input UpdateOrdersStatusInput {
    status: OrderStatus!
    orders: [ID!]!
  }

  input DeleteOrderInput {
    _id: ID!
  }

  enum OrderStatus {
    NEW
    AWAITING
    DELIVERED
    CLOSED
    CANCELED
  }

  extend type Query {
    getOrderList: [Order]! @auth(roles: [ADMIN])
    getMyOrders: [Order]! @auth(roles: [CLIENT])
  }

  extend type Mutation {
    createOrder(createOrderInput: CreateOrderInput!): Order!
      @auth(roles: [CLIENT])
    updateOrdersStatus(
      updateOrdersStatusInput: UpdateOrdersStatusInput!
    ): [Order]! @auth(roles: [ADMIN])
    deleteOrder(deleteOrderInput: DeleteOrderInput!): Order!
      @auth(roles: [ADMIN])
  }
`;
