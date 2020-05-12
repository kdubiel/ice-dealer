import { Grid } from '@material-ui/core';
import React from 'react';
import { PopulatedOrderForm } from './PopulatedOrderForm';

interface Props {}

const MakeOrder = (_props: Props) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8}>
        <PopulatedOrderForm />
      </Grid>
    </Grid>
  );
};

export default MakeOrder;
