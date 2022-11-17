<script setup>
  import { ref } from 'vue';
  import { login } from '@/services/auth.api';
  import { useRouter } from 'vue-router';
  import IllustrationsSignIn from '~/components/illustrations/SignIn';

  const router = useRouter();
  const loading = ref(false);
  const isSubmitted = ref(false);
  const user = ref({
    email: '',
    password: '',
  });
  const loginHandler = () => {
    isSubmitted.value = true;
    if (!user.value.email || !user.value.password) return;
    loading.value = true;
    login(user.value)
      .then(() => {
        router.push({ name: 'applications' });
      })
      .finally(() => {
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
        <h2 class="mb-10">Вход</h2>
        <div class="mb-4">
          <label for="email">Введите email</label>
          <input
            :style="isSubmitted && !user.email ? 'border-color: red' : ''"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            v-model="user.email"
          />
          <small v-if="isSubmitted && !user.email">Поле обязательно для заполнение</small>
        </div>
        <div class="mb-4">
          <label for="password">Введите пароль</label>
          <input
            :style="isSubmitted && !user.password ? 'border-color: red' : ''"
            type="password"
            name="password"
            id="password"
            placeholder="Пароль"
            v-model="user.password"
          />
          <small v-if="isSubmitted && !user.password">Поле обязательно для заполнение</small>
        </div>
        <button
          :disabled="loading"
          @click="loginHandler"
          class="px-10 flex justify-center items-center w-full mb-10 sm:px-16 py-1 md:py-2 text-white font-semibold text-lg sm:text-xl border-2 rounded-xl border-primary bg-primary transition-all hover:text-primary hover:bg-white"
        >
          <img v-show="loading" class="w-8 -my-4 -ml-10 mr-2" src="../../assets/spinner.gif" alt="" />
          Войти
        </button>
        <div class="text-center">
          <p>
            У вас нет учетной записы?
            <router-link :to="{ name: 'registration' }" class="underline text-primary">Регистрация</router-link>
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
