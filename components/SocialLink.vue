<template>
  <div class="border text-center">
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
