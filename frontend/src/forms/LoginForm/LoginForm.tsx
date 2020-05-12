import { Grid } from '@material-ui/core';
import { FormikCheckbox, FormikTextField } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation();

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12}>
          <FormikTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label={t('labels:login')}
            name="login"
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('labels:password')}
            type="password"
            id="password"
          />
        </Grid>
        <Grid item xs={12}>
          <FormikCheckbox
            labelProps={{ label: t('labels:remember') }}
            value="remember"
            color="primary"
            name="remember"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LoginForm;
