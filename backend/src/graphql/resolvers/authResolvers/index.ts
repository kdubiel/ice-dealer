import { IResolvers } from 'graphql-tools';
import { Context } from '../../context';
import { loginResolver } from './login';
import { logoutResolver } from './logout';
import { refreshResolver } from './refresh';
import { registerResolver } from './register';

const authResolvers: IResolvers<undefined, Context> = {
  Query: {
    login: loginResolver,
    logout: logoutResolver,
    refresh: refreshResolver,
  },
  Mutation: {
    register: registerResolver,
  },
};

export default authResolvers;
