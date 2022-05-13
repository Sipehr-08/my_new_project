<script setup>
  import { defineAsyncComponent } from 'vue';
  const Sidebar = defineAsyncComponent(() => import('../components/core/SidebarCore'));
</script>
<template>
  <div class="font-sans">
    <div>
      <Sidebar>
        <router-view v-slot="{ Component }">
          <transition name="slide-fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </Sidebar>
    </div>
  </div>
</template>
