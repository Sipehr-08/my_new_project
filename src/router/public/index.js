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
];
