import { Grid } from '@material-ui/core';
import { FormikSelect } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface ExtendedUserFormValues {
  status: string;
  role: string;
}

export interface ExtendedUserFormProps {}

const ExtendedUserForm = (_props: ExtendedUserFormProps) => {
  const { t } = useTranslation();

  const roleOptions = [
    {
      label: t('data:role:admin'),
      value: 'ADMIN',
    },
    {
      label: t('data:role:client'),
      value: 'CLIENT',
    },
  ];

  const statusOptions = [
    {
      label: t('data:status:new'),
      value: 'NEW',
    },
    {
      label: t('data:status:confirmed'),
      value: 'CONFIRMED',
    },
    {
      label: t('data:status:deleted'),
      value: 'DELETED',
    },
  ];

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12}>
          <FormikSelect
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('labels:role')}
            id="role"
            name="role"
            options={roleOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <FormikSelect
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('labels:status')}
            name="status"
            id="status"
            options={statusOptions}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ExtendedUserForm;
