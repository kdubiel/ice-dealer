import { IFieldResolver } from 'graphql-tools';
import Order from '../../../../models/orderModel';
import User from '../../../../models/userModel';
import PickupLocation from '../../../../models/pickupLocationModel';
import { Context } from '../../../context';
import { CreateOrderValidationSchema } from '@dnb/common';

interface CreateOrderArgs {
  createOrderInput: {
    pickupLocation: string;
    amount: number;
  };
}

export const createOrder: IFieldResolver<
  undefined,
  Context,
  CreateOrderArgs
> = async (_, { createOrderInput: { pickupLocation, amount } }, { user }) => {
  if (!user) {
    throw new Error('Not authenticated.');
  }

  CreateOrderValidationSchema().validateSync({ amount, pickupLocation });

  const { _id } = user;

  const purchaser = await User.findOne({ _id });
  if (!purchaser) {
    throw new Error('User not found.');
  }

  const pickupLocationObject = await PickupLocation.findOne({
    _id: pickupLocation,
  });
  if (!pickupLocationObject) {
    throw new Error('PickupLocation not found.');
  }

  const order = new Order({
    purchaser,
    pickupLocation,
    amount,
  });

  await order.save();

  return order;
};
