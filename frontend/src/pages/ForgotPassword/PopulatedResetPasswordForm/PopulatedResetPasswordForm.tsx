import { useMutation } from '@apollo/react-hooks';
import { PasswordValidationSchema } from '@dnb/common';
import { Grid } from '@material-ui/core';
import { Button } from 'components';
import { Form, Formik } from 'formik';
import { PasswordForm } from 'forms';
import {
  ResetPasswordMutationData,
  ResetPasswordMutationVariables,
  RESET_PASSWORD_MUTATION,
} from 'gql';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  token: string;
}

const PopulatedResetPasswordForm = ({ token }: Props) => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const [lazyResetPassword, { loading }] = useMutation<
    ResetPasswordMutationData,
    ResetPasswordMutationVariables
  >(RESET_PASSWORD_MUTATION, {
    onCompleted: () => {
      toast.success(t('notification:reset-password:success'));
      push('/login');
    },
    onError: () => {
      toast.error(t('notification:reset-password:error'));
    },
  });

  const initialValues = {
    token: token,
    password: '',
    confirm_password: '',
  };

  const onSubmit = (data: typeof initialValues) => {
    lazyResetPassword({
      variables: { resetPasswordInput: data },
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={PasswordValidationSchema(t, true)}
      >
        {() => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <PasswordForm />
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

export default PopulatedResetPasswordForm;
