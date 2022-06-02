<script lang="ts" setup>
  import { defineAsyncComponent, reactive, ref, watch } from 'vue';
  import { getGroupsRequest } from '@/services/useful.api';

  const groups = ref<object>({});
  const loading = ref<boolean>(false);
  const query = reactive({
    page: 1,
    per_page: 20,
    search_text: '',
  });

  const getGroups = () => {
    loading.value = true;
    getGroupsRequest(query)
      .then(res => {
        groups.value = res?.data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  watch(query, () => getGroups(), { deep: true });

  getGroups();

  const LinkIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/LinkIcon'));
  const AtPanel = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const AtBadge = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtBadge/AtBadge'));
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
        <div class="flex justify-between mt-4">
          <at-skeleton type="label"></at-skeleton>
          <at-skeleton type="label"></at-skeleton>
        </div>
      </at-panel>
    </div>
  </div>
  <div v-else>
    <div class="masonry lg:masonry-lg xl:masonry-xl">
      <div class="break-inside pb-6 pt-1" v-for="group in groups?.data" :key="group.id">
        <at-panel class="shadow">
          <a
            :href="group.link"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center text-primary-500 mb-2 hover:text-primary-900"
          >
            <LinkIcon class="w-5 h-5 mr-2"></LinkIcon>
            <p class="text-lg font-semibold">{{ group.name }}</p>
          </a>
          <div v-html="group.description" class="text-sm font-semibold"></div>
          <div class="flex items-center justify-between mt-4">
            <p class="text-sm text-gray-500">Подключение:</p>
            <at-badge color="red" v-if="group.is_important_to_connect">Важно</at-badge>
            <at-badge v-else color="green">По желанию</at-badge>
          </div>
        </at-panel>
      </div>
    </div>
    <div class="pt-4 text-center" v-if="groups?.data && groups?.last_page !== 1">
      <div>
        <pagination-items-count class="mr-4 -ml-20" :items-meta="bots" />
        <at-pagination v-model="query.page" :total="groups?.last_page" />
      </div>
    </div>
  </div>
</template>
