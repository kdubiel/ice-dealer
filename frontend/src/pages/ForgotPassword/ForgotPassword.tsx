import React from 'react';
import { Avatar, Container, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PopulatedForgotPasswordForm } from './PopulatedForgotPasswordForm';
import { PopulatedResetPasswordForm } from './PopulatedResetPasswordForm';
import { Lock } from '@material-ui/icons';
import { RouteComponentProps, useParams } from 'react-router';

interface TParams {
  token?: string;
}

interface Props extends RouteComponentProps<TParams> {}

const ForgotPassword = (_: Props) => {
  const { t } = useTranslation();
  const { token } = useParams();

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
            {token ? t('titles:reset-password') : t('titles:forgot-password')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {token ? (
            <PopulatedResetPasswordForm token={token} />
          ) : (
            <PopulatedForgotPasswordForm />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
