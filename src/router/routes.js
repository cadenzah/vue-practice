import {
  Root,
  Test,
  Detail,
  User,
  UserDetail,
} from '../pages';

const routes = [
  {
    path: '/',
    component: Root,
  },
  {
    path: '/test',
    component: Test,
  },
  {
    path: '/detail/:pageId',
    component: Detail,
  },
  {
    path: '/user',
    component: User,
    children: [
      {
        path: ':userId',
        component: UserDetail,
      },
    ],
  },
];

export default routes;
