import { IFieldResolver } from 'graphql-tools';
import PickupLocation from '../../../../models/pickupLocationModel';
import { Context } from '../../../context';
import { PickupLocationStatus } from '../../../utils';
import i18n from 'i18next';
import { PickupLocationValidationSchema } from '@dnb/common';

interface EditPickupLocationArgs {
  editPickupLocationInput: {
    _id: string;
    city: string;
    zipCode: string;
    streetName: string;
    buildingNumber: string;
    status: PickupLocationStatus;
  };
}

export const editPickupLocation: IFieldResolver<
  undefined,
  Context,
  EditPickupLocationArgs
> = async (_, { editPickupLocationInput }) => {
  PickupLocationValidationSchema(i18n.t.bind(i18n)).validateSync(
    editPickupLocationInput
  );

  const { _id, ...data } = editPickupLocationInput;

  const toEdit = await PickupLocation.findOne({ _id });
  if (!toEdit) {
    throw new Error('Pickup Location does not exist.');
  }

  await toEdit.set(data).save();

  return toEdit;
};
