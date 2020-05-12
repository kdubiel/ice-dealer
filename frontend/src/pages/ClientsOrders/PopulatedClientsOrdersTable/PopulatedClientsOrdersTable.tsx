import { useQuery } from '@apollo/react-hooks';
import { OrderTable } from 'components';
import {
  GetOrderListQueryData,
  GetOrderListQueryVariables,
  GET_ORDER_LIST_QUERY,
} from 'gql';
import { Order } from 'gql/types';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { downloadObjectsAsCsv, mapOrdersToCsvData } from 'utils';
import { EditOrdersStatusFormModal } from './EditOrdersStatusFormModal';
import { MaterialTableProps } from 'material-table';

interface Props {}

const PopulatedClientsOrdersTable = (_props: Props) => {
  const { t } = useTranslation();
  const [editing, setEditing] = useState<Order[] | null>(null);
  const tableRef = useRef<MaterialTableProps<Order[]>['tableRef']>(null);

  const { data, loading, refetch } = useQuery<
    GetOrderListQueryData,
    GetOrderListQueryVariables
  >(GET_ORDER_LIST_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  const onUpdateClick = (data: Order[]) => {
    setEditing(data);
  };

  const onUpdateSuccess = () => {
    if (tableRef?.current) {
      tableRef.current.onAllSelected(false);
    }
  };

  const exportOrders = (orders: Order[]) => {
    downloadObjectsAsCsv(
      mapOrdersToCsvData(orders, t),
      `zamowienia_${moment().format('YYYY-MM-DD_HH:mm:ss')}.csv`
    );
  };

  return (
    <>
      <EditOrdersStatusFormModal
        editing={editing}
        setEditing={setEditing}
        onUpdateSuccess={onUpdateSuccess}
      />
      <OrderTable
        data={data?.getOrderList || []}
        loading={loading}
        title={t('titles:clientsOrders')}
        tableRef={tableRef}
        options={{
          selection: true,
        }}
        crud={{
          read: refetch,
          update: onUpdateClick,
        }}
        actions={[
          {
            icon: 'save',
            tooltip: t('tooltip:export'),
            onClick: (_, rowData) => {
              exportOrders(rowData as Order[]);
            },
          },
        ]}
      />
    </>
  );
};

export default PopulatedClientsOrdersTable;
