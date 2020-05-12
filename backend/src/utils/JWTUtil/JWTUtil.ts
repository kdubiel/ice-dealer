import jwt, { Algorithm, Secret } from 'jsonwebtoken';

export default class JWTUtil {
  private static readonly algorithm: Algorithm = 'HS512';

  private static getSecret(): Secret {
    return process.env.JWT_KEY as Secret;
  }

  public static signToken(body: object, expirationTime: string): string {
    return jwt.sign(body, this.getSecret(), {
      expiresIn: expirationTime,
      algorithm: this.algorithm,
    });
  }

  public static verifyToken(token: string): string | object {
    return jwt.verify(token, this.getSecret() as Secret, {
      algorithms: [this.algorithm],
    });
  }

  public static getTokenData(token: string): object | string | null {
    try {
      return this.verifyToken(token);
    } catch (error) {
      return null;
    }
  }
}
