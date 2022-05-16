<script setup>
  import { defineAsyncComponent, reactive, ref } from 'vue';
  import { useStore } from 'vuex';
  import {
    getEducationsRequest,
    getMyContactsRequest,
    getExperiencesRequest,
    getMyRewardsRequest,
  } from '@/services/profile';
  import TelegramIcon from '@/assets/icons/telegram.svg';

  const store = useStore();
  const contactsLoading = ref(false);
  const educationsLoading = ref(false);
  const experiencesLoading = ref(false);
  const rewardsLoading = ref(false);
  const user = store.state.core?.app?.auth_user;
  const social = reactive({
    emails: null,
    phones: null,
    social_medias: null,
  });
  const educations = ref({});
  const experiences = ref({});
  const rewards = ref({});

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

  getMyContacts();
  getEducations();
  getExperiences();
  getRewards();
  const PositionsCard = defineAsyncComponent(() => import('@/components/profile/PositionsCard'));
  const PhoneIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/PhoneIcon'));
  const MailIcon = defineAsyncComponent(() => import('@heroicons/vue/outline/MailIcon'));
  const AcademicCapIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/AcademicCapIcon'));
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
                  <p class="text-lg font-medium">{{ education.school.name }}</p>
                </div>
                <p class="text-lg text-gray-500 ml-10">{{ education.degree.name }}</p>
              </div>
            </div>
          </div>
        </at-panel>
      </div>
      <PositionsCard :user="user" :experiences="experiences" :loading="experiencesLoading" />
      <!--      <div class="mt-10">-->
      <!--        <at-panel v-if="experiencesLoading">-->
      <!--          <div class="flex w-full p-10">-->
      <!--            <div class="w-1/4 mr-10">-->
      <!--              <at-skeleton class="w-44 h-6" type="label" />-->
      <!--            </div>-->
      <!--            <div class="w-1/4">-->
      <!--              <div class="mb-4" v-for="i in 3" :key="i">-->
      <!--                <at-skeleton class="mb-3 w-72 h-5" type="label" />-->
      <!--                <at-skeleton class="w-44" type="label" />-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </at-panel>-->
      <!--        <at-panel v-else>-->
      <!--          <div class="flex w-full p-10">-->
      <!--            <div class="mr-10 w-1/4">-->
      <!--              <h2 class="text-2xl font-bold">Стаж работы</h2>-->
      <!--              <p class="text-lg text-gray-500">-->
      <!--                Общий стаж {{ user.whole_experiences.year }}г. {{ user.whole_experiences.month }}м.-->
      <!--                {{ user.whole_experiences.day }}д-->
      <!--              </p>-->
      <!--            </div>-->
      <!--            <div>-->
      <!--              <div class="mb-10">-->
      <!--                <div class="flex items-center">-->
      <!--                  <BriefcaseIcon class="w-6 h-6 mr-6 text-primary-500" />-->
      <!--                  <p class="text-lg font-medium">ОАО «Алиф Банк»</p>-->
      <!--                </div>-->
      <!--                <p class="text-lg text-gray-500 ml-12">-->
      <!--                  {{ $filters.readableDate(user.experience_in_alif?.[user.experience_in_alif?.length - 1].started_at) }}-->
      <!--                  – сейчас-->
      <!--                </p>-->
      <!--              </div>-->
      <!--              <div class="flex items-start" v-for="(experience, index) in experiences" :key="experience.id">-->
      <!--                <div :class="{ 'bg-blue-50': index === 0 }" class="w-6 h-6 rounded-full relative -mt-2">-->
      <!--                  <div-->
      <!--                    :class="{ 'bg-blue-500': index === 0 }"-->
      <!--                    class="w-3 h-3 rounded-full bg-gray-200 relative m-auto my-1.5"-->
      <!--                  ></div>-->
      <!--                </div>-->
      <!--                <div :class="{ 'border-l-2': index !== experiences.length - 1 }" class="pb-8 pl-10 -ml-3">-->
      <!--                  <p class="text-lg font-medium -mt-3">-->
      <!--                    {{ experience.position_name.split(',')[0] }}-->
      <!--                    <span class="text-base text-gray-500">-->
      <!--                      / {{ $filters.readableDate(experience.started_at) }} –-->
      <!--                      {{ experience.ended_at ? $filters.readableDate(experience.ended_at) : 'сейчас' }}-->
      <!--                    </span>-->
      <!--                  </p>-->
      <!--                  <p class="text-gray-500">{{ experience.position_name.split(',').splice(1, 5).join(', ') }}</p>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </at-panel>-->
      <!--      </div>-->
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
            <div>
              <div class="mb-4 mt-1" v-for="reward in rewards" :key="reward.id">
                <div class="flex items-center">
                  <AcademicCapIcon class="w-6 h-6 mr-4 text-primary-500" />
                  <p class="text-lg font-medium">{{ education.school.name }}</p>
                </div>
                <p class="text-lg text-gray-500 ml-10">{{ education.degree.name }}</p>
              </div>
            </div>
          </div>
        </at-panel>
      </div>
    </div>
  </div>
</template>
