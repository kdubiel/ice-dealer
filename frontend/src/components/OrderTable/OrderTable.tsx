import { ApolloTable, CRUD_Actions, MaterialTableDateColumn } from 'components';
import { AuthContext } from 'context';
import { BasePickupLocation, Order } from 'gql/types';
import { TFunction } from 'i18next';
import { capitalize } from 'lodash';
import { Action, Column, MaterialTableProps, Options } from 'material-table';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  formatPurchaserData,
  mapPickupLocationToString,
  materialTableFilterDate,
  materialTableFilterText,
  materialTableSortText,
  PurchaserData,
} from 'utils';

interface OrderTableProps<T extends object> {
  data: T[];
  loading?: boolean;
  title: string;
  options?: Options;
  crud?: CRUD_Actions<T>;
  tableRef?: MaterialTableProps<T>['tableRef'];
  actions?: Action<T>[];
}

const renderPickupLocationColumn = (pickupLocation: BasePickupLocation) => {
  return <span>{mapPickupLocationToString(pickupLocation)}</span>;
};

const renderPurchaserColumn = (purchaser: PurchaserData) => {
  return <span>{formatPurchaserData(purchaser)}</span>;
};

const renderContact = (contact: string) => <span>{contact}</span>;

const renderStatus = (status: string, t: TFunction) => (
  <span>{capitalize(t(`data:status:${status.toLowerCase()}`))}</span>
);

const getAdminColumns = (t: TFunction): Column<Order>[] => [
  {
    title: t('labels:purchaser'),
    field: 'purchaser',
    render: ({ purchaser: { name, email } }) =>
      renderPurchaserColumn({ name, email }),
    customFilterAndSearch: (filter: string, { purchaser }) =>
      materialTableFilterText(filter, formatPurchaserData(purchaser)),
  },
  {
    title: t('labels:contact'),
    field: 'contact',
    render: ({ purchaser: { phoneNumber } }) =>
      renderContact(phoneNumber || ''),
    customFilterAndSearch: (filter: string, { purchaser: { phoneNumber } }) =>
      materialTableFilterText(filter, phoneNumber),
    customSort: (
      { purchaser: { phoneNumber: number1 } },
      { purchaser: { phoneNumber: number2 } }
    ) => materialTableSortText(number1, number2),
  },
];

const getDefaultColumns = (t: TFunction): Column<Order>[] => [
  {
    title: t('labels:amount'),
    field: 'amount',
  },
  {
    title: t('labels:pickupLocation'),
    field: 'pickupLocation',
    render: ({ pickupLocation }) => renderPickupLocationColumn(pickupLocation),
    customFilterAndSearch: (filter: string, { pickupLocation }) =>
      materialTableFilterText(
        filter,
        mapPickupLocationToString(pickupLocation)
      ),
    customSort: (
      { pickupLocation: location1 },
      { pickupLocation: location2 }
    ) =>
      materialTableSortText(
        mapPickupLocationToString(location1),
        mapPickupLocationToString(location2)
      ),
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
    defaultSort: 'desc',
    render: ({ createdAt }) => MaterialTableDateColumn({ date: createdAt }),
    customFilterAndSearch: (filter: string, { createdAt }) =>
      materialTableFilterDate(filter, createdAt),
  },
];

const OrderTable = ({
  data,
  loading,
  title,
  options,
  crud,
  tableRef,
  actions,
}: OrderTableProps<Order>) => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'ADMIN';

  return (
    <ApolloTable
      data={data}
      title={title}
      isLoading={loading}
      tableRef={tableRef}
      columns={[
        ...getDefaultColumns(t),
        ...(isAdmin ? getAdminColumns(t) : []),
      ]}
      options={options}
      crud={crud}
      actions={actions}
    />
  );
};

export default OrderTable;
