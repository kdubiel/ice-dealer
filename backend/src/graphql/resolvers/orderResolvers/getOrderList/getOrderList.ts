import { IFieldResolver } from 'graphql-tools';
import OrderModel from '../../../../models/orderModel';
import { Context } from '../../../context';

interface GetOrderListArgs {}

export const getOrderList: IFieldResolver<
  undefined,
  Context,
  GetOrderListArgs
> = async (_, __, ___) =>
  await OrderModel.find()
    .populate('pickupLocation')
    .populate('purchaser');
