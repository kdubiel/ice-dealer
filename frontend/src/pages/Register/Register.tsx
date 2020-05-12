import React from 'react';
import { Grid, Avatar, Typography, Container } from '@material-ui/core';
import { PopulatedRegisterForm } from './PopulatedRegisterForm';
import { Lock } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

const Register = () => {
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
            {t('titles:signup')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PopulatedRegisterForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
