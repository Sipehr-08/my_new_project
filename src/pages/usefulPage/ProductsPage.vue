<script setup>
  import { defineAsyncComponent, reactive, ref } from 'vue';
  import { getProductsRequest } from '@/services/useful.api';

  const products = ref({});
  const loading = ref(false);
  const query = reactive({
    page: 1,
    per_page: 15,
    search_text: '',
  });
  const avatarPath = avatar_path => {
    return `${process.env.VUE_APP_STORAGE_API}${avatar_path}`;
  };

  const getProducts = () => {
    loading.value = true;
    getProductsRequest(query)
      .then(res => {
        products.value = res?.data;
        console.log(products.value);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  getProducts();

  const LinkIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/LinkIcon'));
  const AtPanel = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtPanel/AtPanel'));
</script>
<template>
  <div v-if="!loading">
    <div class="masonry lg:masonry-lg xl:masonry-xl">
      <div class="break-inside mb-6" v-for="product in products?.data" :key="product.id">
        <at-panel class="shadow">
          <div class="flex items-center text-primary-500">
            <LinkIcon class="w-5 h-5 mr-2"></LinkIcon>
            <p class="text-lg font-semibold">{{ product.name }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ product.description }}</p>
          </div>
          <div class="flex space-x-4 mt-4" v-for="user in product.users" :key="user.id">
            <img class="w-9 h-9 rounded-full object-fill" :src="avatarPath(user.avatar_path)" :alt="user.nickname" />
            <div>
              <p class="text-lg font-semibold">{{ user.nickname }}</p>
            </div>
          </div>
        </at-panel>
      </div>
    </div>
  </div>
</template>
