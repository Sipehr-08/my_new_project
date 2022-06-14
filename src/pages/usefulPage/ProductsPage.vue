<script lang="ts" setup>
  import { defineAsyncComponent, reactive, ref, watch } from 'vue';
  import { getProductsRequest } from '@/services/useful.api';

  const products = ref<object>({});
  const loading = ref<boolean>(false);
  const query = reactive({
    page: 1,
    per_page: 20,
    search_text: '',
  });
  const avatarPath = (avatar_path: string) => {
    return `${process.env.VUE_APP_STORAGE_API}${avatar_path}`;
  };

  const getProducts = () => {
    loading.value = true;
    getProductsRequest(query)
      .then(res => {
        products.value = res?.data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  watch(query, () => getProducts(), { deep: true });

  getProducts();

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
        <div class="flex items-center mt-8">
          <at-skeleton class="w-9 h-9 rounded-full"></at-skeleton>
          <at-skeleton type="label" class="ml-2 h-5 w-44"></at-skeleton>
        </div>
      </at-panel>
    </div>
  </div>
  <div v-else>
    <div class="masonry lg:masonry-lg xl:masonry-xl">
      <div class="break-inside pb-6 pt-1" v-for="product in products?.data" :key="product.id">
        <at-panel class="shadow">
          <a
            :href="product.link"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center text-primary-500 mb-2 hover:text-primary-900"
          >
            <LinkIcon class="w-5 h-5 mr-2"></LinkIcon>
            <p class="text-lg font-semibold">{{ product.name }}</p>
          </a>
          <div>
            <p class="text-sm font-semibold">{{ product.description }}</p>
          </div>
          <div class="pt-8">
            <router-link
              :to="{ name: 'family.show', params: { id: user.id } }"
              class="flex space-x-4 pb-2"
              v-for="user in product.users"
              :key="user.id"
            >
              <img class="w-9 h-9 rounded-full object-fill" :src="avatarPath(user.avatar_path)" :alt="user.nickname" />
              <p class="text-lg font-semibold hover:text-primary-500">{{ user.nickname }}</p>
            </router-link>
          </div>
        </at-panel>
      </div>
    </div>
    <div class="pt-4 text-center" v-if="products?.data && products?.last_page !== 1">
      <div>
        <pagination-items-count class="mr-4 -ml-20" :items-meta="products" />
        <at-pagination v-model="query.page" :total="products?.last_page" />
      </div>
    </div>
  </div>
</template>
