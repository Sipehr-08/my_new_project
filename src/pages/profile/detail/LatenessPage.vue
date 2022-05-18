<script setup>
  import { defineAsyncComponent, reactive, ref, watch } from 'vue';
  import { getLatenessRequest } from '@/services/profile';
  import CoreSkeleton from '~/components/core/skeletons/SkeletonLoading';
  const lateness = ref({});
  const loading = ref(false);
  const query = reactive({
    page: 1,
    per_page: 10,
  });
  const getLateness = () => {
    loading.value = true;
    getLatenessRequest(query)
      .then(res => {
        lateness.value = res?.data;
      })
      .finally(() => {
        loading.value = false;
      });
  };
  watch(query, () => getLateness(), { deep: true });
  getLateness();

  const AtTable = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtTable/AtTable'));
  const AtTableItem = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtTableItem/AtTableItem'));
  const AtBadge = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtBadge/AtBadge'));
  const AtPagination = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPagination/AtPagination'));
  const PaginationItemsCount = defineAsyncComponent(() => import('~/components/core/PaginationItemsCount'));
  const AtPanel = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPanel/AtPanel'));
</script>
<template>
  <div v-if="loading">
    <core-skeleton class="mt-6" countCol="5" countRow="12" />
  </div>
  <div v-else>
    <at-table
      :head="[
        { title: 'Дата' },
        { title: 'Статус' },
        { title: 'Буду в' },
        { title: 'На месте' },
        { title: 'Сообщения' },
      ]"
      :elements="lateness.data"
    >
      <template #element="{ element }">
        <at-table-item>
          <p class="font-semibold">{{ $filters.readableDate(element.created_at) }}</p>
          <p class="text-gray-500">{{ $filters.readableTime(element.created_at) }}</p>
        </at-table-item>
        <at-table-item>
          <at-badge :color="element.status.color">{{ element.status.label }}</at-badge>
        </at-table-item>
        <at-table-item>
          <p class="font-semibold" v-if="element.arrival_time">{{ $filters.readableTime(element.arrival_time) }}</p>
          <p v-else class="text-gray-500">Пусто</p>
        </at-table-item>
        <at-table-item>
          <p class="font-semibold" v-if="element.arrival_time">{{ $filters.readableTime(element.arrival_time) }}</p>
          <p v-else class="text-gray-500">Пусто</p>
        </at-table-item>
        <at-table-item>
          <p class="w-52 font-semibold">
            {{ element.comment }}
          </p>
        </at-table-item>
      </template>
    </at-table>
    <at-panel class="text-center" v-if="!lateness.data">
      <div class="w-full flex justify-center">
        <p class="text-gray-500 text-lg">Нет опозданий</p>
      </div>
    </at-panel>
  </div>
  <div class="pt-4 text-center" v-if="lateness?.data && lateness?.last_page !== 1">
    <div>
      <pagination-items-count class="mr-4 -ml-20" :items-meta="lateness" />
      <at-pagination v-model="query.page" :total="lateness?.last_page" />
    </div>
  </div>
</template>
