import { ApolloTable, MaterialTableDateColumn } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize, isArray } from 'lodash';
import { UserData } from 'gql';
import { materialTableFilterText, materialTableFilterDate } from 'utils';
import { TFunction } from 'i18next';

interface Props<T> {
  data: T[];
  loading?: boolean;
  onRefreshClick(): void;
  onAddUserClick(): void;
  onDeleteUserClick(userId: string): void;
  onEditUserClick(user: UserData): void;
}

const renderStatus = (status: string, t: TFunction) => (
  <span>{capitalize(t(`data:status:${status.toLowerCase()}`))}</span>
);

const renderRole = (role: string, t: TFunction) => (
  <span>{t(`data:role:${role.toLowerCase()}`)}</span>
);

const UsersTable = ({
  data,
  loading,
  onRefreshClick,
  onAddUserClick,
  onEditUserClick,
  onDeleteUserClick,
}: Props<UserData>) => {
  const { t } = useTranslation();

  return (
    <ApolloTable
      columns={[
        {
          title: t('labels:name'),
          field: 'name',
        },
        {
          title: t('labels:email'),
          field: 'email',
        },
        {
          title: t('labels:role'),
          field: 'role',
          render: ({ role }) => renderRole(role, t),
          customFilterAndSearch: (filter: string, { role }) =>
            materialTableFilterText(filter, {
              prefix: 'data:role',
              text: role,
              t,
            }),
        },
        {
          title: t('labels:phoneNumber'),
          field: 'phoneNumber',
          render: data => data.phoneNumber,
        },
        {
          title: t('labels:status'),
          field: 'status',
          render: ({ status }) => renderStatus(status, t),
          customFilterAndSearch: (filter: string, { status }) =>
            materialTableFilterText(filter, {
              prefix: 'data:status',
              text: status,
              t,
            }),
        },
        {
          title: t('labels:createdAt'),
          field: 'createdAt',
          editable: 'never',
          type: 'datetime',
          render: ({ createdAt }) =>
            MaterialTableDateColumn({ date: createdAt }),
          customFilterAndSearch: (filter: string, { createdAt }) =>
            materialTableFilterDate(filter, createdAt),
        },
      ]}
      actions={[
        {
          icon: 'add',
          tooltip: t('tooltip:add'),
          isFreeAction: true,
          onClick: () => onAddUserClick(),
        },
        {
          icon: 'refresh',
          tooltip: t('tooltip:refresh'),
          isFreeAction: true,
          onClick: () => onRefreshClick(),
        },
        {
          icon: 'delete',
          tooltip: t('tooltip:delete'),
          onClick: (_, data) => {
            const id = isArray(data) ? null : data._id; // TODO ? Array selection
            if (id) {
              onDeleteUserClick(id);
            }
          },
        },
        {
          icon: 'edit',
          tooltip: t('tooltip:edit'),
          onClick: (_, data) => {
            const user = isArray(data) ? null : data; // TODO ? Array selection
            if (user) {
              onEditUserClick(user);
            }
          },
        },
      ]}
      data={data}
      title={t('titles:users-table')}
      isLoading={loading}
    />
  );
};

export default UsersTable;
