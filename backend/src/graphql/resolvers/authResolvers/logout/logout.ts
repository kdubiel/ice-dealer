import { IFieldResolver } from 'graphql-tools';
import CookiesUtil from '../../../../utils/CookiesUtil/CookiesUtil';
import { Context } from '../../../context';

export const logoutResolver: IFieldResolver<undefined, Context, null> = async (
  _,
  __,
  { res }
) => {
  try {
    CookiesUtil.clearRefreshTokenCookie(res);
  } catch (error) {
    return false;
  }
  return true;
};
