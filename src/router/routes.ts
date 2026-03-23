import type { RouteRecordRaw } from 'vue-router';
import { UserRoles } from 'src/constants';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/MainPage.vue') },
      {
        path: '/practice-form',
        name: 'practice-form',
        meta: { roles: [UserRoles.CompanyRepresentative], requiresAuth: true },
        component: () => import('pages/PracticeFormPage.vue'),
      },
      {
        path: '/login',
        name: 'login',
        meta: { requiresAuth: false },
        component: () => import('pages/AuthPage.vue'),
      },
      {
        path: '/internships',
        name: 'internships',
        meta: { roles: [UserRoles.Student], requiresAuth: true },
        component: () => import('pages/InternshipsPage.vue'),
      },
      {
        path: '/companies',
        name: 'companies',
        meta: {
          roles: [
            UserRoles.Student,
            UserRoles.Teacher,
            UserRoles.Directorate,
            UserRoles.CompanyRepresentative,
            UserRoles.CareerCenter,
          ],
          requiresAuth: true,
        },
        component: () => import('pages/CompaniesPage.vue'),
      },
      {
        path: '/practice/:id',
        name: 'practice-detail',
        meta: { roles: [UserRoles.Student], requiresAuth: true },
        component: () => import('pages/InternshipDetailPage.vue'),
      },
      {
        path: '/teacher',
        name: 'teacher',
        component: () => import('pages/TeacherPage.vue'),
        meta: { roles: [UserRoles.Teacher], requiresAuth: true },
      },
      {
        path: '/student-internships',
        name: 'student-internships',
        meta: { roles: [UserRoles.Student], requiresAuth: true },
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
