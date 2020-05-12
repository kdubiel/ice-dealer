import React from 'react';
import { Grid } from '@material-ui/core';
import { FormikTextField, FormikSelect } from 'components';
import { useTranslation } from 'react-i18next';
import { PickupLocationStatus } from 'gql/types';

interface Props {}

const PickupLocationForm = (_props: Props) => {
  const { t } = useTranslation();

  const statusOptions = [
    {
      label: t('data:status:available'),
      value: PickupLocationStatus.AVAILABLE,
    },
    {
      label: t('data:status:unavailable'),
      value: PickupLocationStatus.UNAVAILABLE,
    },
  ];

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12}>
          <FormikTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('labels:city')}
            id="city"
            name="city"
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={t('labels:zipCode')}
            id="zipCode"
            name="zipCode"
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={t('labels:streetName')}
            id="streetName"
            name="streetName"
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={t('labels:buildingNumber')}
            id="buildingNumber"
            name="buildingNumber"
          />
        </Grid>
        <Grid item xs={12}>
          <FormikSelect
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('labels:status')}
            id="status"
            name="status"
            options={statusOptions}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PickupLocationForm;
