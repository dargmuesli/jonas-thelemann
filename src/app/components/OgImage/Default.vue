<template>
  <div
    class="flex h-full w-full flex-nowrap bg-[linear-gradient(to_bottom,#dbf4ff,#fff1f1)]"
  >
    <img
      alt="Jonas in Wiesbaden."
      class="object-cover"
      src="/assets/static/images/wiesbaden.jpg"
      width="436"
      height="630"
    />
    <span class="mx-16 flex flex-1 flex-col justify-center gap-16">
      <!-- eslint-disable-next-line prettier/prettier -->
      <h1 class="truncate leading-[1.1875] text-7xl">
        {{ title }}
      </h1>
      <div class="text-3xl text-gray-600">
        {{ description }}
      </div>
    </span>
  </div>
</template>

<script setup lang="ts">
const { description, title } = defineProps<{
  description: string
  title: string
}>()
</script>

<script lang="ts">
export default {
  name: 'OgImage',
}
</script>
