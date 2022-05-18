export default [
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
        component: () => import('@/pages/profile/detail/LatenessPage'),
      },
      {
        path: '/profile/vacation',
        name: 'profile.vacation',
        component: () => import('@/pages/profile/detail/VacationTrackersPage'),
      },
      {
        path: '/profile/conversion',
        name: 'profile.conversion',
        component: () => import('@/pages/profile/detail/ConversionPage'),
      },
      {
        path: '/profile/advances',
        name: 'profile.advances',
        component: () => import('@/pages/profile/detail/AdvancesPage'),
      },
      {
        path: '/profile/contract',
        name: 'profile.contract',
        component: () => import('@/pages/profile/detail/ContractsPage'),
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
];
