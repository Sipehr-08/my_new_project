<script setup>
  import { ref } from 'vue';
  import { registration } from '@/services/auth.api';
  // import { useRouter, useRoute } from 'vue-router';
  import NProgress from 'nprogress';
  import IllustrationsSignIn from '~/components/illustrations/SignIn';

  const loading = ref(false);
  const user = ref({
    full_name: '',
    email: '',
    password: '',
  });
  const loginHandler = () => {
    NProgress.start();
    loading.value = true;
    registration(user.value)
      .then(() => {})
      .finally(() => {
        NProgress.done();
        loading.value = false;
      });
  };
</script>
<template>
  <section>
    <div class="flex flex-col md:flex-row items-center justify-between -mt-20 lg:-mt-40">
      <div class="w-full md:basis-1/2 lg:basis-3/5">
        <IllustrationsSignIn />
      </div>
      <div class="w-full md:basis-1/2 lg:basis-2/5">
        <h2 class="mb-10">Регистрация</h2>
        <div class="mb-5">
          <label for="name">Введите имя</label>
          <input type="text" name="name" id="name" placeholder="Имя" v-model="user.full_name" />
          <small v-if="nameError">{{ nameError }}</small>
        </div>
        <div class="mb-5">
          <label for="email">Введите email</label>
          <input type="email" name="email" id="email" placeholder="Email" v-model="user.email" />
          <small v-if="emailError">{{ emailError }}</small>
        </div>
        <div class="mb-5">
          <label for="password">Введите пароль</label>
          <input type="password" name="password" id="password" placeholder="Пароль" v-model="user.password" />
          <small v-if="passwordError">{{ passwordError }}</small>
        </div>
        <div class="mb-5 text-right">
          <RouterLink to="/reset" class="underline text-primary">Забыли пароль?</RouterLink>
        </div>
        <button
          @click="loginHandler"
          class="px-10 w-full mb-10 sm:px-16 py-1 md:py-2 font-semibold text-lg sm:text-xl border-2 rounded-xl border-primary text-white bg-primary transition-all hover:text-primary hover:bg-white"
        >
          Зарегистрироваться
        </button>
        <div class="text-center">
          <p>
            У вас есть учетная запись?
            <RouterLink to="/auth" class="underline text-primary">Вход</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="postcss" scoped>
  small {
    @apply block text-red-500;
  }
</style>
