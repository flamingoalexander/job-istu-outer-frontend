import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MainPage.vue') },
      {
        path: '/institute/:instituteId',
        name: 'institute',
        meta: { requiresAuth: false },
        component: () => import('pages/InstitutePage.vue'),
        props: true,
      },
      {
        path: '/auth',
        name: 'auth',
        meta: { requiresAuth: false },
        component: () => import('pages/AuthPage.vue'),
      },
      {
        path: '/profile',
        name: 'profile',
        meta: { requiresAuth: true },
        component: () => import('pages/PersonalAccount.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
