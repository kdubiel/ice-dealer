import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GetUsersQueryData,
  GetUsersQueryVariables,
  GET_USERS_LIST_QUERY,
  UserData,
  DeleteUserMutationData,
  DeleteUserMutationInput,
  DELETE_USER_MUTATION,
} from 'gql';
import React, { useState, useEffect } from 'react';
import { UserFormModal } from './UserFormModal';
import { UsersTable } from './UsersTable';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface Props {}

const PopulatedUsersTable = (_props: Props) => {
  const { t } = useTranslation();
  const [userModalOpened, setUserModalOpened] = useState(false);
  const [editing, setEditing] = useState<UserData | null>(null);

  const { data, loading, refetch } = useQuery<
    GetUsersQueryData,
    GetUsersQueryVariables
  >(GET_USERS_LIST_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const [deleteUser] = useMutation<
    DeleteUserMutationData,
    DeleteUserMutationInput
  >(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success(t('notification:delete:success'));
      refetch();
    },
    onError: () => {
      toast.error(t('notification:delete:error'));
    },
  });

  const onDeleteUserClick = (_id: string) => {
    deleteUser({ variables: { deleteUserInput: { _id } } });
  };

  const onAddUserClick = () => {
    setUserModalOpened(true);
  };

  const onEditUserClick = (user: UserData) => {
    setEditing(user);
  };

  const onRefreshClick = () => {
    refetch();
  };

  useEffect(() => {
    if (editing) {
      setUserModalOpened(true);
    }
  }, [editing]);

  const users = data?.getUsersList || [];

  return (
    <>
      <UserFormModal
        userModalOpened={userModalOpened}
        setUserModalOpened={setUserModalOpened}
        editing={editing}
        setEditing={setEditing}
      />
      <UsersTable
        data={users}
        loading={loading}
        onDeleteUserClick={onDeleteUserClick}
        onAddUserClick={onAddUserClick}
        onEditUserClick={onEditUserClick}
        onRefreshClick={onRefreshClick}
      />
    </>
  );
};

export default PopulatedUsersTable;
