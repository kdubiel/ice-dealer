import { PasswordValidationSchema } from '@dnb/common';
import { IFieldResolver } from 'graphql-tools';
import i18n from 'i18next';
import { Token } from '../../../../enums/token';
import User from '../../../../models/userModel';
import JWTUtil from '../../../../utils/JWTUtil/JWTUtil';
import { Context } from '../../../context';
import { ResetPasswordTokenData } from '../../../utils';

interface ResetPasswordArgs {
  resetPasswordInput: {
    token: string;
    password: string;
    confirm_password: string;
  };
}

export const resetPassword: IFieldResolver<
  undefined,
  Context,
  ResetPasswordArgs
> = async (_, { resetPasswordInput }) => {
  PasswordValidationSchema(i18n.t.bind(i18n), true).validateSync(
    resetPasswordInput
  );

  const { token, password } = resetPasswordInput;

  const decodedToken = JWTUtil.getTokenData(token) as ResetPasswordTokenData;

  if (decodedToken?.type !== Token.RESET_PASSWORD || !decodedToken?.userId) {
    throw new Error('Invalid reset password token');
  }

  const existingUser = await User.findOne({ _id: decodedToken.userId });
  if (!existingUser) {
    throw new Error('Could not find user with given userId');
  }

  if (existingUser.resetPasswordToken !== token) {
    throw new Error('Invalid reset password token');
  }

  existingUser.setPassword(password);

  await existingUser.save();

  return true;
};
