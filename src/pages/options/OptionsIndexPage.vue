<script setup>
  import { defineAsyncComponent, reactive, ref, watch } from 'vue';
  import { getOptionsRequest, getStocksAndOptionsAmountRequest, getStockPriceRequest } from '@/services/profile';
  import CoreSkeleton from '~/components/core/skeletons/SkeletonLoading';
  const options = ref({});
  const stocksAmount = ref(0);
  const optionsAmount = ref(0);
  const stockPrice = ref(0);
  const loading = ref(false);
  const query = reactive({
    page: 1,
    per_page: 15,
  });

  const getOptions = () => {
    loading.value = true;
    getOptionsRequest(query)
      .then(res => {
        options.value = res?.data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const getStocksAndOptionsAmount = () => {
    getStocksAndOptionsAmountRequest().then(res => {
      stocksAmount.value = res?.data?.stocks;
      optionsAmount.value = res?.data?.options;
    });
  };

  const getStockPrice = () => {
    getStockPriceRequest().then(res => {
      stockPrice.value = res?.data?.price;
    });
  };

  watch(query, () => getOptions(), { deep: true });
  getStocksAndOptionsAmount();
  getStockPrice();
  getOptions();

  const AtTable = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtTable/AtTable'));
  const AtPanel = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const AtTableItem = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtTableItem/AtTableItem'));
  const AtBadge = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtBadge/AtBadge'));
  const AtPagination = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPagination/AtPagination'));
  const PaginationItemsCount = defineAsyncComponent(() => import('~/components/core/PaginationItemsCount'));
  const AtSkeleton = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtSkeleton/AtSkeleton'));
</script>
<template>
  <div v-if="loading">
    <at-skeleton class="mt-4 w-96 mb-6" type="label" />
    <at-panel class="w-full">
      <div class="flex justify-between items-end">
        <div class="w-full">
          <at-skeleton type="label" />
          <at-skeleton class="mt-2 w-28" />
        </div>
        <div>
          <at-skeleton class="mt-4 w-32" type="label" />
          <at-skeleton class="mt-4 w-32" type="label" />
        </div>
      </div>
    </at-panel>
    <div class="flex space-x-6 mt-6">
      <at-panel class="w-full">
        <at-skeleton type="label" />
        <at-skeleton class="mt-2 w-32" />
        <at-skeleton class="mt-4 w-52" type="label" />
        <at-skeleton class="mt-2 w-32" />
      </at-panel>
      <at-panel class="w-full">
        <at-skeleton type="label" />
        <at-skeleton class="mt-2 w-32" />
        <at-skeleton class="mt-4 w-52" type="label" />
        <at-skeleton class="mt-2 w-32" />
      </at-panel>
    </div>
    <core-skeleton class="mt-6" countCol="5" countRow="12" />
  </div>
  <div v-else>
    <div class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <p class="text-gray-500">В данном отчете не учитываются проданные/купленные вами акции</p>
        <a
          href="https://docs.google.com/document/d/1P-xANeeSoNLtCiJjeLSxy0uGX2HmrSlvX10AM397-X8/edit?pli=1#"
          target="_blank"
        >
          <div
            title="Часто задаваемые вопросы"
            class="rounded-full bg-primary-500 text-white px-2 hover:bg-primary-700"
          >
            FAQ
          </div>
        </a>
      </div>
      <!--      <p class="text-gray-500">-->
      <!--        Cредневзвешенная цена акций учитывает транзакции вакала (совершеныe на основе 50 долларов США + долевое участие-->
      <!--        в перепродаже)-->
      <!--      </p>-->
      <at-panel>
        <div class="flex justify-between items-end">
          <div>
            <p class="text-gray-400 mb-1">Цена за акцию</p>
            <h2 class="text-4xl text-primary-500 font-semibold">${{ stockPrice }}</h2>
          </div>
          <div>
            <p>Цена варьируется</p>
            <p>от $50 до $72</p>
          </div>
        </div>
      </at-panel>
    </div>
    <div class="flex space-x-6 mb-6">
      <div class="w-full">
        <at-panel class="h-full">
          <div>
            <p class="text-gray-400 mb-1">Количество акций</p>
            <h2 class="text-4xl font-semibold">{{ Math.floor(stocksAmount) }}</h2>
          </div>
          <div>
            <p class="text-gray-400 mb-1">Общая стоимость акций</p>
            <h2 class="text-4xl font-semibold">
              {{ stocksAmount ? '$' + (stocksAmount * Number(stockPrice)).toFixed(1) : '$0.0' }}
            </h2>
          </div>
        </at-panel>
      </div>
      <div class="w-full">
        <at-panel>
          <div class="mb-2">
            <p class="text-gray-400 mb-1">Количество опционов</p>
            <h2 class="text-4xl font-semibold">{{ optionsAmount }}</h2>
          </div>
          <div>
            <p class="text-gray-400 mb-1">Общая стоимость опционов</p>
            <h2 class="text-4xl font-semibold">
              {{ optionsAmount ? '$' + (optionsAmount * Number(stockPrice)).toFixed(1) : '$0.0' }}
            </h2>
          </div>
        </at-panel>
      </div>
    </div>
    <at-table
      :head="[
        { title: 'Дата' },
        { title: 'Тип' },
        { title: 'Кол-во' },
        { title: 'Общая стоимость' },
        { title: 'Дата кристаллизации' },
      ]"
      :elements="options.data"
    >
      <template #element="{ element }">
        <at-table-item>
          <p class="font-semibold">{{ $filters.readableMonthYear(element.date) }}</p>
        </at-table-item>
        <at-table-item>
          <at-badge :color="element.label === 'Акция' ? 'green' : null">{{ element.label }}</at-badge>
        </at-table-item>
        <at-table-item>
          <p class="font-semibold">
            {{ element.option }}
          </p>
        </at-table-item>
        <at-table-item>
          <p class="font-semibold">${{ element.price }}</p>
        </at-table-item>
        <at-table-item>
          <p class="font-semibold">{{ $filters.readableDate(element.crystallize_date) }}</p>
        </at-table-item>
      </template>
    </at-table>
    <at-panel class="text-center" v-if="!options.data">
      <div class="w-full flex justify-center">
        <p class="text-gray-500 text-lg">Нет опционов</p>
      </div>
    </at-panel>
  </div>
  <div class="pt-4 text-center" v-if="options?.data && options?.meta.last_page !== 1">
    <div>
      <pagination-items-count class="mr-4 -ml-20" :items-meta="options.meta" />
      <at-pagination v-model="query.page" :total="options?.meta.last_page" />
    </div>
  </div>
</template>
