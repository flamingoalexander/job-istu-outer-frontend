import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/MainPage.vue') },
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
        component: () => import('pages/ProfilePage.vue'),
      },
      {
        path: '/register',
        name: 'register',
        meta: { requiresAuth: false },
        component: () => import('pages/RegisterPage.vue'),
      },
      {
        path: '/internships',
        name: 'internships',
        meta: { requiresAuth: false },
        component: () => import('pages/InternshipsPage.vue'),
      },
      {
        path: '/companies',
        name: 'companies',
        meta: { requiresAuth: false },
        component: () => import('pages/CompaniesPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
