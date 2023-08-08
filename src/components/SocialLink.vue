<template>
  <div class="border dark:border-gray-700 text-center">
    <a class="px-4" :href="to">
      <slot />
    </a>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  to: string
}
withDefaults(defineProps<Props>(), {})
</script>
