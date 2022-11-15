<template>
  <form action="/profile/edit" method="post">
    <h2 class="mb-5">Профиль пользователя</h2>
    <div class="mb-5">
      <label for="name">Ваше имя</label>
      <input type="text" name="name" id="name" placeholder="Имя" :value="user.name" />
    </div>
    <div class="mb-5">
      <label for="email">Ваш email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        :value="user.email"
        readonly
        class="read-only:focus:border-light bg-slate-200"
      />
    </div>
    <div class="mb-5">
      <label for="password">Ваш пароль</label>
      <input type="password" name="password" id="password" placeholder="Пароль" :value="user.password" />
    </div>
    <button
      class="w-full mb-10 px-10 sm:px-16 py-1 md:py-2 font-semibold text-lg sm:text-xl border-2 rounded-xl border-primary text-white bg-primary transition-all hover:text-primary hover:bg-white"
    >
      Сохранить изменения
    </button>
  </form>
</template>

<script setup>
  import { shallowRef } from 'vue';
  const user = shallowRef({
    id: 1,
    name: '',
    email: '',
    password: '',
  });
</script>

<style lang="postcss" scoped>
  label {
    @apply block;
  }
</style>
