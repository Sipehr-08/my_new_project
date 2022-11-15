<script setup>
  import Header from '@/components/global/Header';
  import FooterComponent from '@/components/global/FooterComponent';
</script>
<template>
  <div class="font-sans">
    <div>
      <Header />
      <router-view v-slot="{ Component }">
        <main class="app-container min-h-screen px-4 lg:px-6 mx-auto pointer-events-auto">
          <component :is="Component"></component>
        </main>
      </router-view>
      <FooterComponent />
    </div>
  </div>
</template>
