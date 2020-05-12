import { IFieldResolver } from 'graphql-tools';
import PickupLocation from '../../../../models/pickupLocationModel';
import { Context } from '../../../context';

interface GetPickupLocationArgs {}

export const getPickupLocationList: IFieldResolver<
  undefined,
  Context,
  GetPickupLocationArgs
> = async (_, __, ___) =>
  await PickupLocation.find({
    isDeleted: false,
  });
