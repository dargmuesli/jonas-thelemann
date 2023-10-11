<template>
  <div class="inline-block border text-center dark:border-gray-700">
    <a class="px-4" :href="to">
      <slot />
    </a>
  </div>
</template>

<script setup lang="ts">
interface Props {
  to: string
}
withDefaults(defineProps<Props>(), {})
</script>
