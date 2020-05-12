export interface ExtendedPickupLocation {
  isDeleted: string;
  orders: Order[];
}

export interface BasePickupLocation {
  city: string;
  status: PickupLocationStatus;
  zipCode?: string;
  streetName?: string;
  buildingNumber?: string;
}

export interface BaseOrder {
  pickupLocation: PickupLocation;
  amount: number;
}

export interface ExtendedOrder {
  status: OrderStatus;
  purchaser: User;
}

export interface User {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  status: UserStatus;
  role: UserRole;
  orders: Order[];
}

export interface Document {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
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
  NEW = 'NEW',
  AWAITING = 'AWAITING',
  DELIVERED = 'DELIVERED',
  CLOSED = 'CLOSED',
  CANCELED = 'CANCELED',
}

export type PickupLocation = BasePickupLocation &
  ExtendedPickupLocation &
  Document;

export type Order = BaseOrder & ExtendedOrder & Document;
