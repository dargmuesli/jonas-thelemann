<template>
  <div
    class="flex h-full w-full flex-nowrap bg-[linear-gradient(to_bottom,_#dbf4ff,_#fff1f1)]"
  >
    <img
      alt="Jonas in Tutzing."
      src="/assets/static/images/tutzing.jpg"
      width="436"
      height="630"
    />
    <span class="mx-16 flex flex-1 flex-col justify-center">
      <h1 class="truncate text-7xl">
        {{ title }}
      </h1>
      <div class="mt-16 text-3xl text-gray-600">
        {{ description }}
      </div>
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  description: string
  title: string
}
withDefaults(defineProps<Props>(), {})
</script>

<script lang="ts">
export default {
  name: 'OgImage',
}
</script>
