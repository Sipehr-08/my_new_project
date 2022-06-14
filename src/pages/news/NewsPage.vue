<script setup lang="ts">
  import { defineAsyncComponent, reactive, ref, watch } from 'vue';
  import { Carousel, Slide, Navigation } from 'vue3-carousel';
  import { getNewsRequest } from '@/services/news.api';
  import { debounce } from '@/plugins/aliftech-ui/utils';

  //loading
  const loading = ref<boolean>(false);
  const newsLoading = ref<boolean>(false);

  //data
  const news = ref<object>({});
  const allNews = ref<object>({});

  //query params
  const query = reactive<object>({
    search_text: '',
    page: 1,
    per_page: 15,
    status_id: [1],
  });

  const historyQuery = reactive({
    search_text: '',
    page: 1,
    per_page: 15,
    category_ids: [],
  });

  const currentTab = ref(null);

  const tabItems = reactive<object>([
    {
      title: 'Все новости',
      value: null,
    },
    {
      title: 'Истории успехов',
      value: 9,
    },
    {
      title: 'Ротации',
      value: 3,
    },
    {
      title: 'Кадры',
      value: 2,
    },
  ]);

  const avatarPath = (avatar_path: string) => {
    return `${process.env.VUE_APP_STORAGE_API}${avatar_path}`;
  };

  const getNews = (): void => {
    loading.value = true;
    getNewsRequest(query)
      .then(res => {
        news.value = res.data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const getNewsByFilters = (): void => {
    newsLoading.value = true;
    if (currentTab.value) historyQuery.category_ids = [currentTab.value];
    getNewsRequest(historyQuery)
      .then(res => {
        allNews.value = res.data;
      })
      .finally(() => {
        newsLoading.value = false;
      });
  };

  watch(currentTab, () => {
    historyQuery.page = 1;
    getNewsByFilters();
  });
  watch(historyQuery.page, () => getNewsByFilters(), { deep: true });
  watch(
    historyQuery.search_text,
    debounce(function () {
      getNewsByFilters();
    }, 700)
  );
  getNews();
  getNewsByFilters();

  //aliftech-ui components
  const AtInput = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtInput/AtInput'));
  const AtTabs = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtTabs/AtTabs'));
  const AtPanel = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const AtPagination = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtPagination/AtPagination'));
  const PaginationItemsCount = defineAsyncComponent(() => import('~/components/core/PaginationItemsCount'));
  const AtSkeleton = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtSkeleton/AtSkeleton'));
</script>
<template>
  <div>
    <h2 class="header-title">Новости</h2>
    <div>
      <at-input
        class="w-full md:w-96 mb-6"
        v-model="historyQuery.search_text"
        label="Поиск"
        placeholder="Поиск по название"
      ></at-input>
    </div>
    <div class="mb-6" v-if="loading">
      <at-skeleton class="w-full h-96 rounded-lg" type="image"></at-skeleton>
    </div>
    <div v-else class="flex mb-6">
      <Carousel :autoplay="3500" :wrap-around="true">
        <Slide v-for="newsCard in news.data" :key="newsCard.id">
          <router-link
            :to="{ name: 'news.show', params: { id: newsCard.id } }"
            class="carousel__item w-full rounded-lg cursor-pointer"
          >
            <div class="w-full relative rounded-lg">
              <img
                class="rounded-lg object-top object-cover h-96 w-full opacity-95"
                :src="avatarPath(newsCard.image_path)"
                alt="фото"
              />
              <div class="absolute h-32 overflow-hidden bottom-10 left-20 w-72">
                <p
                  :class="{
                    '': newsCard.category[0].id === 2,
                    'text-white': newsCard.category[0].id === 9,
                  }"
                  class="text-xl font-semibold"
                >
                  {{ newsCard.title }}
                </p>
                <p
                  :class="{
                    'text-gray-800': newsCard.category[0].id === 2,
                    'text-white': newsCard.category[0].id === 9,
                  }"
                  class=""
                  v-html="newsCard.description"
                ></p>
              </div>
            </div>
          </router-link>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
    <div>
      <at-panel>
        <div>
          <div class="mb-10">
            <at-tabs v-model="currentTab" :items="tabItems"></at-tabs>
          </div>
          <div v-if="newsLoading" class="grid grid-cols-12 gap-6">
            <div class="xl:col-span-4 md:col-span-6 col-span-12" v-for="i in 12" :key="i">
              <at-skeleton class="w-full h-48 rounded" type="image"></at-skeleton>
              <at-skeleton class="my-4" type="label"></at-skeleton>
              <at-skeleton class="my-4 h-6 w-full" type="label"></at-skeleton>
              <at-skeleton class="my-2 w-full" type="label"></at-skeleton>
              <at-skeleton class="my-2 w-full" type="label"></at-skeleton>
              <at-skeleton class="my-2 w-full" type="label"></at-skeleton>
            </div>
          </div>
          <div v-else class="grid grid-cols-12 gap-6">
            <router-link
              :to="{ name: 'news.show', params: { id: news.id } }"
              class="xl:col-span-4 md:col-span-6 col-span-12 mb-4 cursor-pointer hover:opacity-70 active:opacity-100"
              v-for="news in allNews.data"
              :key="news.id"
            >
              <img class="w-full h-48 object-top object-cover rounded" :src="avatarPath(news.image_path)" alt="" />
              <div class="relative overflow-hidden max-h-44">
                <p class="text-gray-500 mt-2">{{ $filters.readableDate(news.published_at) }}</p>
                <p class="text-lg font-bold">{{ news.title }}</p>
                <div v-html="news.description"></div>
                <div class="h-32 absolute gradient-card bottom-0 w-full"></div>
              </div>
            </router-link>
          </div>
          <div class="pt-4 text-center" v-if="allNews?.data && allNews?.last_page !== 1">
            <div>
              <pagination-items-count class="mr-4 -ml-20" :items-meta="allNews" />
              <at-pagination v-model="historyQuery.page" :total="allNews?.last_page" />
            </div>
          </div>
        </div>
      </at-panel>
    </div>
  </div>
</template>
<style>
  .carousel__next {
    right: 3rem;
  }

  .carousel__prev {
    left: 3rem;
  }

  .gradient-card {
    background: linear-gradient(
      180deg,
      rgba(170, 208, 253, 0) 27.4%,
      rgba(170, 208, 253, 0) 27.4%,
      rgba(255, 255, 255, 0.97) 89.79%
    );
    border-radius: 0.25rem;
  }
</style>
