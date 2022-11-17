<script setup>
  import { ref } from 'vue';
  import { registration } from '@/services/auth.api';
  // import { useRouter, useRoute } from 'vue-router';
  import NProgress from 'nprogress';
  import IllustrationsSignIn from '~/components/illustrations/SignIn';
  import { useToast } from 'vue-toastification';

  const toast = useToast();

  const loading = ref(false);
  const isSubmitted = ref(false);
  const password_yet = ref('');
  const user = ref({
    full_name: '',
    email: '',
    password: '',
  });
  const loginHandler = () => {
    isSubmitted.value = true;
    if (
      !user.value.full_name.trim() ||
      !user.value.full_name.trim() ||
      !user.value.email.trim() ||
      !user.value.password.trim() ||
      !password_yet.value.trim()
    )
      return;
    if (user.value.password !== password_yet.value) return;
    NProgress.start();
    loading.value = true;
    registration(user.value)
      .then(() => {
        toast.success('Вы успешно зарегистрировались', {
          timeout: 3000,
        });
      })
      .finally(() => {
        NProgress.done();
        loading.value = false;
      });
  };
</script>
<template>
  <section>
    <div class="flex flex-col md:flex-row items-center justify-between lg:-mt-40">
      <div class="w-full md:basis-1/2 lg:basis-3/5 -mt-20">
        <IllustrationsSignIn />
      </div>
      <div class="w-full md:basis-1/2 lg:basis-2/5">
        <h2 class="mb-4">Регистрация</h2>
        <div class="mb-4">
          <label for="name">Введите ФИО</label>
          <input type="text" name="name" id="name" placeholder="ФИО" v-model="user.full_name" />
          <small v-if="isSubmitted && !user.full_name">Поле обязательно для заполнение</small>
        </div>
        <div class="mb-4">
          <label for="email">Введите email</label>
          <input type="email" name="email" id="email" placeholder="Email" v-model="user.email" />
          <small v-if="isSubmitted && !user.email">Поле обязательно для заполнение</small>
        </div>
        <div class="mb-4">
          <label for="password">Введите пароль</label>
          <input type="password" name="password" id="password" placeholder="Пароль" v-model="user.password" />
          <small v-if="isSubmitted && !user.password">Поле обязательно для заполнение</small>
        </div>
        <div class="mb-4">
          <label for="password_yet">Подтвердите пароль</label>
          <input type="password" name="password" id="password_yet" placeholder="Пароль" v-model="password_yet" />
          <small v-if="isSubmitted && !password_yet">Поле обязательно для заполнение</small>
          <small v-if="isSubmitted && user.password && password_yet && password_yet !== user.password">
            Пароли не совпадают
          </small>
        </div>
        <button
          @click="loginHandler"
          class="px-10 w-full mb-4 sm:px-16 py-1 md:py-2 font-semibold text-lg sm:text-xl border-2 rounded-xl border-primary text-white bg-primary transition-all hover:text-primary hover:bg-white"
        >
          <img v-show="loading" class="w-8 -my-4 -ml-10 mr-2" src="../../assets/spinner.gif" alt="" />
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
