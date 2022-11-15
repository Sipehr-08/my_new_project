<template>
  <div class="flex flex-col md:flex-row text-xs md:text-base whitespace-nowrap">
    <ProfileUserActions class="basis-1/4 md:self-baseline" :actions="actions" />
    <router-view v-slot="{ Component }">
      <div class="basis-3/4">
        <component :is="Component"></component>
      </div>
    </router-view>
  </div>
</template>

<script setup>
  import ProfileUserActions from '~/components/profile/Actions';
  import { ref } from 'vue';
  const actions = ref([
    { id: 1, name: 'Статус заявки', component: 'ProfileUserApplication', route: 'applications' },
    { id: 2, name: 'Настройки аккаунта', component: 'ProfileUserSettings', route: 'settings' },
    { id: 3, name: 'Выйти', component: '', route: 'exit' },
  ]);
</script>
