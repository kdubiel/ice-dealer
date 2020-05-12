import { IFieldResolver } from 'graphql-tools';
import Order from '../../../../models/orderModel';
import { Context } from '../../../context';
import { OrderStatus } from '../../../utils';
import { OrderStatusValidationSchema } from '@dnb/common';

interface UpdateOrdersStatusArgs {
  updateOrdersStatusInput: {
    status: OrderStatus;
    orders: string[];
  };
}

export const updateOrdersStatus: IFieldResolver<
  undefined,
  Context,
  UpdateOrdersStatusArgs
> = async (_, { updateOrdersStatusInput: { status, orders } }) => {
  OrderStatusValidationSchema().validateSync({ status });

  try {
    await Order.updateMany(
      {
        _id: {
          $in: orders,
        },
      },
      {
        status,
      }
    );
  } catch (e) {
    throw new Error('Internal server error.');
  }

  const updatedOrders = await Order.find({
    _id: {
      $in: orders,
    },
  }).populate(['purchaser', 'pickupLocation']);

  return updatedOrders;
};
