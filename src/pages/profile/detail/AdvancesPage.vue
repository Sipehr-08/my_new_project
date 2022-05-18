<script setup>
  import { defineAsyncComponent, reactive, ref, watch } from 'vue';
  import { getAdvancedSalaryRequest, setAdvancedSalaryRequest } from '@/services/profile';
  import CoreSkeleton from '~/components/core/skeletons/SkeletonLoading';
  import app from '@/main';

  const advances = ref({});
  const advanceLimit = ref(0);
  const advanceYearLimit = ref(0);
  const amount = ref(null);

  const loading = ref(false);
  const advanceLoading = ref(false);
  const query = reactive({
    page: 1,
    per_page: 15,
  });

  const getAdvancedSalary = () => {
    loading.value = true;
    getAdvancedSalaryRequest(query)
      .then(res => {
        advances.value = res?.data?.advances;
        advanceLimit.value = res?.data?.advance_limit;
        advanceYearLimit.value = res?.data?.attempts_get_advance_per_year;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const setAdvancedSalary = () => {
    advanceLoading.value = true;
    if (!Math.floor(amount.value) || !Math.floor(amount.value) > Math.floor(advanceLimit.value)) return;
    setAdvancedSalaryRequest({ advance_amount: Math.floor(amount.value) })
      .then(() => {
        app.config.globalProperties.$toast.show({
          type: 'success',
          title: 'Заявка для получение аванса отправлена',
        });
        getAdvancedSalary();
      })
      .finally(() => {
        amount.value = null;
        advanceLoading.value = false;
      });
  };

  watch(query, () => getAdvancedSalary(), { deep: true });
  getAdvancedSalary();

  const AtTable = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtTable/AtTable'));
  const AtTableItem = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtTableItem/AtTableItem'));
  const AtBadge = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtBadge/AtBadge'));
  const AtPagination = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPagination/AtPagination'));
  const PaginationItemsCount = defineAsyncComponent(() => import('~/components/core/PaginationItemsCount'));
  const AtPanel = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const AtInput = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtInput/AtInput'));
  const AtButton = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtButton/AtButton'));
  const AtTooltip = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtTooltip/AtTooltip'));
  const InformationCircleIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/InformationCircleIcon'));
</script>
<template>
  <div v-if="loading">
    <core-skeleton class="mt-6" countCol="5" countRow="1" />
    <core-skeleton class="mt-6" countCol="5" countRow="12" />
  </div>
  <div v-else>
    <at-panel overflow="visible">
      <div class="flex justify-between items-center">
        <div class="flex">
          <div v-if="Math.floor(advanceLimit)" class="flex">
            <span class="text-lg mr-2">Лимит получение аванса:</span>
            <span class="font-medium text-lg text-primary-500">{{ Math.floor(advanceLimit) }} с.</span>
          </div>
          <div v-else>
            <p class="text-lg text-gray-500">! Ваш лимит получение аванса исчерпан</p>
          </div>
          <at-tooltip>
            <template #body>
              <p>
                Лимит аванса в год: 3 <br />
                Осталось: {{ advanceYearLimit }} <br />
                Чтобы оставить заявку, должно пройти 30 дней со дня получения последнего аванса
              </p>
            </template>
            <InformationCircleIcon class="w-6 h-6 text-gray-300 mt-0.5 ml-2" />
          </at-tooltip>
        </div>
        <div class="flex space-x-4">
          <at-input
            v-model="amount"
            :error="amount > Math.floor(advanceLimit)"
            :disabled="!Math.floor(advanceLimit)"
            placeholder="Сумма аванса"
            type="number"
          ></at-input>
          <at-button
            @click="setAdvancedSalary"
            :loading="advanceLoading"
            :disabled="!Math.floor(advanceLimit) || !amount || amount > Math.floor(advanceLimit)"
            color="primary"
          >
            Оставить заявку
          </at-button>
        </div>
      </div>
    </at-panel>
    <at-table
      class="mt-4"
      :head="[{ title: 'Дата заявки' }, { title: 'Сумма' }, { title: 'Статус' }]"
      :elements="advances.data"
    >
      <template #element="{ element }">
        <at-table-item>
          <p class="font-semibold">{{ $filters.readableDate(element.created_at) }}</p>
          <p class="text-gray-500">{{ $filters.readableTime(element.created_at) }}</p>
        </at-table-item>
        <at-table-item>
          <p class="font-semibold">{{ Math.floor(element.size) }} с.</p>
        </at-table-item>
        <at-table-item>
          <at-badge
            :color="element.status.name === 'transferred' ? 'green' : element.status.name === 'new' ? 'blue' : 'red'"
          >
            {{ element.status.label }}
          </at-badge>
        </at-table-item>
      </template>
    </at-table>
    <at-panel class="text-center" v-if="!advances.data">
      <div class="w-full flex justify-center">
        <p class="text-gray-500 text-lg">Нет заявок</p>
      </div>
    </at-panel>
  </div>
  <div class="pt-4 text-center" v-if="advances?.data && advances?.last_page !== 1">
    <div>
      <pagination-items-count class="mr-4 -ml-20" :items-meta="conversions" />
      <at-pagination v-model="query.page" :total="advances?.last_page" />
    </div>
  </div>
</template>
