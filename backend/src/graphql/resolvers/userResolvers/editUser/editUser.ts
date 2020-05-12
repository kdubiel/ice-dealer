import { IFieldResolver } from 'graphql-tools';
import User from '../../../../models/userModel';
import { Context } from '../../../context';
import i18n from 'i18next';
import {
  BaseUserFormSchema,
  ExtendedUserFormSchema,
  PasswordValidationSchema,
} from '@dnb/common';
import bcrypt from 'bcryptjs';

interface EditUserArgs {
  editUserInput: {
    _id: string;
    name: string;
    email: string;
    password?: string;
    confirm_password?: string;
    role: 'CLIENT' | 'ADMIN';
    status: 'NEW' | 'CONFIRMED' | 'DELETED';
  };
}

export const editUser: IFieldResolver<
  undefined,
  Context,
  EditUserArgs
> = async (_, { editUserInput }) => {
  BaseUserFormSchema()
    .concat(ExtendedUserFormSchema())
    .concat(PasswordValidationSchema(i18n.t.bind(i18n), false))
    .validateSync(editUserInput);

  const { _id, password, ...data } = editUserInput;

  const existingUser = await User.findOne({ _id });
  if (!existingUser) {
    throw new Error('User does not exist.');
  }

  await existingUser
    .set({
      ...data,
      ...(password ? { password: bcrypt.hashSync(password, 12) } : {}),
    })
    .save();

  return existingUser;
};
