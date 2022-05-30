<script setup>
  import { defineAsyncComponent, reactive, ref } from 'vue';
  import { useStore } from 'vuex';
  import {
    getEducationsRequest,
    getMyContactsRequest,
    getExperiencesRequest,
    getMyRewardsRequest,
    getMyReferralsRequest,
  } from '@/services/profile';
  import TelegramIcon from '@/assets/icons/telegram.svg';
  import MedalIcon from '@/assets/icons/medalIcon.png';

  const store = useStore();
  const contactsLoading = ref(false);
  const educationsLoading = ref(false);
  const experiencesLoading = ref(false);
  const rewardsLoading = ref(false);
  const referralLoading = ref(false);
  const user = store.state.core?.app?.auth_user;
  const social = reactive({
    emails: null,
    phones: null,
    social_medias: null,
  });
  const educations = ref({});
  const experiences = ref({});
  const rewards = ref({});
  const referrals = ref({});

  const getMyContacts = () => {
    contactsLoading.value = true;
    getMyContactsRequest({ per_page: 15 })
      .then(res => {
        social.phones = res.data?.phones?.data;
        social.emails = res.data?.emails?.data;
        social.social_medias = res.data?.social_medias?.data;
      })
      .finally(() => (contactsLoading.value = false));
  };

  const getEducations = () => {
    educationsLoading.value = true;
    getEducationsRequest({ per_page: 15 })
      .then(res => {
        educations.value = res.data?.data;
      })
      .finally(() => (educationsLoading.value = false));
  };

  const getExperiences = () => {
    experiencesLoading.value = true;
    getExperiencesRequest({ per_page: 25 })
      .then(res => {
        experiences.value = res.data?.data;
      })
      .finally(() => (experiencesLoading.value = false));
  };

  const getRewards = () => {
    rewardsLoading.value = true;
    getMyRewardsRequest({ per_page: 25 })
      .then(res => {
        rewards.value = res.data?.data;
      })
      .finally(() => (rewardsLoading.value = false));
  };

  const getMyReferrals = () => {
    referralLoading.value = true;
    getMyReferralsRequest({})
      .then(res => {
        referrals.value = res?.data;
      })
      .finally(() => {
        referralLoading.value = false;
      });
  };

  getMyContacts();
  getEducations();
  getExperiences();
  getRewards();
  getMyReferrals();
  const PositionsCard = defineAsyncComponent(() => import('@/components/profile/PositionsCard'));
  const PhoneIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/PhoneIcon'));
  const MailIcon = defineAsyncComponent(() => import('@heroicons/vue/outline/MailIcon'));
  const AcademicCapIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/AcademicCapIcon'));
  const StarIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/StarIcon'));
  // const BriefcaseIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/BriefcaseIcon'));
  const AtSkeleton = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtSkeleton/AtSkeleton'));
  const AtPanel = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPanel/AtPanel'));
</script>

<template>
  <div>
    <div>
      <at-panel>
        <div v-if="contactsLoading" class="flex w-full p-10">
          <div class="w-1/4 mr-10">
            <at-skeleton class="w-44 mb-3 h-6" type="label" />
            <at-skeleton class="w-48 h-6" type="label" />
          </div>
          <div class="w-1/4">
            <div class="mb-4" v-for="i in 3" :key="i">
              <at-skeleton class="mb-3 w-52 h-5" type="label" />
              <at-skeleton class="w-44" type="label" />
            </div>
          </div>
          <div class="ml-10">
            <div class="mb-4" v-for="i in 3" :key="i">
              <at-skeleton class="mb-3 w-52 h-5" type="label" />
              <at-skeleton class="w-44" type="label" />
            </div>
          </div>
        </div>
        <div v-else class="flex w-full p-10">
          <h2 class="mr-10 w-1/4 text-2xl font-bold">Контактная информация</h2>
          <div class="w-1/4">
            <div class="mb-4 mt-1" v-for="phone in social.phones" :key="phone.id">
              <div class="flex items-center">
                <PhoneIcon class="w-6 h-6 mr-4 text-primary-500" />
                <p class="text-lg font-medium">+{{ phone.body }}</p>
              </div>
              <p class="text-lg text-gray-500 ml-11">{{ phone.note }}</p>
            </div>
          </div>
          <div class="ml-10">
            <div class="mb-4" v-for="email in social.emails" :key="email.id">
              <div class="flex items-end">
                <MailIcon class="w-6 h-6 mr-4 text-primary-500" />
                <p class="text-lg font-medium">{{ email.body }}</p>
              </div>
              <p class="text-lg text-gray-500 ml-10">{{ email.note }}</p>
            </div>
            <div>
              <a target="_blank" :href="`http://t.me/${user.tg_user_name}`">
                <div class="flex items-end hover:text-primary-500 hover:underline">
                  <img :src="TelegramIcon" class="w-6 h-6 mr-4 text-primary-500" alt="icon" />
                  <p class="text-lg font-medium">@{{ user.tg_user_name }}</p>
                </div>
              </a>
              <p class="text-lg text-gray-500 ml-11">t.me</p>
            </div>
          </div>
        </div>
      </at-panel>
      <div class="mt-10">
        <at-panel v-if="educationsLoading">
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
            <h2 class="mr-10 w-1/4 text-2xl font-bold">Образование</h2>
            <div>
              <div class="mb-4 mt-1" v-for="education in educations" :key="education.id">
                <div class="flex items-center">
                  <AcademicCapIcon class="w-6 h-6 mr-4 text-primary-500" />
                  <p class="text-lg font-medium">{{ education?.school?.name }}</p>
                </div>
                <p class="text-lg text-gray-500 ml-10">{{ education?.degree?.name }}</p>
              </div>
            </div>
          </div>
        </at-panel>
      </div>
      <PositionsCard :user="user" :experiences="experiences" :loading="experiencesLoading" />
      <div class="mt-10">
        <at-panel v-if="rewardsLoading">
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
            <p class="text-gray-400 text-lg my-auto" v-else>Здесь будут добавлены ваши награды</p>
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
                  <router-link :to="{ name: 'family.show', params: { id: referral.id } }">
                    <p>{{ referral.nickname }}</p>
                  </router-link>
                </div>
              </div>
              <p class="text-gray-400 text-lg my-auto" v-else>Приглашенных людей пока нет...</p>
              <hr class="my-8" />
              <h3 class="text-lg font-semibold">Пригласитель</h3>
              <div v-if="referrals?.referrer?.length">
                <div class="mb-4 mt-1" v-for="referrer in referrals?.referrer" :key="referrer.id">
                  <router-link :to="{ name: 'family.show', params: { id: referrer.id } }">
                    <p>{{ referrer.nickname }}</p>
                  </router-link>
                </div>
              </div>
              <p class="text-gray-400 text-lg my-auto" v-else>Нет данных</p>
            </div>
          </div>
        </at-panel>
      </div>
    </div>
  </div>
</template>
