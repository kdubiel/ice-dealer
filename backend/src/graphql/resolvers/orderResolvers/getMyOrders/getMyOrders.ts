import { IFieldResolver } from 'graphql-tools';
import OrderModel from '../../../../models/orderModel';
import { Context } from '../../../context';

interface GetMyOrdersArgs {}

export const getMyOrders: IFieldResolver<
  undefined,
  Context,
  GetMyOrdersArgs
> = async (_, __, { user }) => {
  if (!user) {
    throw new Error('Not authenticated.');
  }

  const orders = await OrderModel.find({ purchaser: user!._id }).populate(
    'pickupLocation'
  );

  return orders;
};
