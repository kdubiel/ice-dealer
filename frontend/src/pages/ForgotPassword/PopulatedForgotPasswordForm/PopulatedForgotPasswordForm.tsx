import { useMutation } from '@apollo/react-hooks';
import { EmailFormSchema } from '@dnb/common';
import { Grid } from '@material-ui/core';
import { Button } from 'components';
import { Form, Formik } from 'formik';
import { ForgotPasswordForm } from 'forms';
import {
  RequestPasswordResetMutationData,
  RequestPasswordResetMutationVariables,
  REQUEST_PASSWORD_RESET_MUTATION,
} from 'gql';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {}

const PopulatedForgotPasswordForm = (_props: Props) => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const [lazyRequestPasswordReset, { loading }] = useMutation<
    RequestPasswordResetMutationData,
    RequestPasswordResetMutationVariables
  >(REQUEST_PASSWORD_RESET_MUTATION, {
    onCompleted: () => {
      toast.success(t('notification:forgot-password:success'));
      push('/login');
    },
    onError: () => {
      toast.error(t('notification:forgot-password:error'));
    },
  });

  const initialValues = {
    email: '',
  };

  const onSubmit = ({ email }: typeof initialValues) => {
    lazyRequestPasswordReset({
      variables: { requestPasswordResetInput: { email } },
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={EmailFormSchema}
      >
        {() => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ForgotPasswordForm />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  isLoading={loading}
                >
                  {t('buttons:accept')}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PopulatedForgotPasswordForm;
