import { IFieldResolver } from 'graphql-tools';
import PickupLocation from '../../../../models/pickupLocationModel';
import { Context } from '../../../context';
import { PickupLocationStatus } from '../../../utils';
import { PickupLocationValidationSchema } from '@dnb/common';
import i18n from 'i18next';

interface CreatePickupLocationArgs {
  createPickupLocationInput: {
    city: string;
    zipCode: string;
    streetName: string;
    buildingNumber: string;
    status: PickupLocationStatus;
  };
}

export const createPickupLocation: IFieldResolver<
  undefined,
  Context,
  CreatePickupLocationArgs
> = async (_, { createPickupLocationInput }) => {
  PickupLocationValidationSchema(i18n.t.bind(i18n)).validateSync(
    createPickupLocationInput
  );

  const newPickupLocation = new PickupLocation(createPickupLocationInput);
  await newPickupLocation.save();

  return newPickupLocation;
};
