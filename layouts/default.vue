<template>
  <div class="p-4 md:px-8" :data-is-loading="isLoading">
    <main>
      <slot />
    </main>
    <CookieControl :locale="locale" />
  </div>
</template>

<script setup lang="ts">
const loadingId = Math.random()
const loadingIds = useState('loadingIds', () => [loadingId])
const { locale } = useI18n()

// computations
const isLoading = computed(() => !!loadingIds.value.length)

// lifecycle
onMounted(() => loadingIds.value.splice(loadingIds.value.indexOf(loadingId), 1))

// initialization
useHeadLayout()
</script>
