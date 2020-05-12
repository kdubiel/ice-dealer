import { Document, model, Model, Schema } from 'mongoose';
import { PickupLocationStatus } from '../graphql/utils';

const PickupLocationSchema = new Schema(
  {
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      required: true,
      enum: ['AVAILABLE', 'UNAVAILABLE'],
      default: 'UNAVAILABLE',
    },
    city: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    zipCode: {
      type: String,
      match: /^(([0-9]{2})-([0-9]{3}))?$/,
      trim: true,
    },
    streetName: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    buildingNumber: {
      type: String,
      maxlength: 16,
      trim: true,
    },
  },
  { timestamps: true }
);

interface IPickupLocationSchema extends Document {
  isDeleted: boolean;
  status: PickupLocationStatus;
  city: string;
  zipCode: string;
  streetName: string;
  buildingNumber: string;
}

interface IPickupLocationBase extends IPickupLocationSchema {}

export interface IPickupLocation extends IPickupLocationBase {}

export interface IPickupLocation_populated extends IPickupLocationBase {}

export interface IPickupLocationModel extends Model<IPickupLocation> {}

export default model<IPickupLocation, IPickupLocationModel>(
  'PickupLocation',
  PickupLocationSchema,
  'PickupLocations'
);
