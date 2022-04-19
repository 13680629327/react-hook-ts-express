import SystemFrame from '@/components/SystemFrame';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import User from '@/pages/User';
import Staff from '@/pages/Staff';

const routes: any = [
  {
    path: '/login',
    component: Login,
    routes: [],
  },
  {
    path: '/register',
    component: Register,
    routes: [],
  },
  {
    path: '/',
    component: SystemFrame,
    // exact: true,
    routes: [
      {
        path: '/home',
        component: Home,
        routes: [],
      },
      {
        path: '/user',
        component: User,
        routes: [],
      },
      {
        path: '/staff',
        component: Staff,
        routes: [],
      },
    ],
  },
];

export default routes;
