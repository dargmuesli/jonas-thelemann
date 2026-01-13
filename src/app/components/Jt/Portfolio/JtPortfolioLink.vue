<template>
  <div
    class="inline-block border border-gray-200 text-center dark:border-gray-700"
  >
    <a class="px-4" :href="to">
      <slot />
    </a>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    to: string
  }>(),
  {},
)
</script>
