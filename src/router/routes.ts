import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/MainPage.vue') },
      {
        path: '/practice-form',
        name: 'practice-form',
        meta: { requiresAuth: false },
        component: () => import('pages/PracticeFormPage.vue'),
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
      {
        path: '/teacher',
        name: 'teacher',
        component: () => import('pages/TeacherPage.vue'),
      },
      {
        path: '/student-internships',
        name: 'student-internships',
        meta: { requiresAuth: false },
        component: () => import('pages/StudentInternshipsPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
