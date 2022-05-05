<template>
  <div class="flex w-full h-screen p-4 bg-gray-100">
    <AuthPage class="m-auto" />
  </div>
</template>

<script>
  import AuthPage from '@/pages/auth/AuthPage';
  export default {
    name: 'AuthLayout.vue',
    components: { AuthPage },
  };
</script>
