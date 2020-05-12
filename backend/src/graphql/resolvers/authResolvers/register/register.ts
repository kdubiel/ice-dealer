import { IFieldResolver } from 'graphql-tools';
import User from '../../../../models/userModel';
import { Context } from '../../../context';
import { BaseUserFormSchema, PasswordValidationSchema } from '@dnb/common';
import i18n from 'i18next';

interface RegisterResolverArgs {
  registerInput: {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    phoneNumber: string;
  };
}

export const registerResolver: IFieldResolver<
  undefined,
  Context,
  RegisterResolverArgs
> = async (_, { registerInput }) => {
  BaseUserFormSchema()
    .concat(PasswordValidationSchema(i18n.t.bind(i18n)))
    .validateSync(registerInput);

  const { name, email, phoneNumber, password } = registerInput;

  const existingUser = await User.findOne({ $or: [{ email }, { name }] });
  if (existingUser) {
    throw new Error(i18n.t('errors:user-already-exists'));
  }

  const newUser = new User({
    name,
    email,
    phoneNumber,
    password,
  });

  await newUser.save();

  return true;
};
