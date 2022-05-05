<script setup>
  import { defineAsyncComponent, reactive } from 'vue';
  import { useStore } from 'vuex';
  import { getMyContactsRequest } from '@/services/profile';
  import TelegramIcon from '@/assets/icons/telegram.svg';

  const store = useStore();
  const user = store.state.core?.app?.auth_user;
  const social = reactive({
    emails: null,
    phones: null,
    social_medias: null,
  });

  const getMyContacts = () => {
    getMyContactsRequest({ per_page: 15 }).then(res => {
      console.log(user);
      social.phones = res.data?.phones?.data;
      social.emails = res.data?.emails?.data;
      social.social_medias = res.data?.social_medias?.data;
      console.log(social);
    });
  };

  getMyContacts();

  const AtPanel = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const PhoneIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/PhoneIcon'));
  const MailIcon = defineAsyncComponent(() => import('@heroicons/vue/outline/MailIcon'));
</script>

<template>
  <div>
    <div>
      <at-panel>
        <div class="flex w-full p-10">
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
                <div class="flex items-end">
                  <img :src="TelegramIcon" class="w-6 h-6 mr-4 text-primary-500" alt="icon" />
                  <p class="text-lg font-medium">@{{ user.tg_user_name }}</p>
                </div>
                <p class="text-lg text-gray-500 ml-11">t.me</p>
              </a>
            </div>
          </div>
        </div>
      </at-panel>
    </div>
  </div>
</template>
