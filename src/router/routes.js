import {
  Root,
  Test,
  Detail,
  User,
  UserDetail,
  NotFound,
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
  {
    path: '*',
    component: NotFound,
  }
];

export default routes;
