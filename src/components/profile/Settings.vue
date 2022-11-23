<template>
  <div>
    <h2 class="mb-5">Профиль пользователя</h2>
    <div class="mb-4">
      <label for="name">ФИО</label>
      <input
        :style="isSubmitted && !user.full_name ? 'border-color: red' : ''"
        type="text"
        name="name"
        id="name"
        placeholder="ФИО"
        v-model="user.full_name"
      />
      <small class="text-red-500 block" v-if="isSubmitted && !user.full_name">Поле обязательно для заполнение</small>
    </div>
    <div class="mb-4">
      <label for="newEmail">Эл.почта</label>
      <input
        :style="isSubmitted && !user.email ? 'border-color: red' : ''"
        type="email"
        name="email"
        id="newEmail"
        placeholder="Email"
        v-model="user.email"
      />
      <small class="text-red-500 block" v-if="isSubmitted && !user.email">Поле обязательно для заполнение</small>
    </div>
    <div class="mb-4">
      <label for="oldPassword">Старый пароль</label>
      <input
        :style="isSubmitted && !user.old_password ? 'border-color: red' : ''"
        type="password"
        name="password"
        id="oldPassword"
        placeholder="********"
        v-model="user.old_password"
      />
      <small class="text-red-500 block" v-if="isSubmitted && !user.old_password">Поле обязательно для заполнение</small>
    </div>
    <div class="mb-4">
      <label for="newPassword">Новый пароль</label>
      <input
        :style="isSubmitted && !user.password ? 'border-color: red' : ''"
        type="password"
        id="newPassword"
        name="newPassword"
        placeholder="********"
        v-model="user.password"
      />
      <small class="text-red-500 block" v-if="isSubmitted && !user.password">Поле обязательно для заполнение</small>
    </div>
    <div class="mb-4">
      <label for="password_yet">Подтвердите пароль</label>
      <input
        :style="isSubmitted && !password_yet ? 'border-color: red' : ''"
        type="password"
        name="password_yet"
        id="password_yet"
        placeholder="********"
        v-model="password_yet"
      />
      <small class="text-red-500 block" v-if="isSubmitted && !password_yet">Поле обязательно для заполнение</small>
      <small
        class="text-red-500 block"
        v-if="isSubmitted && user.password && password_yet && password_yet !== user.password"
      >
        Пароли не совпадают
      </small>
    </div>
    <button
      :disabled="loading"
      @click="changeData"
      class="px-10 flex justify-center items-center w-full mb-10 sm:px-16 py-1 md:py-2 text-white font-semibold text-lg sm:text-xl border-2 rounded-xl border-primary bg-primary transition-all hover:text-primary hover:bg-white"
    >
      <img v-show="loading" class="w-8 -my-4 -ml-10 mr-2" src="../../assets/spinner.gif" alt="" />
      Сохранить изменения
    </button>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useToast } from 'vue-toastification';

  const toast = useToast();
  import { changeUserData } from '@/services/auth.api';
  const isSubmitted = ref(false);
  const loading = ref(false);
  const password_yet = ref('');
  const user = ref({
    full_name: '',
    email: '',
    old_password: '',
    password: '',
  });

  onMounted(() => {
    window.scrollTo(0, 0);
  });

  const changeData = () => {
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
    loading.value = true;
    changeUserData(user.value)
      .then(() => {
        toast.success('Успешно изменено', {
          timeout: 3000,
        });
      })
      .finally(() => {
        loading.value = false;
      });
  };
</script>

<style lang="postcss" scoped>
  label {
    @apply block;
  }
</style>
