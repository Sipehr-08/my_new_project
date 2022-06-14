<script setup>
  import { defineAsyncComponent, reactive, ref, watch } from 'vue';
  import { getContractRequest } from '@/services/profile';
  import CoreSkeleton from '~/components/core/skeletons/SkeletonLoading';

  //data
  const contracts = ref({});

  //loading
  const loading = ref(false);

  //query params
  const query = reactive({
    page: 1,
    per_page: 10,
  });

  const getContracts = () => {
    loading.value = true;
    getContractRequest(query)
      .then(res => {
        contracts.value = res?.data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  watch(query, () => getContracts(), { deep: true });
  getContracts();

  //aliftech-ui components
  const AtTable = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtTable/AtTable'));
  const AtTableItem = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtTableItem/AtTableItem'));
  const AtPagination = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPagination/AtPagination'));
  const PaginationItemsCount = defineAsyncComponent(() => import('~/components/core/PaginationItemsCount'));
  const AtPanel = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPanel/AtPanel'));
</script>
<template>
  <div v-if="loading">
    <core-skeleton class="mt-6" countCol="5" countRow="8" />
  </div>
  <div v-else>
    <at-table
      :head="[
        { title: 'Дата соглашения' },
        { title: 'Расписание' },
        { title: 'Налоговый вычет' },
        { title: 'Брутто' },
        { title: 'Нетто' },
      ]"
      :elements="contracts.data"
    >
      <template #element="{ element }">
        <at-table-item>
          {{ $filters.readableDate(element.started_at) }}
        </at-table-item>
        <at-table-item>
          <p>{{ element.schedule?.schedulable?.title }}</p>
        </at-table-item>
        <at-table-item>
          <p>{{ element.tax_concession_type?.label }}</p>
        </at-table-item>
        <at-table-item>
          <p>${{ element.brutto }}</p>
        </at-table-item>
        <at-table-item>
          <p>${{ element.netto }}</p>
        </at-table-item>
      </template>
    </at-table>
    <at-panel class="text-center" v-if="!contracts.data">
      <div class="w-full flex justify-center">
        <p class="text-gray-500 text-lg">Нет данных</p>
      </div>
    </at-panel>
  </div>
  <div class="pt-4 text-center" v-if="contracts?.data && contracts?.last_page !== 1">
    <div>
      <pagination-items-count class="mr-4 -ml-20" :items-meta="contracts" />
      <at-pagination v-model="query.page" :total="contracts?.last_page" />
    </div>
  </div>
</template>
