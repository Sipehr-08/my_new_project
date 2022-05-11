<script setup>
  import Sidebar from '../components/core/SidebarCore';
</script>
<template>
  <div class="font-sans">
    <div>
      <component :is="Sidebar">
        <transition name="slide-fade" mode="out-in">
          <router-view />
        </transition>
      </component>
    </div>
  </div>
</template>
