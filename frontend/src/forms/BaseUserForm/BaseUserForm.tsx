import { Grid } from '@material-ui/core';
import { FormikTextField } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface BaseUserFormValues {
  name: string;
  email: string;
  password: string;
}

export interface BaseUserFormProps {
  isLoading?: boolean;
}

const BaseUserForm = (_props: BaseUserFormProps) => {
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
            label={t('labels:name')}
            id="name"
            name="name"
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('labels:email')}
            id="email"
            name="email"
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('labels:phoneNumber')}
            id="phoneNumber"
            name="phoneNumber"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BaseUserForm;
