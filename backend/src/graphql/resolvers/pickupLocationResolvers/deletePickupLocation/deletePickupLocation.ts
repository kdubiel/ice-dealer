import { IFieldResolver } from 'graphql-tools';
import PickupLocation from '../../../../models/pickupLocationModel';
import { Context } from '../../../context';

interface DeletePickupLocationArgs {
  deletePickupLocationInput: {
    _id: string;
  };
}

export const deletePickupLocation: IFieldResolver<
  undefined,
  Context,
  DeletePickupLocationArgs
> = async (_, { deletePickupLocationInput }) => {
  const { _id } = deletePickupLocationInput;

  const toDelete = await PickupLocation.findOne({ _id });
  if (!toDelete) {
    throw new Error('Pickup Location does not exist.');
  }

  await toDelete.set('isDeleted', true).save();

  return true;
};
