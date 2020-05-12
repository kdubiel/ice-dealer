import { loginSchema } from '@dnb/common';
import bcrypt from 'bcryptjs';
import { IFieldResolver } from 'graphql-tools';
import i18n from 'i18next';
import User from '../../../../models/userModel';
import AuthService from '../../../../services/AuthService/AuthService';
import { Context } from '../../../context';
import { UserStatus } from '../../../utils';

interface LoginResolverArgs {
  authInput: {
    login: string;
    password: string;
    remember: boolean;
  };
}

export const loginResolver: IFieldResolver<
  undefined,
  Context,
  LoginResolverArgs
> = async (_, { authInput }, { res }) => {
  loginSchema().validateSync(authInput);

  const { login, password, remember } = authInput;

  const user = await User.findOne({ $or: [{ email: login }, { name: login }] });
  if (!user) {
    throw new Error(i18n.t('errors:login'));
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw new Error(i18n.t('errors:login'));
  }

  const { status } = user;

  if (status !== UserStatus.CONFIRMED) {
    throw new Error(i18n.t('errors:user_status'));
  }

  const { name, role, _id, email } = user;

  const token = AuthService.generateAccessToken(_id);
  AuthService.addRefreshTokenToResponse(res, _id, remember);

  return { userId: user._id.toString(), name, email, role, token };
};
