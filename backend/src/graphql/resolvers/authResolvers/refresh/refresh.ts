import { IFieldResolver } from 'graphql-tools';
import { AuthTokenData } from 'graphql/utils';
import { Token } from '../../../../enums/token';
import User from '../../../../models/userModel';
import AuthService from '../../../../services/AuthService/AuthService';
import JWTUtil from '../../../../utils/JWTUtil/JWTUtil';
import { Context } from '../../../context';

export const refreshResolver: IFieldResolver<undefined, Context, null> = async (
  _,
  __,
  { refreshToken, res }
) => {
  if (!refreshToken) {
    throw new Error('Invalid refresh token');
  }

  const data = JWTUtil.getTokenData(refreshToken) as AuthTokenData | null;

  if (data?.type !== Token.REFRESH) {
    throw new Error('Invalid refresh token');
  }

  if (data) {
    const user = await User.findOne({ _id: data.userId });
    if (!user) {
      throw new Error('Could not find user with given id');
    }

    const { name, role, email, _id } = user;

    const newAccessToken = AuthService.generateAccessToken(_id);
    AuthService.addRefreshTokenToResponse(res, _id, data.remember);

    return {
      userId: _id,
      name,
      email,
      role,
      token: newAccessToken,
    };
  }

  throw new Error('Invalid refresh token');
};
