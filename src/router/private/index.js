import profile from '@/router/private/profile';
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
        component: () => import('@/pages/home/HomePage'),
        meta: {
          title: 'Главная',
        },
      },
      ...profile,
      {
        path: '/family',
        name: 'family',
        component: () => import('@/pages/users/UsersIndexPage'),
        meta: {
          title: 'Алиф семья',
        },
      },
      {
        path: '/family/:id',
        name: 'family.show',
        component: () => import('@/pages/users/UserShowPage'),
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
        component: () => import('@/pages/news/NewsPage'),
        meta: {
          title: 'Новости',
        },
      },
      {
        path: '/news/:id',
        name: 'news.show',
        component: () => import('@/pages/news/NewsShowPage'),
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
        component: () => import('@/pages/usefulPage/UsefulPage'),
        meta: {
          title: 'Полезно знать',
        },
        redirect: { name: 'info.products' },
        children: [
          {
            path: '/info/products',
            name: 'info.products',
            component: () => import('@/pages/usefulPage/ProductsPage'),
          },
          {
            path: '/info/sites',
            name: 'info.sites',
            component: () => import('@/pages/usefulPage/WebSitesPage'),
          },
          {
            path: '/info/bots',
            name: 'info.bots',
            component: () => import('@/pages/usefulPage/TelegramBotsPage'),
          },
          {
            path: '/info/telegram-groups',
            name: 'info.telegram-groups',
            component: () => import('@/pages/usefulPage/TelegramGroupsPage'),
          },
        ],
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
        path: '/options',
        name: 'options',
        component: () => import('@/pages/options/OptionsIndexPage'),
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
