import { ApolloProvider } from '@apollo/react-hooks';
import { initializeYupLocales } from '@dnb/common';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { Router } from 'components';
import { AuthProvider } from 'context';
import i18n from 'i18next';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles';
import { Light, MaterialUITheme } from 'themes';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GQL_URI,
  cache: new InMemoryCache(),
  fetchOptions: {
    credentials: 'include',
  },
  credentials: 'include',
  request: operation => {
    const token = localStorage.getItem('accessToken');

    operation.setContext({
      headers: {
        Authorization: token || null,
      },
    });
  },
});

function App() {
  initializeYupLocales(i18n);

  return (
    <>
      <GlobalStyles />
      <ApolloProvider client={client}>
        <AuthProvider>
          <ThemeProvider theme={Light}>
            <MuiThemeProvider theme={MaterialUITheme}>
              <CssBaseline />
              <ToastContainer />
              <Router />
            </MuiThemeProvider>
          </ThemeProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
