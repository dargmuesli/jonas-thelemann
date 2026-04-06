<template>
  <section>
    <h2 class="text-2xl">{{ title }}</h2>
    <ul
      class="mt-2 ml-4.5 flex list-disc flex-col gap-1 marker:text-gray-500 dark:marker:text-gray-400"
    >
      <slot />
    </ul>
  </section>
</template>

<script setup lang="ts">
const { title } = defineProps<{
  title: string
}>()
</script>
