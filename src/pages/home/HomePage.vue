<script lang="ts" setup>
  import { defineAsyncComponent, reactive, ref } from 'vue';
  import { getNewsRequest } from '@/services/news.api';
  import { getNewEmployeesRequest, getUpcomingBirthdaysRequest } from '@/services/home.api';
  import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';

  //data
  const historyOfSuccess = ref<object>({});
  const birthdays = ref<object>({});
  const news = ref<object>({});
  const newEmployees = ref<object>({});

  //loading
  const newsLoading = ref<boolean>(false);
  const newEmployeesLoading = ref<boolean>(false);
  const historyLoading = ref<boolean>(false);
  const birthdayLoading = ref<boolean>(false);

  //query params
  const query = reactive({
    page: 1,
    per_page: 10,
    category_ids: [9],
    status_id: [2],
  });

  //options
  const breakpoints = ref<object>({
    700: { itemsToShow: 1 },
    900: { itemsToShow: 1.2 },
    1000: { itemsToShow: 1.4 },
    1100: { itemsToShow: 1.9 },
    1200: { itemsToShow: 2 },
    1300: { itemsToShow: 2.2 },
    1400: { itemsToShow: 2.5 },
    1500: { itemsToShow: 3 },
    1600: { itemsToShow: 3.5 },
  });

  const avatarPath = (avatar_path: string) => {
    return `${process.env.VUE_APP_STORAGE_API}${avatar_path}`;
  };

  const getHistoryOfSuccess = (): void => {
    historyLoading.value = true;
    getNewsRequest(query)
      .then(res => {
        historyOfSuccess.value = res?.data;
      })
      .finally(() => {
        historyLoading.value = false;
      });
  };

  const getNews = (): void => {
    newsLoading.value = true;
    getNewsRequest({ per_page: 10 })
      .then(res => {
        news.value = res.data;
      })
      .finally(() => {
        newsLoading.value = false;
      });
  };

  const getUpcomingBirthdays = (): void => {
    birthdayLoading.value = true;
    getUpcomingBirthdaysRequest({ per_page: 15 })
      .then(res => {
        birthdays.value = res?.data;
      })
      .finally(() => {
        birthdayLoading.value = false;
      });
  };

  const getNewEmployees = (): void => {
    newEmployeesLoading.value = true;
    getNewEmployeesRequest()
      .then(res => {
        newEmployees.value = res?.data;
      })
      .finally(() => {
        newEmployeesLoading.value = false;
      });
  };

  getUpcomingBirthdays();
  getNewEmployees();
  getHistoryOfSuccess();
  getNews();

  //aliftech-ui components
  const AtPanel = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const AtSkeleton = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtSkeleton/AtSkeleton'));
</script>
<template>
  <div class="grid grid-cols-12">
    <div class="col-span-7 2xl:col-span-8 pl-4">
      <div>
        <h2 class="header-title mb-8">Истории успеха</h2>
        <div v-if="historyLoading" class="flex space-x-6 ml-2 mb-10">
          <at-skeleton v-for="index in 3" :key="index" class="w-56 h-64 rounded" type="image"></at-skeleton>
        </div>
        <div v-else>
          <Carousel :breakpoints="breakpoints" :items-to-show="2.5" :wrap-around="false">
            <Slide v-for="slide in historyOfSuccess.data" :key="slide.id">
              <router-link
                :to="{ name: 'news.show', params: { id: slide.id } }"
                class="carousel__slide relative hover:opacity-80 cursor-pointer"
              >
                <img
                  class="w-56 h-64 rounded object-cover border border-primary-500"
                  :src="avatarPath(slide.images[0].path)"
                  alt=""
                />
                <div class="absolute h-52 w-56 left-0 bottom-0 card-gradient"></div>
                <div class="absolute left-3 bottom-3">
                  <p style="font-weight: 720; font-size: 18px; line-height: 20px" class="w-1/2">
                    {{ slide.user.nickname }}
                  </p>
                </div>
              </router-link>
            </Slide>
            <template #slide>
              <div class="carousel__slide relative">
                <div class="w-56 h-64 bg-gray-200"></div>
              </div>
            </template>
            <template #addons>
              <navigation />
              <pagination />
            </template>
          </Carousel>
        </div>
      </div>
      <div>
        <div v-if="newsLoading">
          <at-panel v-for="i in 2" :key="i" class="mt-8">
            <div class="flex space-x-6 w-full">
              <at-skeleton class="w-14 h-14" type="avatar"></at-skeleton>
              <div class="w-full">
                <div class="flex justify-between items-start">
                  <at-skeleton class="w-64 h-6 mb-4" type="label"></at-skeleton>
                  <at-skeleton type="label"></at-skeleton>
                </div>
                <at-skeleton class="w-full mb-2" type="label"></at-skeleton>
                <at-skeleton class="w-full mb-2" type="label"></at-skeleton>
                <at-skeleton class="w-full mb-2" type="label"></at-skeleton>
                <at-skeleton class="my-6 w-44" type="label"></at-skeleton>
                <at-skeleton class="h-64 w-4/6" type="image"></at-skeleton>
              </div>
            </div>
          </at-panel>
        </div>
        <div v-else>
          <div v-for="newsCard in news.data" :key="newsCard.id" class="mt-8">
            <at-panel>
              <div class="flex space-x-4">
                <div class="w-20 overflow-visible">
                  <img
                    class="w-14 h-14 rounded-full border border-primary-500 object-cover"
                    :src="avatarPath(newsCard.user.avatar_path)"
                    alt="аватар"
                  />
                </div>
                <div class="w-full">
                  <div class="flex justify-between w-full">
                    <p class="text-xl font-semibold">{{ newsCard.user.nickname }}</p>
                    <p class="text-gray-500">{{ $filters.readableDate(newsCard.published_at) }}</p>
                  </div>
                  <div>
                    <p class="font-semibold mt-1">{{ newsCard.title }}</p>
                    <div>
                      <div class="max-h-12 overflow-hidden mb-4" v-html="newsCard.description"></div>
                      <router-link
                        :to="{ name: 'news.show', params: { id: newsCard.id } }"
                        class="cursor-pointer text-lg hover:underline text-blue-400"
                      >
                        Показать полностью...
                      </router-link>
                      <div>
                        <img class="h-64 mt-4" :src="avatarPath(newsCard.image_path)" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </at-panel>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-5 2xl:col-span-4 pl-10">
      <div>
        <at-panel>
          <div class="relative h-20 flex items-center justify-center mb-6">
            <div
              style="background-color: #ebfeff"
              class="absolute rounded-tl-full rounded-r-full bg-blue-200 h-20 w-24 left-auto right-auto top-0"
            ></div>
            <div class="text-center absolute">
              <p class="text-2xl font-light">HAPPY</p>
              <p class="text-3xl font-semibold">BIRTHDAY</p>
            </div>
          </div>
          <div class="pt-2" v-if="birthdayLoading">
            <div class="my-5" v-for="i in 4" :key="i">
              <div class="flex w-full space-x-4">
                <div>
                  <at-skeleton class="w-14 h-14" type="avatar"></at-skeleton>
                </div>
                <div class="w-full">
                  <at-skeleton class="h-6 w-48 mb-2" type="label"></at-skeleton>
                  <at-skeleton type="label"></at-skeleton>
                </div>
              </div>
              <hr class="mt-5" />
            </div>
          </div>
          <div v-else class="max-h-96 overflow-y-auto">
            <div class="my-5 cursor-pointer" v-for="user in birthdays.data" :key="user.id">
              <router-link :to="{ name: 'family.show', params: { id: user.id } }">
                <div class="flex space-x-4 bg-">
                  <img
                    :class="{ 'border border-red-500 shadow': !user.days_left }"
                    class="w-14 h-14 object-cover rounded-full"
                    :src="avatarPath(user.avatar_path)"
                    alt="аватар"
                  />
                  <div>
                    <p class="text-lg font-semibold">{{ user.nickname }}</p>
                    <p v-if="!user.days_left" class="text-red-500 font-semibold">Сегодня</p>
                    <p v-else-if="user.days_left === 1" class="text-green-400 font-semibold">Завтра</p>
                    <p v-else class="text-gray-400">{{ $filters.readableDate(user.birth_date) }}</p>
                  </div>
                </div>
              </router-link>
              <hr class="mt-5" />
            </div>
          </div>
        </at-panel>
      </div>
      <div class="mt-6">
        <at-panel>
          <div class="relative h-20 flex items-center justify-center">
            <h3 class="text-xl font-semibold">Новые сотрудники</h3>
          </div>
          <div class="pt-2" v-if="newEmployeesLoading">
            <div class="my-5" v-for="i in 4" :key="i">
              <div class="flex w-full space-x-4">
                <div>
                  <at-skeleton class="w-14 h-14" type="avatar"></at-skeleton>
                </div>
                <div class="w-full">
                  <at-skeleton class="h-6 w-48 mb-2" type="label"></at-skeleton>
                  <at-skeleton class="w-40" type="label"></at-skeleton>
                </div>
              </div>
              <hr class="mt-5" />
            </div>
          </div>
          <div v-else class="max-h-96 overflow-y-auto">
            <div class="my-5 cursor-pointer" v-for="user in newEmployees.data" :key="user.id">
              <router-link :to="{ name: 'family.show', params: { id: user.id } }">
                <div class="flex space-x-4 bg-">
                  <img class="w-14 h-14 object-cover rounded-full" :src="avatarPath(user.avatar_path)" alt="аватар" />
                  <div>
                    <p class="text-lg font-semibold">{{ user.nickname }}</p>
                    <p class="text-gray-400">{{ user.user_position_current.position.name }}</p>
                  </div>
                </div>
              </router-link>
              <hr class="mt-5" />
            </div>
          </div>
        </at-panel>
      </div>
    </div>
  </div>
</template>
