<template>
  <div class="flex bg-white">
    <img
      alt="Jonas in Wiesbaden."
      class="object-cover"
      src="/assets/static/images/wiesbaden.jpg"
      width="436"
      height="630"
    />
    <span class="mx-16 flex flex-col justify-center gap-16">
      <h1 class="text-7xl leading-[1.1875] font-bold" :style="titleLineClamp">
        {{ title }}
      </h1>
      <div class="text-3xl text-gray-600" :style="descriptionLineClamp">
        {{ description }}
      </div>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue'

const { description, title } = defineProps<{
  description: string
  title: string
}>()

const lineClampStyle: (value: string, maxLines: number) => StyleValue = (
  value: string,
  maxLines: number,
) => {
  if (!value)
    return {
      display: 'block',
      'text-overflow': 'ellipsis',
    }

  const wordCount = value.trim().split(/\s+/).length
  return {
    display: 'block',
    'line-clamp': Math.min(wordCount, maxLines),
    'text-overflow': 'ellipsis',
  }
}

const titleLineClamp = lineClampStyle(title, 2)
const descriptionLineClamp = lineClampStyle(description, 3)
</script>
