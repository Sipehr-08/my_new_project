export const privateRoutes = [
  {
    path: '/',
    name: 'core',
    component: () => import('@/layouts/HomeLayout'),
    meta: {
      title: 'Главная',
    },
    redirect: { name: 'home' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/components/core/NotFoundErrorPage'),
        meta: {
          title: 'Главная',
        },
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/pages/profile/ProfilePage'),
        meta: {
          title: 'Профиль',
        },
        redirect: { name: 'profile.main' },
        children: [
          {
            path: '/profile/main',
            name: 'profile.main',
            component: () => import('@/pages/profile/detail/MainPage'),
          },
          {
            path: '/profile/lateness',
            name: 'profile.lateness',
            component: () => import('@/components/core/NotFoundErrorPage'),
          },
          {
            path: '/profile/vacation',
            name: 'profile.vacation',
            component: () => import('@/components/core/NotFoundErrorPage'),
          },
          {
            path: '/profile/conversion',
            name: 'profile.conversion',
            component: () => import('@/components/core/NotFoundErrorPage'),
          },
          {
            path: '/profile/advances',
            name: 'profile.advances',
            component: () => import('@/components/core/NotFoundErrorPage'),
          },
          {
            path: '/profile/contract',
            name: 'profile.contract',
            component: () => import('@/components/core/NotFoundErrorPage'),
          },
          {
            path: '/profile/feedbacks',
            name: 'profile.feedbacks',
            component: () => import('@/components/core/NotFoundErrorPage'),
          },
          {
            path: '/profile/politeness-survey',
            name: 'profile.politeness-survey',
            component: () => import('@/components/core/NotFoundErrorPage'),
          },
        ],
      },
      {
        path: '/family',
        name: 'family',
        component: () => import('@/pages/users/UsersIndexPage'),
        meta: {
          title: 'Алиф семья',
        },
      },
      {
        path: '/team',
        name: 'team',
        component: () => import('@/components/core/NotFoundErrorPage'),
        meta: {
          title: 'Моя команда',
        },
      },
      {
        path: '/news',
        name: 'news',
        component: () => import('@/components/core/NotFoundErrorPage'),
        meta: {
          title: 'Новости',
        },
      },
      {
        path: '/events',
        name: 'events',
        component: () => import('@/components/core/NotFoundErrorPage'),
        meta: {
          title: 'События',
        },
      },
      {
        path: '/culture',
        name: 'culture',
        component: () => import('@/components/core/NotFoundErrorPage'),
        meta: {
          title: 'Культура',
        },
      },
      {
        path: '/rotation',
        name: 'rotation',
        component: () => import('@/components/core/NotFoundErrorPage'),
        meta: {
          title: 'Ротации',
        },
      },
      {
        path: '/info',
        name: 'info',
        component: () => import('@/components/core/NotFoundErrorPage'),
        meta: {
          title: 'Полезно знать',
        },
      },
      {
        path: '/game',
        name: 'game',
        component: () => import('@/components/core/NotFoundErrorPage'),
        meta: {
          title: 'Узнайте коллег',
        },
      },
      {
        path: '/pray-time',
        name: 'pray-time',
        component: () => import('@/components/core/NotFoundErrorPage'),
        meta: {
          title: 'Время намаза',
        },
      },
      {
        path: '/option',
        name: 'option',
        component: () => import('@/components/core/NotFoundErrorPage'),
        meta: {
          title: 'Опционы',
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/auth',
  },
];
