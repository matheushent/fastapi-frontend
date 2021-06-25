import Vue from 'vue';
import Router from 'vue-router';

import RouterComponent from './components/RouterComponent.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "start" */ './views/main/Start.vue'),
      children: [
        {
          path: 'login',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
        },
        {
          path: 'recover-password',
          component: () => import(/* webpackChunkName: "recover-password" */ './views/PasswordRecovery.vue'),
        },
        {
          path: 'reset-password',
          component: () => import(/* webpackChunkName: "reset-password" */ './views/ResetPassword.vue'),
        },
        {
          path: 'main',
          component: () => import(/* webpackChunkName: "main" */ './views/main/Main.vue'),
          children: [
            {
              path: 'dashboard',
              component: () => import(/* webpackChunkName: "main-dashboard" */ './views/main/Dashboard.vue'),
            },
            {
              path: 'profile',
              component: RouterComponent,
              redirect: 'profile/view',
              children: [
                {
                  path: 'view',
                  component: () => import(
                    /* webpackChunkName: "main-profile" */ './views/main/profile/UserProfile.vue'),
                },
                {
                  path: 'edit',
                  component: () => import(
                    /* webpackChunkName: "main-profile-edit" */ './views/main/profile/UserProfileEdit.vue'),
                },
                {
                  path: 'password',
                  component: () => import(
                    /* webpackChunkName: "main-profile-password" */ './views/main/profile/UserProfileEditPassword.vue'),
                },
              ],
            },
            {
              path: 'admin',
              component: () => import(/* webpackChunkName: "main-admin" */ './views/main/admin/Admin.vue'),
              children: [
                {
                  path: 'users',
                  redirect: 'users/all',
                },
                {
                  path: 'users/all',
                  component: () => import(
                    /* webpackChunkName: "main-admin-users" */ './views/main/admin/AdminUsers.vue'),
                },
                {
                  path: 'users/edit/:id',
                  name: 'main-admin-users-edit',
                  component: () => import(
                    /* webpackChunkName: "main-admin-users-edit" */ './views/main/admin/EditUser.vue'),
                },
                {
                  path: 'users/create',
                  name: 'main-admin-users-create',
                  component: () => import(
                    /* webpackChunkName: "main-admin-users-create" */ './views/main/admin/CreateUser.vue'),
                },
                {
                  path: 'permissions',
                  component: () => import('./views/main/admin/Permissions.vue'),
                },
                {
                  path: 'permissions/create',
                  component: () => import('./views/main/admin/CreatePermission.vue'),
                },
              ],
            },
            {
              path: 'resources',
              component: RouterComponent,
              children: [
                {
                  path: 'applications',
                  redirect: 'applications/all',
                },
                {
                  path: 'applications/all',
                  component: () => import('./views/main/resources/ApplicationsList.vue'),
                },
                {
                  path: 'applications/edit/:id',
                  name: 'main-resources-applications-edit',
                  component: () => import(
                    './views/main/resources/EditApplication.vue'),
                },
                {
                  path: 'job-scripts',
                  redirect: 'job-scripts/all',
                },
                {
                  path: 'job-scripts/all',
                  component: () => import('./views/main/resources/JobScriptsList.vue'),
                },
                {
                  path: 'job-scripts/edit/:id',
                  name: 'main-resources-job-scripts-edit',
                  component: () => import(
                    './views/main/resources/EditJobScript.vue'),
                },
                {
                  path: 'job-submissions',
                  redirect: 'job-submissions/all',
                },
                {
                  path: 'job-submissions/all',
                  component: () => import('./views/main/resources/JobSubmissionsList.vue'),
                },
                {
                  path: 'job-submissions/edit/:id',
                  name: 'main-resources-job-submissions-edit',
                  component: () => import(
                    './views/main/resources/EditJobSubmission.vue'),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/*', redirect: '/',
    },
  ],
});
