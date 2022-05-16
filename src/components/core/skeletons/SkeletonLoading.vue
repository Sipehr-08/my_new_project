<template>
  <div>
    <at-panel>
      <div class="grid gap-8" :class="`grid-cols-${countCol}`">
        <at-skeleton class="mb-3" type="row" v-for="index in countCol * countRow" :key="index"></at-skeleton>
      </div>
    </at-panel>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import AtPanel from '~/plugins/aliftech-ui/components/AtPanel/AtPanel';
  import AtSkeleton from '~/plugins/aliftech-ui/components/AtSkeleton/AtSkeleton';
  export default defineComponent({
    name: 'CoreSkeleton',
    components: {
      AtPanel,
      AtSkeleton,
    },
    props: {
      countCol: {
        type: [String, Number],
        default: 3,
      },
      countRow: {
        type: [String, Number],
        default: 1,
      },
      showImages: {
        type: Boolean,
        default: true,
      },
      showDesc: {
        type: Boolean,
        default: true,
      },
    },
  });
</script>
