import e from 'express';

export default class CookiesUtil {
  private static readonly maxAge: number = 1000 * 60 * 60 * 60 * 24 * 7;

  public static setRefreshTokenCookie(res: e.Response, token: string) {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: true,
      maxAge: this.maxAge,
      sameSite: 'none',
    });
  }

  public static clearRefreshTokenCookie(res: e.Response) {
    res.clearCookie('refreshToken');
  }
}
