<template>
  <header class="py-4 px-4 md:px-16 mx-auto mb-10 md:mb-16 lg:mb-20 sticky top-0 left-0 right-0 bg-white shadow">
    <nav class="flex items-center justify-between">
      <router-link to="/" class="font-bold text-2xl md:text-3xl">
        <span class="text-primary">Судимости</span><span class="text-dark">.нет</span>
      </router-link>
      <ul class="hidden md:flex md:mt-2">
        <li v-for="navLink in navLinks" :key="navLink.id" class="mr-5 lg:mr-10 last:mr-0">
          <router-link
            :to="{ name: navLink.name }"
            class="border-b-2 border-b-transparent text-lg md:text-xl transition-all hover:border-b-primary"
          >
            <span
              :class="{
                'text-primary':
                  navLink.name === routeName || (navLink.name === 'applications' && routeName === 'settings'),
              }"
            >
              {{ navLink.text }}
            </span>
          </router-link>
        </li>
      </ul>

      <div class="inline-block md:hidden mt-1">
        <MenuIcon v-if="!isMenuVisible" class="w-6 cursor-pointer text-dark" @click="isMenuVisible = !isMenuVisible" />
        <XIcon v-if="isMenuVisible" class="w-6 cursor-pointer text-dark" @click="isMenuVisible = !isMenuVisible" />
      </div>

      <div
        :class="[
          'absolute left-0 right-0 h-64 rounded-md flex items-center justify-center bg-white transition-all mobile-menu',
          { 'opacity-100': isMenuVisible },
          { 'top-20': isMenuVisible },
          { 'z-50': isMenuVisible },
          { visible: isMenuVisible },
          { 'pointer-events-auto': !isMenuVisible },
          { 'opacity-0': !isMenuVisible },
          { '-top-full': !isMenuVisible },
          { '-z-50': !isMenuVisible },
          { 'pointer-events-auto': !isMenuVisible },
          { invisible: !isMenuVisible },
        ]"
        style="box-shadow: 0px 15px 20px -20px rgba(0, 0, 0, 0.5)"
      >
        <ul class="flex flex-col items-center">
          <li v-for="navLink in navLinks" :key="navLink.id" class="mb-3 last:mb-0">
            <router-link :to="{ name: navLink.name }" @click="isMenuVisible = !isMenuVisible" class="text-2xl">
              <span
                :class="{
                  'text-primary':
                    navLink.name === routeName || (navLink.name === 'applications' && routeName === 'settings'),
                }"
              >
                {{ navLink.text }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
  import { MenuIcon, XIcon } from '@heroicons/vue/solid';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const isMenuVisible = ref(false);
  const routeName = ref(route.name);
  watch(route, () => {
    routeName.value = route.name;
    console.log(routeName.value);
  });

  const navLinks = ref([
    { id: Date.now(), text: 'О справке', name: 'home' },
    { id: Date.now(), text: 'Оставить заявку', name: 'application' },
    { id: Date.now(), text: 'Профиль', name: 'applications' },
  ]);
</script>
<style lang="postcss" scoped>
  a {
    @apply text-inherit;
  }
  a:hover {
    @apply text-primary;
  }
  a.active {
    @apply text-primary;
  }
  a.isIndex {
    @apply text-primary;
  }
</style>
