<script setup>
  import { defineAsyncComponent, reactive, ref, watch } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  const currentTab = ref('main');
  const tabItems = reactive([
    {
      title: 'Мои данные',
      value: 'main',
    },
    {
      title: 'Опоздания',
      value: 'lateness',
    },
    {
      title: 'Отпуск',
      value: 'vacation',
    },
    {
      title: 'Конвертация в $',
      value: 'conversion',
    },
    {
      title: 'Авансы',
      value: 'advances',
    },
    {
      title: 'Зарплата',
      value: 'contract',
    },
    {
      title: 'Фидбеки',
      value: 'feedbacks',
    },
    {
      title: 'Оценка вежливости',
      value: 'politeness-survey',
    },
  ]);
  const store = useStore();
  const router = useRouter();
  const user = store.state.core?.app?.auth_user;

  watch(currentTab, () => router.push({ name: `profile.${currentTab.value}` }));

  const avatarPath = avatar_path => {
    return `${process.env.VUE_APP_STORAGE_API}${avatar_path}`;
  };

  const AtTabs = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtTabs/AtTabs'));
</script>
<template>
  <div class="pt-10">
    <div class="flex items-center">
      <div>
        <img
          class="h-60 border-2 border-primary-500 rounded-full"
          :src="avatarPath(user.avatar_path)"
          :alt="user.nickName"
        />
      </div>
      <div class="ml-10 -mt-6">
        <h1 class="header-title-lg mb-4">{{ user.fullName }}</h1>
        <p class="text-xl text-gray-500">{{ user.email }}</p>
      </div>
    </div>
    <div class="mt-4">
      <div class="mb-10">
        <at-tabs v-model="currentTab" :items="tabItems"></at-tabs>
      </div>
      <router-view />
    </div>
  </div>
</template>
