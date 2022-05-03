import { lazy } from 'react';

const routes: any = [
  {
    path: '/login',
    component: lazy(() => import(/* webpackChunkName: 'Login' */ '@/pages/Login')),
    routes: [],
  },
  {
    path: '/register',
    component: lazy(() => import(/* webpackChunkName: 'Register' */ '@/pages/Register')),
    routes: [],
  },
  {
    path: '/',
    component: lazy(() => import(/* webpackChunkName: 'SystemFrame' */ '@/components/SystemFrame')),
    // exact: true,
    routes: [
      {
        path: '/home',
        component: lazy(() => import(/* webpackChunkName: 'Home' */ '@/pages/Home')),
        routes: [],
      },
      {
        path: '/user',
        component: lazy(() => import(/* webpackChunkName: 'User' */ '@/pages/User')),
        routes: [],
      },
      {
        path: '/staff',
        component: lazy(() => import(/* webpackChunkName: 'Staff' */ '@/pages/Staff')),
        routes: [],
      },
      {
        path: '/attendance',
        component: lazy(() => import(/* webpackChunkName: 'Attendance' */ '@/pages/Attendance')),
        routes: [],
      },
    ],
  },
];

export default routes;
