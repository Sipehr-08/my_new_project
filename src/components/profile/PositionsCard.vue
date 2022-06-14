<script setup>
  import { defineAsyncComponent, defineProps } from 'vue';

  const props = defineProps({
    user: {
      type: Object,
      required: true,
    },
    experiences: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  });

  //aliftech-ui components
  const AtSkeleton = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtSkeleton/AtSkeleton'));
  const AtPanel = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const BriefcaseIcon = defineAsyncComponent(() => import('@heroicons/vue/solid/BriefcaseIcon'));
</script>
<template>
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
        <div class="mr-10 w-1/4">
          <h2 class="text-2xl font-bold">Стаж работы</h2>
          <p class="text-lg text-gray-500">
            Общий стаж {{ props.user.whole_experiences.year }}г. {{ props.user.whole_experiences.month }}м.
            {{ props.user.whole_experiences.day }}д
          </p>
        </div>
        <div>
          <div class="mb-10">
            <div class="flex items-center">
              <BriefcaseIcon class="w-6 h-6 mr-6 text-primary-500" />
              <p class="text-lg font-medium">ОАО «Алиф Банк»</p>
            </div>
            <p class="text-lg text-gray-500 ml-12">
              {{
                $filters.readableDate(
                  props.user.experience_in_alif?.[props.user.experience_in_alif?.length - 1].started_at
                )
              }}
              – сейчас
            </p>
          </div>
          <div
            :class="{ 'border-white': index === props.experiences.length - 1 }"
            class="flex items-start relative border-l-2"
            v-for="(experience, index) in props.experiences"
            :key="experience.id"
          >
            <div
              style="margin-left: 0.172rem"
              :class="{ 'bg-blue-50': index === 0 }"
              class="w-6 h-6 rounded-full absolute -top-2 -left-4"
            >
              <div
                :class="{ 'bg-blue-500': index === 0 }"
                class="w-3 h-3 rounded-full bg-gray-200 relative m-auto my-1.5"
              ></div>
            </div>
            <div class="pb-8 ml-10">
              <p class="text-lg font-medium -mt-3">
                {{ experience.position_name.split(',')[0] }}
                <span class="text-base text-gray-500">
                  / {{ $filters.readableDate(experience.started_at) }} –
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
</template>
