import { Document, model, Model, Schema, Types } from 'mongoose';
import { OrderStatus } from '../graphql/utils';
import { IPickupLocation } from './pickupLocationModel';
import { IUser } from './userModel';

const OrderSchema = new Schema(
  {
    purchaser: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pickupLocation: {
      type: Types.ObjectId,
      ref: 'PickupLocation',
      required: true,
    },
    amount: {
      type: Number,
      max: 999999,
      required: true,
    },
    status: {
      type: String,
      enum: ['NEW', 'AWAITING', 'DELIVERED', 'CANCELED', 'CLOSED'],
      default: 'NEW',
      required: true,
    },
  },
  { timestamps: true }
);

interface IOrderSchema extends Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  status: OrderStatus;
}

interface IOrderBase extends IOrderSchema {}

export interface IOrder extends IOrderBase {
  purchaser: IUser['_id'];
  pickupLocation: IPickupLocation['_id'];
}

export interface IOrder_populated extends IOrderBase {
  purchaser: IUser;
  pickupLocation: IPickupLocation;
}

export interface IOrderModel extends Model<IOrder> {}

export default model<IOrder, IOrderModel>('Order', OrderSchema, 'Orders');
