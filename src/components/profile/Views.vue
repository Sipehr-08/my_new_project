<template>
  <component v-if="$route.name === 'profile.applications'" :is="ProfileUserApplication"></component>
  <component v-if="$route.name === 'profile.settings'" :is="ProfileUserSettings"></component>
</template>

<script setup>
  import ProfileUserApplication from '@/components/profile/Application.vue';
  import ProfileUserSettings from '~/components/profile/Settings.vue';
</script>
