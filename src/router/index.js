import app from '@/main.ts';
import { createRouter, createWebHistory } from 'vue-router';
import { publicRoutes } from './public';
import { privateRoutes } from './private';
const routes = [...publicRoutes, ...privateRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  document.title = 'Судимость' + (to?.meta?.title ? ' - ' + to.meta.title : '');
  const token = app.config.globalProperties?.$cookies?.get('auth');
  if ((to.name === 'applications' || to.name === 'settings') && !token) {
    next({
      name: 'auth',
    });
  } else {
    next();
  }
});

export default router;
