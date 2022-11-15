<template>
  <div>
    <Header />
    <main class="app-container min-h-screen px-4 lg:px-6 mx-auto pointer-events-auto">
      <AuthPage v-if="$route.name === 'auth'" />
      <ChangePassword v-else-if="$route.name === 'new-password'" />
      <ResetPassword v-else-if="$route.name === 'reset'" />
      <RegisterPage v-else />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
  import AuthPage from '@/pages/auth/AuthPage';
  import RegisterPage from '@/pages/auth/RegisterPage';
  import ChangePassword from '@/pages/auth/ChangePasswordPage';
  import ResetPassword from '@/pages/auth/ResetPasswordPage';
  import Header from '@/components/global/Header';
  import FooterComponent from '@/components/global/FooterComponent';
  export default {
    name: 'AuthLayout.vue',
    components: { RegisterPage, FooterComponent, Header, AuthPage, ChangePassword, ResetPassword },
  };
</script>
