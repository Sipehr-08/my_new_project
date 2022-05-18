<script setup>
  import { defineAsyncComponent } from 'vue';
  const Sidebar = defineAsyncComponent(() => import('../components/core/SidebarCore'));
</script>
<template>
  <div class="font-sans">
    <div>
      <Sidebar>
        <router-view v-slot="{ Component }">
          <component :is="Component"></component>
        </router-view>
      </Sidebar>
    </div>
  </div>
</template>
