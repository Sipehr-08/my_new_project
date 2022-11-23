<template>
  <ul class="flex justify-between mb-10 md:mb-0 md:flex-col">
    <li v-for="action in props.actions" :key="action.id" class="sm:text-base md:text-lg md:mb-4 md:last:mb-0 text">
      <router-link
        v-if="action.route !== 'exit'"
        :to="{ name: action.route }"
        :class="{ isIndex: $route.name === `${action.route}` }"
      >
        {{ action.name }}
      </router-link>

      <p @click="logout" class="cursor-pointer" v-else>
        {{ action.name }}
      </p>
    </li>
  </ul>
</template>

<script setup>
  import { defineProps, onMounted } from 'vue';
  import { logout } from '@/services/auth.api';
  onMounted(() => {
    window.scrollTo(0, 0);
  });
  const props = defineProps({
    actions: {
      type: Array,
      required: true,
    },
  });
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
