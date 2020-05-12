import React from 'react';
import { OrderTable } from 'components';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import {
  GET_MY_ORDERS_QUERY,
  GetMyOrdersQueryData,
  GetMyOrdersQueryVariables,
} from 'gql';

interface Props {}

const PopulatedMyOrdersTable = (_props: Props) => {
  const { t } = useTranslation();

  const { data, loading } = useQuery<
    GetMyOrdersQueryData,
    GetMyOrdersQueryVariables
  >(GET_MY_ORDERS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  return (
    <OrderTable
      data={data?.getMyOrders || []}
      loading={loading}
      title={t('titles:myOrders')}
    />
  );
};

export default PopulatedMyOrdersTable;
