import { Grid } from '@material-ui/core';
import { FormikTextField } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  required?: boolean;
}

const PasswordForm = ({ required }: Props) => {
  const { t } = useTranslation();
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <FormikTextField
          variant="outlined"
          margin="normal"
          required={required}
          fullWidth
          label={t('labels:password')}
          name="password"
          type="password"
          id="password"
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextField
          variant="outlined"
          margin="normal"
          required={required}
          fullWidth
          label={t('labels:confirm-password')}
          name="confirm_password"
          type="password"
          id="confirm_password"
        />
      </Grid>
    </Grid>
  );
};

export default PasswordForm;
