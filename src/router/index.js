import app from '@/main.js';
import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import { publicRoutes } from './public';
import { privateRoutes } from './private';
const routes = [...publicRoutes, ...privateRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  document.title = 'Alif - HR' + (to?.meta?.title ? ' - ' + to.meta.title : '');
  const token = app.config.globalProperties?.$cookies?.get('auth');
  if (token) {
    if (!store.state?.core?.app) await store?.dispatch('core/getApp');
    next();
  } else {
    if (to.name !== 'auth') {
      next({
        name: 'auth',
      });
    } else {
      next();
    }
  }
});

export default router;
