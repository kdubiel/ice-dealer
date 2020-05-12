import { Grid } from '@material-ui/core';
import { FormikTextField } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ForgotPasswordForm = () => {
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
            id="email"
            label={t('labels:email')}
            name="email"
          />
        </Grid>
        <span>{t('messages:forgot-password')}</span>
      </Grid>
    </>
  );
};

export default ForgotPasswordForm;
