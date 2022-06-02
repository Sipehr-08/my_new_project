<script lang="ts" setup>
  import { defineAsyncComponent, reactive, ref, watch } from 'vue';
  import { getBotsRequest } from '@/services/useful.api';

  const bots = ref<object>({});
  const loading = ref<boolean>(false);
  const query = reactive({
    page: 1,
    per_page: 20,
    search_text: '',
  });

  const getBots = () => {
    loading.value = true;
    getBotsRequest(query)
      .then(res => {
        bots.value = res?.data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  watch(query, () => getBots(), { deep: true });

  getBots();

  const LinkIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/LinkIcon'));
  const AtPanel = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const AtPagination = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtPagination/AtPagination'));
  const PaginationItemsCount = defineAsyncComponent(() => import('~/components/core/PaginationItemsCount'));
  const AtSkeleton = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtSkeleton/AtSkeleton'));
</script>
<template>
  <div v-if="loading">
    <div class="grid grid-cols-12 gap-6">
      <at-panel class="col-span-4" v-for="i in 9" :key="i">
        <at-skeleton class="w-56 mb-2"></at-skeleton>
        <at-skeleton class="mb-1 w-full" type="label"></at-skeleton>
        <at-skeleton class="mb-1 w-full" type="label"></at-skeleton>
        <at-skeleton class="mb-1 w-full" type="label"></at-skeleton>
        <at-skeleton class="mb-1 w-full" type="label"></at-skeleton>
      </at-panel>
    </div>
  </div>
  <div v-else>
    <div class="masonry lg:masonry-lg xl:masonry-xl">
      <div class="break-inside pb-6 pt-1" v-for="bot in bots?.data" :key="bot.id">
        <at-panel class="shadow">
          <a
            :href="`https://t.me/${bot.link}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center text-primary-500 mb-2 hover:text-primary-900"
          >
            <LinkIcon class="w-5 h-5 mr-2"></LinkIcon>
            <p class="text-lg font-semibold">{{ bot.name }}</p>
          </a>
          <div v-html="bot.description" class="text-sm font-semibold"></div>
        </at-panel>
      </div>
    </div>
    <div class="pt-4 text-center" v-if="bots?.data && bots?.last_page !== 1">
      <div>
        <pagination-items-count class="mr-4 -ml-20" :items-meta="bots" />
        <at-pagination v-model="query.page" :total="bots?.last_page" />
      </div>
    </div>
  </div>
</template>
