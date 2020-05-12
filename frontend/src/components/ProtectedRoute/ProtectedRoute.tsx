import { Route as RouteType } from 'components';
import { AuthContext } from 'context';
import React, { useContext } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

interface ProtectedRouteProps {
  route: RouteType;
  matchProps: RouteComponentProps;
}

const ProtectedRoute = ({
  route: { layout: Layout, component: Component, role },
  matchProps,
}: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);

  if ((role && !user) || (role && user && !role.includes(user.role))) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout>
      <Component {...matchProps} />
    </Layout>
  );
};

export default ProtectedRoute;
