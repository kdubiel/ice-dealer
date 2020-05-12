import { Avatar, Container, Grid, Typography } from '@material-ui/core';
import { Lock } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PopulatedLoginForm } from './PopulatedLoginForm';

interface Props {}

const Login = (_: Props) => {
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="xs">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item>
          <Avatar>
            <Lock />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography component="h1" variant="h5">
            {t('titles:login')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PopulatedLoginForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
