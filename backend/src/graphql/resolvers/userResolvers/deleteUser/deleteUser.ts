import { IFieldResolver } from 'graphql-tools';
import User from '../../../../models/userModel';
import { Context } from '../../../context';
import { UserRole, UserStatus } from '../../../utils';

interface DeleteUserArgs {
  deleteUserInput: {
    _id: string;
  };
}

export const deleteUser: IFieldResolver<
  undefined,
  Context,
  DeleteUserArgs
> = async (_, { deleteUserInput }) => {
  const { _id } = deleteUserInput;

  const existingUser = await User.findOne({ _id });
  if (!existingUser) {
    throw new Error('User does not exist.');
  }

  if (existingUser.role === UserRole.ADMIN) {
    throw new Error('Cannot delete Admin User.');
  }

  await existingUser.set('status', UserStatus.DELETED).save();

  return true;
};
