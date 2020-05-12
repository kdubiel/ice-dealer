import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { routes } from './routes';
import { ProtectedRoute } from 'components';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(route => {
          return (
            <Route
              key={route.path}
              path={route.path}
              render={matchProps => (
                <ProtectedRoute route={route} matchProps={matchProps} />
              )}
            />
          );
        })}
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
