import { Grid } from '@material-ui/core';
import { FormikSelect, FormikCheckbox } from 'components';
import { OrderStatus } from 'gql/types';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  ordersCount: number;
}

const ExtendedOrderForm = ({ ordersCount }: Props) => {
  const { t } = useTranslation();

  const statusOptions = [
    {
      label: t('data:status:new'),
      value: OrderStatus.NEW,
    },
    {
      label: t('data:status:awaiting'),
      value: OrderStatus.AWAITING,
    },
    {
      label: t('data:status:canceled'),
      value: OrderStatus.CANCELED,
    },
    {
      label: t('data:status:closed'),
      value: OrderStatus.CLOSED,
    },
    {
      label: t('data:status:delivered'),
      value: OrderStatus.DELIVERED,
    },
  ];

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12}>
          <FormikSelect
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('labels:status')}
            id="status"
            name="status"
            options={statusOptions}
          />
          <FormikCheckbox
            labelProps={{
              label: t('labels:download-orders', { count: ordersCount }),
            }}
            color="primary"
            name="download"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ExtendedOrderForm;
