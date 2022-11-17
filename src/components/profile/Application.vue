<template>
  <div>
    <div style="overflow-x: auto">
      <table class="w-full desktop">
        <thead>
          <tr class="">
            <th class="text-center">№</th>
            <th class="text-center">Дата</th>
            <th class="text-center">На имя</th>
            <th class="text-center">Статус</th>
            <th class="text-center">Срочность</th>
          </tr>
        </thead>
        <tbody v-if="loading" class="basis-1/2">
          <tr v-for="i in 4" :key="i" class="text-center">
            <td><div class="w-100 h-6 animate-pulse bg-gray opacity-5 px-4"></div></td>
            <td><div class="w-100 h-6 animate-pulse bg-gray opacity-5 px-4"></div></td>
            <td><div class="w-100 h-6 animate-pulse bg-gray opacity-5 px-4"></div></td>
            <td><div class="w-100 h-6 animate-pulse bg-gray opacity-5 px-4"></div></td>
            <td><div class="w-100 h-6 animate-pulse bg-gray opacity-5 px-4"></div></td>
          </tr>
        </tbody>
        <tbody v-else-if="applications?.length">
          <tr v-for="application in applications" :key="application.id" class="">
            <td class="text-center">{{ application.id }}</td>
            <td class="text-center">{{ application.date }}</td>
            <td class="text-center">{{ application.surname + ' ' + application.name }}</td>
            <td class="text-center">{{ application.status }}</td>
            <td class="text-center">{{ application.reference_tariff === 'urgent' ? 'Срочный' : 'Обычный' }}</td>
          </tr>
        </tbody>
        <tbody v-else class="basis-1/2">
          <tr class="text-center">
            <td colspan="5">У вас пока нет заявки</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { getApplicationsRequest } from '@/services/app.api';
  const applications = ref(null);
  const loading = ref(false);

  const getApplication = () => {
    loading.value = true;
    getApplicationsRequest()
      .then(res => {
        applications.value = res.data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  getApplication();
</script>

<style lang="postcss" scoped>
  table.mobile thead tr th,
  table.mobile tbody tr td {
    padding: 8px 16px;
  }

  table.mobile:first-child {
    @apply border-t-0;
  }

  table.mobile thead tr th:nth-child(2n-1),
  table.mobile tbody tr td:nth-child(2n-1) {
    @apply bg-slate-100;
  }

  table.desktop thead tr th {
    padding: 8px 16px;
    color: #150802;
  }
  table.desktop tbody tr td {
    padding: 16px;
    color: #150802;
  }

  table.desktop tbody tr:nth-child(2n + 1) {
    @apply bg-slate-100;
  }
</style>
