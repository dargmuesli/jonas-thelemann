<template>
  <div
    class="w-full h-full flex"
    style="background: linear-gradient(to bottom, #dbf4ff, #fff1f1)"
  >
    <img
      alt="Jonas in Tutzing."
      src="/assets/static/images/tutzing.jpg"
      width="436"
      height="630"
    />
    <div class="flex flex-col justify-center ml-16">
      <h1 class="text-7xl">{{ title }}</h1>
      <div class="text-3xl text-gray-600 mt-8">{{ description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  description: String
  title: String
}
withDefaults(defineProps<Props>(), {})
</script>
