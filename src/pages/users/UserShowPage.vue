<script setup>
  import { defineAsyncComponent, reactive, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { getUserRequest } from '@/services/users.api';
  import { getReferralsRequest, getRewardsRequest } from '@/services/profile';
  import TelegramIcon from '@/assets/icons/telegram.svg';
  import MedalIcon from '@/assets/icons/medalIcon.png';

  const loading = ref(false);
  const rewardLoading = ref(false);
  const referralLoading = ref(false);
  const user = ref({});
  const rewards = ref({});
  const referrals = ref({});
  const route = useRoute();
  const userId = ref(route.params.id);
  const rewardsQuery = reactive({
    user_id: userId.value,
    per_page: 15,
  });

  const avatarPath = avatar_path => {
    return `${process.env.VUE_APP_STORAGE_API}${avatar_path}`;
  };

  const getUser = () => {
    loading.value = true;
    getUserRequest(userId.value)
      .then(res => {
        window.scrollTo(0, 0);
        user.value = res?.data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const getRewards = () => {
    rewardLoading.value = true;
    getRewardsRequest(rewardsQuery)
      .then(res => {
        rewards.value = res?.data?.data;
      })
      .finally(() => {
        rewardLoading.value = false;
      });
  };

  const getReferrals = () => {
    referralLoading.value = true;
    getReferralsRequest({
      user_id: userId.value,
      per_page: 15,
    })
      .then(res => {
        referrals.value = res?.data;
      })
      .finally(() => {
        referralLoading.value = false;
      });
  };

  watch(
    userId,
    () => {
      getUser();
      getRewards();
      getReferrals();
    },
    { deep: true }
  );

  getUser();
  getRewards();
  getReferrals();

  const MailIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/MailIcon'));
  const StarIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/StarIcon'));
  const EmojiHappyIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/EmojiHappyIcon'));
  const AtSkeleton = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtSkeleton/AtSkeleton'));
  const AtPanel = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const AtTooltip = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtTooltip/AtTooltip'));
</script>
<template>
  <div>
    <div v-if="loading" class="flex">
      <div>
        <at-skeleton style="height: 27.5rem; width: 25rem"></at-skeleton>
      </div>
      <div class="w-full">
        <at-panel class="w-full h-full">
          <div class="p-10 flex w-full">
            <div class="w-full mr-4">
              <at-skeleton class="h-10 mb-8 w-5/6"></at-skeleton>
              <at-skeleton type="label" class="mb-2"></at-skeleton>
              <at-skeleton type="label" class="h-5 mb-8"></at-skeleton>
              <at-skeleton type="label" class="mb-2"></at-skeleton>
              <at-skeleton type="label" class="h-5 mb-8 w-72"></at-skeleton>
              <at-skeleton type="label" class="mb-2"></at-skeleton>
              <at-skeleton type="label" class="h-6 w-64"></at-skeleton>
            </div>
            <div>
              <at-skeleton class="w-12 mb-4 rounded-full"></at-skeleton>
              <at-skeleton class="w-12 rounded-full"></at-skeleton>
            </div>
          </div>
        </at-panel>
      </div>
    </div>
    <div v-else class="bg-white rounded-xl flex w-full">
      <div class="w-3/5">
        <img
          style="height: 27.5rem; width: 25rem"
          class="object-cover rounded-l-lg"
          :src="avatarPath(user?.avatar_path)"
          alt="Аватар"
        />
      </div>
      <div class="p-16 flex w-full">
        <div class="w-full">
          <h1 class="text-3xl w-96 font-bold">
            {{ user.nickname }}
          </h1>
          <p class="text-gray-400 text-lg mt-6">Возраст:</p>
          <p class="text-xl font-semibold">{{ user.age }} года</p>
          <p class="text-gray-400 text-lg mt-6">Email:</p>
          <p class="text-xl font-semibold">{{ user.email }}</p>
          <p class="text-gray-400 text-lg mt-6">Телеграмм:</p>
          <a v-if="user.tg_user_name" target="_blank" :href="`http://t.me/${user.tg_user_name}`">
            <div class="flex items-center">
              <img class="w-6 h-6 mr-2" :src="TelegramIcon" alt="" />
              <p class="text-lg font-semibold text-primary-500">@{{ user.tg_user_name }}</p>
            </div>
          </a>
          <p v-else class="text-gray-500 text-lg">Нет данных</p>
        </div>
        <div class="w-14">
          <at-tooltip position="top">
            <template #body>
              <p>Дать фидбек</p>
            </template>
            <div class="rounded-full px-2 py-1 bg-primary-500 w-12 hover:bg-primary-800 cursor-pointer">
              <MailIcon class="w-6 h-6 text-white mx-1" />
            </div>
          </at-tooltip>
          <at-tooltip>
            <template #body>
              <p>Оценить вежливость</p>
            </template>
            <div class="rounded-full px-2 py-1 bg-green-400 hover:bg-green-500 w-12 mt-4 cursor-pointer">
              <EmojiHappyIcon class="w-6 h-6 text-white mx-1" />
            </div>
          </at-tooltip>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <at-panel v-if="loading">
        <div class="flex w-full p-10">
          <div class="w-1/4 mr-10">
            <at-skeleton class="w-44 h-6" type="label" />
          </div>
          <div class="w-1/4">
            <div class="mb-8 ml-4" v-for="i in 4" :key="i">
              <at-skeleton class="mb-3 w-72 h-5" type="label" />
              <at-skeleton class="w-44" type="label" />
            </div>
          </div>
        </div>
      </at-panel>
      <at-panel v-else>
        <div class="flex w-full p-10">
          <div class="mr-10 w-1/4">
            <h2 class="text-2xl font-bold">История должностей</h2>
          </div>
          <div class="mt-4 p-3 overflow-y-auto" style="max-height: 18rem">
            <div
              :class="{ 'border-white': index === user.experience_in_alif.length - 1 }"
              class="flex items-start relative border-l-2"
              v-for="(experience, index) in user.experience_in_alif"
              :key="experience.id"
            >
              <div
                style="margin-left: 0.175rem"
                :class="{ 'bg-blue-50': index === 0 }"
                class="w-6 h-6 rounded-full absolute -top-2 -left-4"
              >
                <div
                  :class="{ 'bg-blue-500': index === 0 }"
                  class="w-3 h-3 rounded-full bg-gray-200 relative m-auto my-1.5"
                ></div>
              </div>
              <div class="pb-8 ml-10 -mt-3">
                <p class="text-lg font-medium">
                  {{ experience.position_name.split(',')[0] }}
                  <span class="text-base text-gray-500">
                    | {{ $filters.readableDate(experience.started_at) }} –
                    {{ experience.ended_at ? $filters.readableDate(experience.ended_at) : 'сейчас' }}
                  </span>
                </p>
                <p class="text-gray-500">{{ experience.position_name.split(',').splice(1, 5).join(', ') }}</p>
              </div>
            </div>
          </div>
        </div>
      </at-panel>
    </div>
    <div class="mt-10">
      <at-panel v-if="loading">
        <div class="flex w-full p-10">
          <div class="w-1/4 mr-10">
            <at-skeleton class="w-44 h-6" type="label" />
          </div>
          <div class="w-1/4">
            <div class="mb-4" v-for="i in 3" :key="i">
              <at-skeleton class="mb-3 w-72 h-5" type="label" />
              <at-skeleton class="w-44" type="label" />
            </div>
          </div>
        </div>
      </at-panel>
      <at-panel v-else>
        <div class="flex w-full p-10">
          <h2 class="mr-10 w-1/4 text-2xl font-bold">Награды</h2>
          <div v-if="rewards?.length" class="w-3/4">
            <div class="mb-4 mt-1" v-for="reward in rewards" :key="reward.id">
              <div class="flex items-start space-x-6 w-full">
                <div style="min-width: 2rem; min-height: 2rem" class="rounded-full mt-1 bg-yellow-50">
                  <StarIcon v-if="reward?.reward_type_id === 1" class="w-6 h-6 text-yellow-400 mt-1 ml-1" />
                  <img v-else class="w-6 h-6 ml-1 mt-1" :src="MedalIcon" alt="иконка" />
                </div>
                <div style="width: 30rem">
                  <p class="text-lg">
                    {{ reward.why_comment }}
                  </p>
                  <p class="text-gray-500 text-right">{{ $filters.readableDate(reward?.approval_date) }}</p>
                  <hr class="my-1" />
                </div>
              </div>
            </div>
          </div>
          <p class="text-gray-400 text-lg my-auto" v-else>Здесь будут добавлены полученные награды</p>
        </div>
      </at-panel>
    </div>
    <div class="mt-10">
      <at-panel v-if="referralLoading">
        <div class="flex w-full p-10">
          <div class="w-1/4 mr-10">
            <at-skeleton class="w-44 h-6" type="label" />
          </div>
          <div class="w-1/4">
            <div class="mb-4" v-for="i in 3" :key="i">
              <at-skeleton class="mb-3 w-72 h-5" type="label" />
              <at-skeleton class="w-44" type="label" />
            </div>
          </div>
        </div>
      </at-panel>
      <at-panel v-else>
        <div class="flex w-full p-10">
          <h2 class="mr-10 w-1/4 text-2xl font-bold">Реферальная программа</h2>
          <div class="w-3/4">
            <h3 class="text-lg font-semibold">Приглашённые</h3>
            <div v-if="referrals?.referrals?.length">
              <div class="mb-4 mt-1" v-for="referral in referrals?.referrals" :key="referral.id">
                <p @click="userId = referral.id" class="text-primary-500 text-lg">{{ referral.nickname }}</p>
              </div>
            </div>
            <p class="text-gray-400 my-auto" v-else>Приглашенных людей пока нет...</p>
            <hr class="my-8" />
            <h3 class="text-lg font-semibold">Пригласитель</h3>
            <div v-if="referrals?.referrer">
              <div class="mb-4 mt-1">
                <p @click="userId = referrals?.referrer.id" class="text-primary-500 text-lg">
                  {{ referrals?.referrer.nickname }}
                </p>
              </div>
            </div>
            <p class="text-gray-400 my-auto" v-else>Нет данных</p>
          </div>
        </div>
      </at-panel>
    </div>
  </div>
</template>
