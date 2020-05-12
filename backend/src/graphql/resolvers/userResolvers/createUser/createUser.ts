import { IFieldResolver } from 'graphql-tools';
import User from '../../../../models/userModel';
import { Context } from '../../../context';
import i18n from 'i18next';
import {
  BaseUserFormSchema,
  ExtendedUserFormSchema,
  PasswordValidationSchema,
} from '@dnb/common';

interface CreateUserArgs {
  createUserInput: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirm_password: string;
    role: 'CLIENT' | 'ADMIN';
    status: 'NEW' | 'CONFIRMED' | 'DELETED';
  };
}

export const createUser: IFieldResolver<
  undefined,
  Context,
  CreateUserArgs
> = async (_, { createUserInput }) => {
  BaseUserFormSchema()
    .concat(ExtendedUserFormSchema())
    .concat(PasswordValidationSchema(i18n.t.bind(i18n), true))
    .validateSync(createUserInput);

  const { name, email, phoneNumber, password } = createUserInput;

  const existingUser = await User.findOne({ $or: [{ email }, { name }] });
  if (existingUser) {
    throw new Error('User already exists.');
  }

  const newUser = new User({
    name,
    email,
    phoneNumber,
    password,
  });

  await newUser.save();

  return newUser;
};
