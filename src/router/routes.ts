import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/MainPage.vue') }],
  },
  {
    path: '/institute',
    name: 'institute',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: ':instituteId',
        name: 'institute-detail',
        component: () => import('pages/InstitutePage.vue'),
        props: true,
      },
    ],
  },
  {
    //TODO разобраться почему нужен редирект
    path: '/auth',
    name: 'auth',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'auth.index' },
    children: [
      {
        path: '',
        name: 'auth.index',
        component: () => import('pages/AuthPage.vue'),
      }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'profile.index' },
    children: [
      {
        path: '',
        name: 'profile.index',
        component: () => import('pages/PersonalAccount.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
