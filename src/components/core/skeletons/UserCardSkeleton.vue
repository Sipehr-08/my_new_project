<script setup>
  import { defineAsyncComponent } from 'vue';
  const AtPanel = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const AtSkeleton = defineAsyncComponent(() => import('@/plugins/aliftech-ui/components/AtSkeleton/AtSkeleton'));
</script>
<template>
  <div>
    <div>
      <at-panel :overflow="false">
        <div>
          <at-skeleton class="h-32 w-32 mx-auto" type="avatar" />
        </div>
        <div class="mt-4 mb-10">
          <at-skeleton class="w-48 mx-auto mb-4" type="label" />
          <at-skeleton class="w-40 mx-auto" type="label" />
        </div>
        <div>
          <at-skeleton class="w-32 mx-auto" type="label" />
        </div>
      </at-panel>
    </div>
  </div>
</template>
