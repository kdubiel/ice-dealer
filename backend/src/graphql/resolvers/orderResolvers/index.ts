import { IResolvers } from 'graphql-tools';
import { Context } from '../../../graphql/context';
import { createOrder } from './createOrder';
import { getMyOrders } from './getMyOrders';
import { getOrderList } from './getOrderList';
import { updateOrdersStatus } from './updateOrdersStatus';

export const resolvers: IResolvers<undefined, Context> = {
  Query: {
    getOrderList,
    getMyOrders,
  },
  Mutation: {
    createOrder,
    updateOrdersStatus,
  },
};

export default resolvers;
