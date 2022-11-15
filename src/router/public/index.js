export const publicRoutes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import(`@/layouts/AuthLayout`),
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
      title: 'Вход',
    },
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import(`@/layouts/AuthLayout`),
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
      title: 'Регистрация',
    },
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import(`@/layouts/AuthLayout`),
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
      title: 'Сброс пароля',
    },
  },
  {
    path: '/new-password',
    name: 'new-password',
    component: () => import(`@/layouts/AuthLayout`),
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
      title: 'Сброс пароля',
    },
  },
];
