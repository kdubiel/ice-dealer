import { Token } from '../enums/token';

export interface AuthTokenData {
  userId: string;
  type: Token.ACCESS | Token.REFRESH;
  remember?: boolean;
}

export interface ResetPasswordTokenData {
  userId: string;
  type: Token.RESET_PASSWORD;
}

export enum UserStatus {
  NEW = 'NEW',
  CONFIRMED = 'CONFIRMED',
  DELETED = 'DELETED',
}

export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export enum PickupLocationStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}

export enum OrderStatus {
  AWAITING = 'AWAITING',
  PROCESSING = 'PROCESSING',
  DELIVERED = 'DELIVERED',
  CLOSED = 'CLOSED',
  CANCELED = 'CANCELED',
}
