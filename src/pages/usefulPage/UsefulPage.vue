<script setup>
  import { defineAsyncComponent, reactive, ref, watch } from 'vue';
  import router from '@/router';
  import { useRoute } from 'vue-router';

  const tabItems = reactive([
    {
      title: 'Продукты',
      value: 'products',
    },
    {
      title: 'Сайты',
      value: 'sites',
    },
    {
      title: 'Telegram-боты',
      value: 'bots',
    },
    {
      title: 'Группы и каналы в Telegram',
      value: 'telegram-groups',
    },
  ]);
  const route = useRoute();
  const currentTab = ref(route.name);
  const query = reactive({
    search_text: '',
    page: 1,
    per_page: 15,
  });

  watch(currentTab, () => router.push({ name: `${currentTab.value}` }));

  const AtInput = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtInput/AtInput'));
  const AtTabs = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtTabs/AtTabs'));
  const AtPanel = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtPanel/AtPanel'));
</script>
<template>
  <div>
    <h2 class="header-title">Полезно знать</h2>
    <div>
      <at-input class="w-full md:w-96 mb-6" label="Поиск" placeholder="ФИО" v-model="query.search_text"></at-input>
    </div>
    <at-panel>
      <div class="mt-4">
        <div class="mb-10">
          <at-tabs v-model="currentTab" :items="tabItems"></at-tabs>
        </div>
        <div>
          <router-view />
        </div>
      </div>
    </at-panel>
  </div>
</template>
