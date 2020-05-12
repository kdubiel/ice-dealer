import { Grid } from '@material-ui/core';
import React from 'react';
import { PopulatedUsersTable } from './PopulatedUsersTable';

interface Props {}

const Users = (_props: Props) => {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <PopulatedUsersTable />
      </Grid>
    </Grid>
  );
};

export default Users;
