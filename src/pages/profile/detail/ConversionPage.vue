<script setup>
  import { defineAsyncComponent, reactive, ref, watch } from 'vue';
  import { getDollarExchangeOfferRequest, setDollarExchangeOfferRequest } from '@/services/profile';
  import CoreSkeleton from '~/components/core/skeletons/SkeletonLoading';
  import app from '@/main';

  const dollarExchanges = ref({});
  const exchangeLimit = ref(0);
  const amount = ref(null);

  const loading = ref(false);
  const exchangeLoading = ref(false);
  const query = reactive({
    page: 1,
    per_page: 15,
  });

  const getDollarExchangeOffer = () => {
    loading.value = true;
    getDollarExchangeOfferRequest(query)
      .then(res => {
        dollarExchanges.value = res?.data?.dollar_exchange_offer;
        exchangeLimit.value = res?.data?.exchange_limit;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const setDollarExchange = () => {
    exchangeLoading.value = true;
    if (!Math.floor(amount.value) || !Math.floor(amount.value) > Math.floor(exchangeLimit.value)) return;
    setDollarExchangeOfferRequest({ exchange_offers: Math.floor(amount.value) })
      .then(() => {
        app.config.globalProperties.$toast.show({
          type: 'success',
          title: 'Заявка на покупку доллара успешно отправлена',
        });
        getDollarExchangeOffer();
      })
      .finally(() => {
        amount.value = null;
        exchangeLoading.value = false;
      });
  };

  watch(query, () => getDollarExchangeOffer(), { deep: true });
  getDollarExchangeOffer();

  const AtTable = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtTable/AtTable'));
  const AtTableItem = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtTableItem/AtTableItem'));
  const AtBadge = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtBadge/AtBadge'));
  const AtPagination = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPagination/AtPagination'));
  const PaginationItemsCount = defineAsyncComponent(() => import('~/components/core/PaginationItemsCount'));
  const AtPanel = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const AtInput = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtInput/AtInput'));
  const AtButton = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtButton/AtButton'));
</script>
<template>
  <div v-if="loading">
    <core-skeleton class="mt-6" countCol="5" countRow="1" />
    <core-skeleton class="mt-6" countCol="5" countRow="12" />
  </div>
  <div v-else>
    <at-panel>
      <div class="flex justify-between items-center">
        <div v-if="Math.floor(exchangeLimit)" class="flex">
          <span class="text-lg mr-2">Лимит покупки доллара:</span>
          <span class="font-medium text-lg text-primary-500">{{ Math.floor(exchangeLimit) }}$</span>
        </div>
        <div v-else>
          <p class="text-lg text-gray-500">! Ваш лимит покупки доллара исчерпан</p>
        </div>
        <div class="flex space-x-4">
          <at-input
            v-model="amount"
            :error="amount > Math.floor(exchangeLimit)"
            :disabled="!Math.floor(exchangeLimit)"
            placeholder="Сумма покупки $"
            type="number"
          ></at-input>
          <at-button
            @click="setDollarExchange"
            :loading="exchangeLoading"
            :disabled="!Math.floor(exchangeLimit) || !amount || amount > Math.floor(exchangeLimit)"
            color="primary"
          >
            Оставить заявку
          </at-button>
        </div>
      </div>
    </at-panel>
    <at-table
      class="mt-4"
      :head="[{ title: 'Дата заявки' }, { title: 'Заявка' }, { title: 'Покупка' }, { title: 'Статус' }]"
      :elements="dollarExchanges.data"
    >
      <template #element="{ element }">
        <at-table-item>
          <p class="font-semibold">{{ $filters.readableDate(element.created_at) }}</p>
          <p class="text-gray-500">{{ $filters.readableTime(element.created_at) }}</p>
        </at-table-item>
        <at-table-item>
          <p class="font-semibold">${{ element.size }}</p>
        </at-table-item>
        <at-table-item>
          <p class="font-semibold">${{ element.bought_size }}</p>
        </at-table-item>
        <at-table-item>
          <at-badge
            :color="
              element.status.name === 'approved'
                ? 'green'
                : element.status.name === 'bought'
                ? 'primary'
                : element.status.name === 'new'
                ? 'blue'
                : element.status.name === 'did-not-come'
                ? 'yellow'
                : 'red'
            "
          >
            {{ element.status.label }}
          </at-badge>
        </at-table-item>
      </template>
    </at-table>
    <at-panel class="text-center" v-if="!dollarExchanges.data">
      <div class="w-full flex justify-center">
        <p class="text-gray-500 text-lg">Нет заявок</p>
      </div>
    </at-panel>
  </div>
  <div class="pt-4 text-center" v-if="dollarExchanges?.data && dollarExchanges?.last_page !== 1">
    <div>
      <pagination-items-count class="mr-4 -ml-20" :items-meta="conversions" />
      <at-pagination v-model="query.page" :total="dollarExchanges?.last_page" />
    </div>
  </div>
</template>
