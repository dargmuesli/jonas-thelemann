<template>
  <div :data-is-loading="isLoading">
    <slot />
  </div>
</template>

<script setup lang="ts">
const loadingId = Math.random()
const loadingIds = useState('loadingIds', () => [loadingId])

// computations
const isLoading = computed(() => !!loadingIds.value.length)

// lifecycle
onMounted(() => loadingIds.value.splice(loadingIds.value.indexOf(loadingId), 1))

// initialization
useHeadLayout()
</script>
