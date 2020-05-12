import { Grid } from '@material-ui/core';
import React from 'react';
import { PopulatedPickupLocationsTable } from './PopulatedPickupLocationsTable';

interface PickupLocationsProps {}

const PickupLocations = (_props: PickupLocationsProps) => {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <PopulatedPickupLocationsTable />
      </Grid>
    </Grid>
  );
};

export default PickupLocations;
