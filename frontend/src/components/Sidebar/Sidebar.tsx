import { DrawerProps } from '@material-ui/core';
import React, { useContext } from 'react';
import { Profile } from './Profile';
import Styled from './styled';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { AuthContext } from 'context';
import { UserRole } from 'gql/types';
import { omit } from 'lodash';

interface Props extends DrawerProps {}

const getRoutes = (t: TFunction) => [
  {
    path: '/users',
    name: t('routes:users'),
    role: UserRole.ADMIN,
  },
  {
    path: '/pickuplocations',
    name: t('routes:pickupLocations'),
    role: UserRole.ADMIN,
  },
  {
    path: '/orders',
    name: t('routes:orders'),
    role: UserRole.ADMIN,
  },
  {
    path: '/makeorder',
    name: t('routes:makeOrder'),
    role: UserRole.CLIENT,
  },
  {
    path: '/myorders',
    name: t('routes:clientsOrders'),
    role: UserRole.CLIENT,
  },
];

const Sidebar = ({
  variant = 'persistent',
  open = false,
  onClose,
  ...otherProps
}: Props) => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  return (
    <Styled.Drawer
      onClose={onClose}
      open={open}
      variant={variant}
      {...omit(otherProps, 'theme')}
    >
      <Profile />
      <Styled.Divider />
      {getRoutes(t).map(route => {
        return route.role !== user?.role ? null : (
          <Styled.Link to={route.path} key={route.path}>
            <Styled.Link__Icon></Styled.Link__Icon>
            <Styled.Link__Text>{route.name}</Styled.Link__Text>
          </Styled.Link>
        );
      })}
    </Styled.Drawer>
  );
};

export default Sidebar;
