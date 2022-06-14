<script setup lang="ts">
  import { defineAsyncComponent, ref } from 'vue';
  import { getNewsByIdRequest } from '@/services/news.api';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  //loading
  const loading = ref<boolean>(false);

  //data
  const news = ref<object>({});
  const newsId = ref(route.params.id);

  const avatarPath = (avatar_path: string) => {
    return `${process.env.VUE_APP_STORAGE_API}${avatar_path}`;
  };

  const getNewsById = (): void => {
    loading.value = true;
    getNewsByIdRequest(newsId.value)
      .then(res => {
        news.value = res.data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  getNewsById();

  //aliftech-ui components
  const AtPanel = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const AtSkeleton = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtSkeleton/AtSkeleton'));
</script>
<template>
  <div>
    <AtPanel>
      <div v-if="loading" class="px-44 py-16">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <at-skeleton class="w-12 h-12" type="avatar"></at-skeleton>
            <at-skeleton class="h-6 w-44" type="label"></at-skeleton>
          </div>
          <at-skeleton type="label"></at-skeleton>
        </div>
        <div>
          <at-skeleton class="h-6 w-5/6 mt-12" type="label"></at-skeleton>
          <at-skeleton class="h-96 w-full rounded-lg mt-12" type="image"></at-skeleton>
          <at-skeleton class="h-5 w-5/6 mt-6" type="label"></at-skeleton>
          <at-skeleton class="w-5/6 mt-6" type="label"></at-skeleton>
          <at-skeleton class="w-full mt-6" type="label"></at-skeleton>
          <at-skeleton class="w-5/6 mt-2" type="label"></at-skeleton>
          <at-skeleton class="w-full mt-2" type="label"></at-skeleton>
          <at-skeleton class="w-full mt-2" type="label"></at-skeleton>
          <at-skeleton class="w-5/6 mt-2" type="label"></at-skeleton>
          <at-skeleton class="w-full mt-2" type="label"></at-skeleton>
        </div>
      </div>
      <div v-else class="px-10 md:px-20 xl:px-32 2xl:px-44 py-16">
        <div class="flex justify-between items-center">
          <router-link :to="{ name: 'family.show', params: { id: news.user.id } }" class="flex items-center space-x-4">
            <img class="w-12 h-12 rounded-full object-cover" :src="avatarPath(news.user.avatar_path)" alt="аватар" />
            <p class="text-xl font-semibold">{{ news.user.nickname }}</p>
          </router-link>
          <p class="text-gray-500">{{ $filters.readableDate(news.published_at) }}</p>
        </div>
        <div>
          <p class="text-2xl font-bold mt-8 mb-4 pb-4">{{ news.title }}</p>
          <img
            class="w-full h-96 mt-6 mb-6 rounded-lg object-top object-cover"
            :src="avatarPath(news.image_path)"
            alt=""
          />
          <div v-html="news.description"></div>
        </div>
      </div>
    </AtPanel>
  </div>
</template>
