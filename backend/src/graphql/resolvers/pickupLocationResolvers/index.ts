import { IResolvers } from 'graphql-tools';
import { createPickupLocation } from './createPickupLocation';
import { getPickupLocationList } from './getPickupLocationList';
import { editPickupLocation } from './editPickupLocation';
import { deletePickupLocation } from './deletePickupLocation';

const userResolvers: IResolvers = {
  Query: {
    getPickupLocationList,
  },
  Mutation: {
    createPickupLocation,
    editPickupLocation,
    deletePickupLocation,
  },
};

export default userResolvers;
