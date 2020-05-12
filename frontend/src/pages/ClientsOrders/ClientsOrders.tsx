import { Grid } from '@material-ui/core';
import React from 'react';
import { PopulatedClientsOrdersTable } from './PopulatedClientsOrdersTable';

interface Props {}

const ClientsOrders = (_props: Props) => {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <PopulatedClientsOrdersTable />
      </Grid>
    </Grid>
  );
};

export default ClientsOrders;
