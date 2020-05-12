import { Grid } from '@material-ui/core';
import { FormikTextField } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';

const BaseOrderForm = () => {
  const { t } = useTranslation();

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12}>
          <FormikTextField
            type="number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('labels:amount')}
            id="amount"
            name="amount"
            inputProps={{
              step: 1,
              min: 0,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BaseOrderForm;
