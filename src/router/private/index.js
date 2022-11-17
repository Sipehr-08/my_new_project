// import profile from '@/router/private/profile';
export const privateRoutes = [
  {
    path: '/home',
    name: 'core',
    component: () => import('@/layouts/HomeLayout'),
    meta: {
      title: 'Главная',
    },
    redirect: { name: 'home' },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/pages/home/HomePage'),
        meta: {
          title: 'Главная',
        },
      },
      {
        path: '/application',
        name: 'application',
        component: () => import('@/pages/application/ApplicationPage'),
        meta: {
          title: 'Заявка',
        },
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/pages/user/UserProfilePage'),
        meta: {
          title: 'Заявка',
        },
        redirect: { name: 'applications' },
        children: [
          {
            path: '/profile/applications',
            name: 'applications',
            component: () => import('@/components/profile/Application'),
            meta: {
              title: 'Заявки',
            },
          },
          {
            path: '/profile/settings',
            name: 'settings',
            component: () => import('@/components/profile/Settings'),
            meta: {
              title: 'Настройки',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/auth',
  },
];
