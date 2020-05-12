import { UserRole } from 'enums';
import { MainLayout, MinimalLayout } from 'layouts';
import {
  ClientsOrders,
  ForgotPassword,
  Login,
  MakeOrder,
  MyOrders,
  PickupLocations,
  Register,
  Users,
} from 'pages';

interface BaseRoute {
  path: string;
  exact?: Boolean;
  component: React.ElementType;
  layout: React.ElementType;
  role?: UserRole[];
}

const adminRoutes: BaseRoute[] = [
  {
    path: '/orders',
    component: ClientsOrders,
    layout: MainLayout,
    role: [UserRole.ADMIN],
  },
  {
    path: '/users',
    component: Users,
    layout: MainLayout,
    role: [UserRole.ADMIN],
  },
  {
    path: '/pickuplocations',
    component: PickupLocations,
    layout: MainLayout,
    role: [UserRole.ADMIN],
  },
];

const clientRoutes: BaseRoute[] = [
  {
    path: '/makeorder',
    component: MakeOrder,
    layout: MainLayout,
    role: [UserRole.CLIENT],
  },
  {
    path: '/myorders',
    component: MyOrders,
    layout: MainLayout,
    role: [UserRole.CLIENT],
  },
];

const openedRoutes: BaseRoute[] = [
  {
    path: '/login',
    component: Login,
    layout: MinimalLayout,
  },
  {
    path: '/register',
    component: Register,
    layout: MinimalLayout,
  },
  {
    path: '/forgot-password/:token?',
    component: ForgotPassword,
    layout: MinimalLayout,
  },
];

export type Route = BaseRoute;

export const routes: Route[] = [
  ...adminRoutes,
  ...clientRoutes,
  ...openedRoutes,
];
