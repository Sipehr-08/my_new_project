<script setup>
  import { defineAsyncComponent } from 'vue';
  import { useStore } from 'vuex';
  import { ref } from 'vue';
  import { logout } from '@/services/auth.api';
  import Logo from '@/assets/icons/logo.svg';
  import HomeIcon from '@/assets/icons/home.svg';
  import FamilyIcon from '@/assets/icons/family.svg';
  import EventIcon from '@/assets/icons/events.svg';
  import NewsIcon from '@/assets/icons/news.svg';
  import TeamIcon from '@/assets/icons/team.svg';
  import GameIcon from '@/assets/icons/game.svg';
  import CultureIcon from '@/assets/icons/culture.svg';
  import PrayIcon from '@/assets/icons/namaz.svg';
  import RotationIcon from '@/assets/icons/turnover.svg';
  import InfoIcon from '@/assets/icons/info.svg';
  import OptionIcon from '@/assets/icons/options.svg';
  import NProgress from 'nprogress';

  const logoutHandler = () => {
    NProgress.start();
    logout().finally(() => {
      NProgress.done();
    });
  };

  const items = ref([
    {
      name: 'home',
      title: 'Главная',
      icon: HomeIcon,
    },
    {
      name: 'family',
      title: 'Алиф Семья',
      icon: FamilyIcon,
    },
    {
      name: 'team',
      title: 'Моя команда',
      icon: TeamIcon,
    },
    {
      name: 'news',
      title: 'Новости',
      icon: NewsIcon,
    },
    {
      name: 'events',
      title: 'События',
      icon: EventIcon,
    },
    {
      name: 'culture',
      title: 'Культура',
      icon: CultureIcon,
    },
    {
      name: 'rotation',
      title: 'Ротации',
      icon: RotationIcon,
    },
    {
      name: 'info',
      title: 'Полезно знать',
      icon: InfoIcon,
    },
    {
      name: 'game',
      title: 'Узнайте коллег',
      icon: GameIcon,
    },
    {
      name: 'pray-time',
      title: 'Время намаза',
      icon: PrayIcon,
    },
  ]);
  const store = useStore();
  const user = store.state.core.app.auth_user;
  const userAvatar = `${process.env.VUE_APP_STORAGE_API}${store.state.core.app.auth_user.avatar_path}`;

  const SearchIcon = defineAsyncComponent(() => import('@heroicons/vue/outline/SearchIcon'));
  const LogoutIcon = defineAsyncComponent(() => import('@heroicons/vue/outline/LogoutIcon'));
</script>
<template>
  <div class="flex flex-shrink-0 items-start">
    <div style="min-width: 17rem" class="flex flex-col min-w-max w-72 pt-10 pb-4 mr-16">
      <div class="flex items-center flex-shrink-0 px-10">
        <router-link to="home">
          <img class="h-11 w-auto cursor-pointer" :src="Logo" alt="logo" />
        </router-link>
      </div>
      <div class="h-0 flex-1 flex flex-col overflow-y-auto mt-14">
        <div class="flex-1 h-0 overflow-y-auto">
          <router-link v-for="(item, index) in items" :key="index" :to="{ path: `/${item.name}` }">
            <div
              :class="{ 'sidebar-active text-black': item.name === $route.name }"
              class="flex items-center cursor-pointer block ml-7 px-3 py-3 rounded-lg sidebar-hover"
            >
              <img class="h-7 w-6 mr-5" :src="item.icon" alt="" />
              <span :class="{ 'text-gray-600': item.name === $route.name }" class="text-gray-400 font-semibold">
                {{ item.title }}
              </span>
            </div>
          </router-link>
          <div
            @click="logoutHandler"
            class="flex hover:underline items-center cursor-pointer block ml-7 px-3 py-3 rounded-lg sidebar-hover"
          >
            <LogoutIcon class="w-6 h-6 mr-5 text-primary-500" />
            <span class="text-gray-600 font-semibold">Выход</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full overflow-auto pl-1 pr-16" style="height: 100vh">
      <div class="flex w-full mt-10">
        <div class="xl:w-3/5 w-1/2">
          <div>
            <div class="flex justify-between items-center"></div>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 flex items-center pointer-events-none left-0 pl-5">
                <SearchIcon class="w-5 h-5 text-gray-400" />
              </div>
              <div class="w-full">
                <input
                  class="transition duration-200 shadow-sm block h-12 w-full placeholder-opacity-100 placeholder-gray-400 font-semibold dark:text-white dark:placeholder-gray-400 text-gray-700 placeholder-gray-400 focus:ring-blue-300 focus:border-primary-500 border-gray-300 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-600 dark:focus:border-primary-600 dark:border-gray-600 rounded-md pl-14 search-input-bg"
                  name=""
                  placeholder="Искать"
                  id="at-input-8f32476a13"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between xl:w-2/5 w-1/2">
          <router-link :to="{ name: 'option' }">
            <div
              :class="{ 'sidebar-active text-primary-500': $route.name === 'option' }"
              class="flex ml-12 sidebar-hover rounded-full pr-2 cursor-pointer flex-nowrap"
            >
              <img class="w-7 h-7" :src="OptionIcon" alt="Опцион" />
              <span class="ml-2 font-medium text-lg whitespace-nowrap">Мои опционы</span>
            </div>
          </router-link>
          <router-link :to="{ name: 'profile' }">
            <div
              :class="{ 'sidebar-active text-primary-500': $route.name.includes('profile') }"
              class="flex ml-4 cursor-pointer flex-nowrap rounded-full sidebar-hover pr-3"
            >
              <img class="w-9 h-9 rounded-full border border-primary-500 object-cover" :src="userAvatar" alt="Опцион" />
              <span class="whitespace-nowrap ml-2 my-auto text-lg">{{ user.nickName }}</span>
            </div>
          </router-link>
        </div>
      </div>
      <div class="w-full my-10">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
