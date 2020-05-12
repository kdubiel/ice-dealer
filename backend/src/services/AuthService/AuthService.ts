import e from 'express';
import { Token } from '../../enums';
import { Context } from '../../graphql/context';
import { AuthTokenData, UserRole, UserStatus } from '../../graphql/utils';
import User from '../../models/userModel';
import CookiesUtil from '../../utils/CookiesUtil/CookiesUtil';
import JWTUtil from '../../utils/JWTUtil/JWTUtil';

type AuthContextData = Pick<Context, 'accessToken' | 'refreshToken' | 'user'>;

type JWTAuthExpirationTimers = {
  short: string;
  long: string;
};

export default class AuthService {
  private static readonly expirationTimers: JWTAuthExpirationTimers = {
    short: '10m',
    long: '7d',
  };

  private static getAuthTokenExpirationTime(
    tokenType: Token.ACCESS | Token.REFRESH,
    remember?: boolean
  ) {
    if (tokenType === Token.ACCESS) {
      return this.expirationTimers.short;
    }

    return remember ? this.expirationTimers.long : this.expirationTimers.short;
  }

  public static generateAccessToken(userId: string) {
    return JWTUtil.signToken(
      {
        userId,
        type: Token.ACCESS,
      },
      this.getAuthTokenExpirationTime(Token.ACCESS)
    );
  }

  public static generateRefreshToken(userId: string, remember?: boolean) {
    return JWTUtil.signToken(
      {
        userId,
        type: Token.REFRESH,
        remember,
      },
      this.getAuthTokenExpirationTime(Token.REFRESH, remember)
    );
  }

  public static async getAuthContextData(
    req: e.Request
  ): Promise<AuthContextData> {
    const accessToken = req.get('Authorization');
    const { refreshToken } = req.cookies || {};

    const decodedAccessToken = accessToken
      ? (JWTUtil.getTokenData(accessToken) as AuthTokenData)
      : null;

    if (decodedAccessToken && decodedAccessToken.type !== Token.ACCESS) {
      throw new Error('Invalid access token');
    }

    return {
      accessToken: decodedAccessToken,
      refreshToken: refreshToken || null,
      user: decodedAccessToken
        ? await User.findById(decodedAccessToken.userId)
        : null,
    };
  }

  public static addRefreshTokenToResponse(
    response: e.Response,
    userId: string,
    remember?: boolean
  ) {
    CookiesUtil.setRefreshTokenCookie(
      response,
      this.generateRefreshToken(userId, remember)
    );
  }

  public static isAuthenticated({ user, res }: Context) {
    if (!user) {
      throw new Error('Not authenticated.');
    }

    if (user.status !== UserStatus.CONFIRMED) {
      CookiesUtil.clearRefreshTokenCookie(res);
      throw new Error('Account inactive.');
    }
    return true;
  }

  public static isAuthorized(context: Context, roles: UserRole[]) {
    this.isAuthenticated(context);

    const { user } = context;

    if (!roles.includes(user!.role)) {
      throw new Error('Not authorized.');
    }

    return true;
  }
}
