<script setup>
  import { reactive, ref, defineAsyncComponent, computed, watch } from 'vue';
  import NProgress from 'nprogress';
  import { debounce } from '@/plugins/aliftech-ui/utils';
  import { getAllUsersRequest } from '@/services/users.api';
  import { useStore } from 'vuex';

  const store = useStore();

  const loading = ref(false);
  const users = ref(null);
  const query = reactive({
    search_text: '',
    head_organizational_unit_id: null,
    sub_organizational_unit_id: null,
    office_id: null,
    per_page: 20,
    page: 1,
  });

  const filters = ref(store.state.core.app);

  const subOrg = computed(() => {
    if (query.head_organizational_unit_id) {
      return filters.value.head_units
        ?.find(item => +item.id === query.head_organizational_unit_id)
        ?.unarchived_sub_organizational_units?.map(item => {
          return {
            title: item.name,
            value: item.id,
          };
        });
    }
    return null;
  });

  const cities = ref(
    filters.value?.offices?.map(item => {
      return {
        title: item.city.name_ru,
        value: item.city_id,
      };
    })
  );

  const head_units = ref(
    filters.value?.head_units?.map(item => {
      return {
        title: item.name,
        value: item.id,
      };
    })
  );

  watch(
    query,
    debounce(function () {
      getAllUsers();
    }, 500),
    { deep: true }
  );

  const getAllUsers = () => {
    loading.value = true;
    NProgress.start();
    getAllUsersRequest(query)
      .then(res => {
        users.value = res.data;
      })
      .finally(() => {
        loading.value = false;
        NProgress.done();
      });
  };
  getAllUsers();

  const AtSelect = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtSelect/AtSelect'));
  const AtInput = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtInput/AtInput'));
  const AtPagination = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtPagination/AtPagination'));
  const UserCard = defineAsyncComponent(() => import('~/components/users/UserCard'));
  const PaginationItemsCount = defineAsyncComponent(() => import('~/components/core/PaginationItemsCount'));
  const UserCardSkeleton = defineAsyncComponent(() => import('@/components/core/skeletons/UserCardSkeleton'));
</script>
<template>
  <div>
    <div class="flex items-center justify-between w-44">
      <h2 class="header-title">Алиф семья</h2>
      <span class="text-gray-400">(850)</span>
    </div>
    <div class="grid grid-cols-12 gap-5 my-4">
      <at-input class="col-span-3" label="Поиск" placeholder="ФИО" v-model="query.search_text"></at-input>
      <at-select
        class="col-span-3"
        label="Управление"
        v-model="query.head_organizational_unit_id"
        :options="[{ title: 'Все', value: null }, ...head_units]"
      >
      </at-select>
      <at-select
        v-if="!query.head_organizational_unit_id || !subOrg?.length"
        class="col-span-3"
        label="Отдел"
        v-model="query.sub_organizational_unit_id"
        disabled
        :options="[{ title: 'Все', value: null }]"
      >
      </at-select>
      <at-select
        v-else
        class="col-span-3"
        label="Отдел"
        v-model="query.sub_organizational_unit_id"
        :options="[{ title: 'Все', value: null }, ...subOrg]"
      >
      </at-select>
      <at-select
        class="col-span-3"
        label="Город"
        v-model="query.office_id"
        :options="[{ title: 'Все', value: null }, ...cities]"
      >
      </at-select>
      <!--      <at-select-->
      <!--        class="w-1/12"-->
      <!--        label="Стр"-->
      <!--        title-type="value"-->
      <!--        v-model="query.per_page"-->
      <!--        :options="[-->
      <!--          { title: 20, value: 20 },-->
      <!--          { title: 40, value: 40 },-->
      <!--          { title: 60, value: 60 },-->
      <!--        ]"-->
      <!--      >-->
      <!--      </at-select>-->
    </div>
    <div class="grid grid-cols-12 gap-5" v-if="loading">
      <UserCardSkeleton class="col-span-3" v-for="index of 12" :key="index" />
    </div>
    <div v-else>
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-3 translate-y-2" v-for="user in users?.data" :key="user.id">
          <Component :user="user" :is="UserCard" />
        </div>
      </div>
    </div>
    <div class="pt-4 text-center" v-if="users?.data && users?.last_page !== 1">
      <div>
        <pagination-items-count class="mr-4 -ml-20" :items-meta="users" />
        <at-pagination v-model="query.page" :total="users?.last_page" />
      </div>
    </div>
  </div>
</template>
