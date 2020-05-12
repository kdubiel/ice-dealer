import { ApolloTable, CRUD_Actions } from 'components';
import { PickupLocation } from 'gql/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'lodash';
import { materialTableFilterText } from 'utils';

interface PickupLocationsTableProps<T> {
  data: T[];
  loading?: boolean;
  crud?: CRUD_Actions<T>;
}

const PickupLocationsTable = ({
  data,
  loading,
  crud,
}: PickupLocationsTableProps<PickupLocation>) => {
  const { t } = useTranslation();

  const renderStatus = (status: string) => (
    <span>{capitalize(t(`data:status:${status.toLowerCase()}`))}</span>
  );

  return (
    <ApolloTable
      data={data}
      title={t('titles:pickupLocation-table')}
      isLoading={loading}
      columns={[
        {
          title: t('labels:city'),
          field: 'city',
        },
        {
          title: t('labels:zipCode'),
          field: 'zipCode',
        },
        {
          title: t('labels:streetName'),
          field: 'streetName',
        },
        {
          title: t('labels:buildingNumber'),
          field: 'buildingNumber',
        },
        {
          title: t('labels:status'),
          field: 'status',
          render: ({ status }) => renderStatus(status),
          customFilterAndSearch: (filter: string, { status }) =>
            materialTableFilterText(filter, {
              prefix: 'data:status',
              text: status,
              t,
            }),
        },
      ]}
      crud={crud}
    />
  );
};

export default PickupLocationsTable;
