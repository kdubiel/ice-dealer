import { IFieldResolver } from 'graphql-tools';
import User from '../../../../models/userModel';
import { Context } from '../../../context';

export const getUserList: IFieldResolver<
  undefined,
  Context,
  undefined
> = async (_, __, ___) => await User.find();
