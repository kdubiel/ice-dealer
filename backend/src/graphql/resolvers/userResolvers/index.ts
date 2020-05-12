import { createUser } from './createUser';
import { getUserList } from './getUserList';
import { deleteUser } from './deleteUser';
import { editUser } from './editUser';
import { resetPassword } from './resetPassword';
import { requestPasswordReset } from './requestPasswordReset';
import { IResolvers } from 'graphql-tools';

const userResolvers: IResolvers = {
  Query: {
    getUsersList: getUserList,
  },
  Mutation: {
    createUser,
    deleteUser,
    editUser,
    changeUserPassword: async (_, { __ }) => {},
    resetPassword,
    requestPasswordReset,
  },
};

export default userResolvers;
