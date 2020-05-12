import { useMutation } from '@apollo/react-hooks';
import { BaseUserFormSchema, PasswordValidationSchema } from '@dnb/common';
import { Grid } from '@material-ui/core';
import { Button, Link } from 'components';
import { Form, Formik } from 'formik';
import { BaseUserForm, PasswordForm } from 'forms';
import {
  RegisterMutationData,
  RegisterMutationVariables,
  REGISTER_MUTATION,
} from 'gql';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const PopulatedRegisterForm = () => {
  const { t } = useTranslation();
  const [register, { data, loading }] = useMutation<
    RegisterMutationData,
    RegisterMutationVariables
  >(REGISTER_MUTATION, {
    onCompleted: () => {
      toast.success(t('notification:signup:success'));
    },
    onError: () => {
      toast.error(t('notification:signup:error'));
    },
  });

  const initialValues = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirm_password: '',
  };

  const onSubmit = (data: typeof initialValues) => {
    register({ variables: { registerInput: data } });
  };

  if (data) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={BaseUserFormSchema().concat(
          PasswordValidationSchema(t, true)
        )}
      >
        {() => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <BaseUserForm />
                <PasswordForm required />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  isLoading={loading}
                >
                  {t('buttons:signup')}
                </Button>
              </Grid>
              <Grid item container xs={12} justify="flex-end">
                <Link to="/login">{t('labels:signin')}</Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PopulatedRegisterForm;
