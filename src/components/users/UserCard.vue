<script setup>
  import { defineAsyncComponent, defineProps } from 'vue';

  const props = defineProps({
    user: {
      type: Object,
      required: true,
    },
  });

  const avatarPath = avatar_path => {
    return `${process.env.VUE_APP_STORAGE_API}${avatar_path}`;
  };

  //aliftech-ui components
  const LocationIcon = defineAsyncComponent(() => import('@heroicons/vue/outline/LocationMarkerIcon'));
  const AtPanel = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPanel/AtPanel'));
</script>
<template>
  <div class="h-full">
    <at-panel class="h-full hover:bg-gray-100 cursor-pointer" :overflow="false">
      <div class="h-full relative">
        <div class="flex w-full justify-center mb-4">
          <img class="h-36 rounded-full object-cover" :src="avatarPath(props.user.avatar_path)" alt="avatar" />
        </div>
        <div class="text-center mb-14">
          <h3 class="text-lg font-bold">{{ props.user.nickname }}</h3>
          <p class="text-gray-400">{{ props.user.user_position_current?.position?.name }}</p>
        </div>
        <div class="flex items-end justify-center w-full bottom-0 absolute">
          <LocationIcon class="h-5 w-5 mr-2 text-gray-400" />
          {{ props.user.user_position_current?.office?.city?.name_ru }}
        </div>
      </div>
    </at-panel>
  </div>
</template>
