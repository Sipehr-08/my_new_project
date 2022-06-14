<script setup>
  import { ref, defineAsyncComponent } from 'vue';
  import brandLogo from '@/assets/icons/logo.svg';
  import { login } from '@/services/auth.api';
  import { useRouter, useRoute } from 'vue-router';
  import NProgress from 'nprogress';

  const router = useRouter();
  const route = useRoute();
  const loading = ref(false);
  const logo = ref({
    name: 'Hr-logo',
    path: brandLogo,
  });
  const user = ref({
    email: '',
    password: '',
  });
  const loginHandler = () => {
    NProgress.start();
    loading.value = true;
    login(user.value)
      .then(() => {
        router.push({ path: route?.query?.from ?? '/' });
      })
      .finally(() => {
        NProgress.done();
        loading.value = false;
      });
  };

  //aliftech-ui components
  const AtLoginPage = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtLoginPage/AtLoginPage'));
</script>
<template>
  <div class="flex justify-center">
    <div class="mt-10">
      <at-login-page
        :title-logo="logo"
        @login="loginHandler"
        with-email
        :submit-loading="loading"
        v-model:email="user.email"
        v-model:password="user.password"
      />
    </div>
  </div>
</template>
