<script setup>
  import { defineAsyncComponent, reactive, ref, watch } from 'vue';
  import {
    getVacationTrackersRequest,
    getVacationSchedulesRequest,
    createVacationScheduleRequest,
  } from '@/services/profile';
  import CoreSkeleton from '~/components/core/skeletons/SkeletonLoading';
  import VectorIcon from '@/assets/icons/Vector.png';
  import LineIcon from '@/assets/icons/Line.png';
  import { readableDateNews } from '@/utils/filters/dateFilters';
  const vacationTrackers = ref({});
  const vacationSchedules = ref({});
  const vacationPaidDays = ref(0);
  const loading = ref(false);
  const modal = ref(false);
  const vacationLoading = ref(false);
  const modalLoading = ref(false);
  const vacationStatus = ref(['Новый', 'Одобрено', 'В ожидание', 'Отказано']);
  const vacationDate = ref(null);
  const isSubmitted = ref(false);
  const query = reactive({
    page: 1,
    per_page: 10,
  });
  const getVacationTrackers = () => {
    loading.value = true;
    getVacationTrackersRequest(query)
      .then(res => {
        vacationTrackers.value = res?.data?.vacations;
        vacationPaidDays.value = res?.data?.paid_days;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const getVacationSchedules = () => {
    vacationLoading.value = true;
    getVacationSchedulesRequest(query)
      .then(res => {
        vacationSchedules.value = res?.data;
      })
      .finally(() => {
        vacationLoading.value = false;
      });
  };

  const cancel = () => {
    modalLoading.value = false;
    isSubmitted.value = false;
    vacationDate.value = null;
    modal.value = false;
  };

  const createVacationSchedule = () => {
    isSubmitted.value = true;
    if (!vacationDate.value) return;
    modalLoading.value = true;
    createVacationScheduleRequest({ scheduled_date: readableDateNews(vacationDate.value) })
      .then(() => {
        cancel();
      })
      .finally(() => {
        modalLoading.value = false;
      });
  };
  watch(query, () => getVacationTrackers(), { deep: true });
  getVacationTrackers();
  getVacationSchedules();

  const AtTable = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtTable/AtTable'));
  const AtBadge = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtBadge/AtBadge'));
  const AtPanel = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const AtTableItem = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtTableItem/AtTableItem'));
  const AtPagination = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPagination/AtPagination'));
  const AtButton = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtButton/AtButton'));
  const AtModal = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtModal/AtModal'));
  const AtDatepicker = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtDatepicker/AtDatepicker'));
  const PaginationItemsCount = defineAsyncComponent(() => import('~/components/core/PaginationItemsCount'));
</script>
<template>
  <div v-if="loading">
    <core-skeleton class="mt-6" countCol="5" countRow="12" />
  </div>
  <div v-else>
    <h2 class="text-lg font-medium mb-4">Запланированные отпуска</h2>
    <at-panel>
      <div class="flex w-full p-10">
        <div class="w-1/2">
          <div class="flex justify-center">
            <img class="w-14 h-6 mr-5" :src="VectorIcon" alt="icon" />
          </div>
          <div class="flex items-center mb-4 mt-4">
            <span class="font-bold text-6xl">{{ vacationPaidDays }}</span>
            <p class="w-36 ml-4 font-semibold">Накопленных отпускных дней</p>
          </div>
          <div>
            <img class="w-52" :src="LineIcon" alt="" />
          </div>
          <at-button @click="modal = true" class="w-52 mt-6" size="lg" color="primary">Запланировать</at-button>
          <at-modal title="Запланировать отпуск" v-model="modal">
            <at-datepicker
              placeholder="Выберите месяц"
              :error="isSubmitted && !vacationDate"
              type="month"
              v-model="vacationDate"
              label="Месяц"
            ></at-datepicker>
            <div class="mt-4 flex w-full justify-end">
              <at-button @click="cancel" class="mr-4">Отмена</at-button>
              <at-button @click="createVacationSchedule" :loading="modalLoading" color="primary">Сохранить</at-button>
            </div>
          </at-modal>
        </div>
        <div class="w-1/2 flex justify-end">
          <div class="w-96">
            <div class="flex justify-between pr-4">
              <p class="text-xl text-gray-500">Период</p>
              <p class="text-xl text-gray-500">Статус</p>
            </div>
            <hr class="my-4 pr-4" />
            <div class="max-h-32 overflow-y-auto pr-4" v-if="vacationSchedules?.data">
              <div v-for="vacationSchedule in vacationSchedules.data" :key="vacationSchedule.id">
                <div class="flex justify-between">
                  <p class="font-semibold">{{ $filters.readableDate(vacationSchedule.scheduled_date) }}</p>
                  <at-badge
                    :color="
                      vacationSchedule.status_id === 1
                        ? 'blue'
                        : vacationSchedule.status_id === 2
                        ? 'green'
                        : vacationSchedule.status_id === 3
                        ? 'yellow'
                        : 'red'
                    "
                  >
                    {{ vacationStatus[vacationSchedule.status_id - 1] }}
                  </at-badge>
                </div>
                <hr class="my-4" />
              </div>
            </div>
            <div v-else class="w-full flex justify-center">
              <p class="text-gray-500 text-lg">Нет запланированных отпусков</p>
            </div>
          </div>
        </div>
      </div>
    </at-panel>
    <h2 class="text-lg font-medium mb-4 mt-8">Использованные отпуска</h2>
    <at-table
      :head="[
        { title: 'Период' },
        { title: 'Дата отпуска' },
        { title: 'Кол-во дней' },
        { title: 'Дата отзыва' },
        // { title: 'Остаток' },
      ]"
      :elements="vacationTrackers.data[0]"
    >
      <template #element="{ element }">
        <at-table-item>
          {{ element.accrual_group_start_date + ' - ' + element.accrual_group_end_date }}
        </at-table-item>
        <at-table-item>
          <p>{{ $filters.readableDate(element.start_date) }}</p>
        </at-table-item>
        <at-table-item>
          <p>{{ element.days }}</p>
        </at-table-item>
        <at-table-item>
          <p>{{ $filters.readableDate(element.end_date) }}</p>
        </at-table-item>
        <!--        <at-table-item>-->
        <!--          <p>{{ element.left_unpaid_days }}</p>-->
        <!--        </at-table-item>-->
      </template>
    </at-table>
    <at-panel class="text-center" v-if="!vacationTrackers?.data[0]">
      <div class="w-full flex justify-center">
        <p class="text-gray-500 text-lg">Нет использованных отпусков</p>
      </div>
    </at-panel>
  </div>
  <div class="pt-4 text-center" v-if="vacationTrackers?.data && vacationTrackers?.last_page !== 1">
    <div>
      <pagination-items-count class="mr-4 -ml-20" :items-meta="vacationTrackers" />
      <at-pagination v-model="query.page" :total="vacationTrackers?.last_page" />
    </div>
  </div>
</template>
