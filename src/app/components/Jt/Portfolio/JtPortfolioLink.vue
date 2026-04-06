<template>
  <div
    class="inline-block border border-gray-200 text-center text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <a class="px-4" :href="to">
      <slot />
    </a>
  </div>
</template>

<script setup lang="ts">
const { to } = defineProps<{
  to: string
}>()
</script>
