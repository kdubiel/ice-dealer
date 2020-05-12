import { useLazyQuery } from '@apollo/react-hooks';
import { loginSchema } from '@dnb/common';
import { Button, Link } from 'components';
import { AuthContext } from 'context';
import { Form, Formik } from 'formik';
import { LoginForm } from 'forms';
import { LoginQueryData, LoginQueryVariables, LOGIN_QUERY } from 'gql';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { UserRole } from 'enums';
import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';

const PopulatedLoginForm = () => {
  const { t } = useTranslation();
  const { dispatchToAuth, user } = useContext(AuthContext);
  const [lazyLogin, { data, loading }] = useLazyQuery<
    LoginQueryData,
    LoginQueryVariables
  >(LOGIN_QUERY, {
    onCompleted: data => {
      dispatchToAuth({ type: 'loggedIn', payload: data.login });
    },
    onError: () => {
      toast.error(t('notification:login:error'));
    },
  });

  const initialValues = {
    login: '',
    password: '',
    remember: false,
  };

  const onSubmit = ({ login, password, remember }: typeof initialValues) => {
    lazyLogin({ variables: { login, password, remember } });
  };

  if (data || user) {
    const userRole = data?.login?.role || user?.role;
    return (
      <Redirect to={userRole === UserRole.ADMIN ? '/orders' : '/myorders'} />
    );
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
      >
        {() => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <LoginForm />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  isLoading={loading}
                >
                  {t('buttons:login')}
                </Button>
              </Grid>
              <Grid container item xs={12} justify="flex-end">
                <Link to="/forgot-password">{t('labels:forgot')}</Link>
                <span>&nbsp;/&nbsp;</span>
                <Link to="/register">{t('labels:register')}</Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PopulatedLoginForm;
