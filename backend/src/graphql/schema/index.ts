import { gql } from 'apollo-server-express';
import authSchema from './authSchema';
import orderSchema from './orderSchema';
import userSchema from './userSchema';
import pickupLocationSchema from './pickupLocationSchema';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  orderSchema,
  userSchema,
  authSchema,
  pickupLocationSchema,
];
