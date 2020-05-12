import React from 'react';
import { PopulatedMyOrdersTable } from './PopulatedMyOrdersTable';
import { Grid } from '@material-ui/core';

interface Props {}

const MyOrders = (_props: Props) => {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <PopulatedMyOrdersTable />
      </Grid>
    </Grid>
  );
};

export default MyOrders;
