<template>
  <div :data-is-loading="isLoading">
    <NuxtLayout>
      <NuxtPage />
      <CookieControl :locale="locale" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const cookieControl = useCookieControl()

const loadingId = Math.random()
const loadingIds = useState('loadingIds', () => [loadingId])

// computations
const isLoading = computed(() => !!loadingIds.value.length)

// lifecycle
onMounted(() => loadingIds.value.splice(loadingIds.value.indexOf(loadingId), 1))
watch(
  () => cookieControl.cookiesEnabledIds.value,
  (current, previous) => {
    if (
      (!previous?.includes('google-analytics') &&
        current?.includes('google-analytics')) ||
      (previous?.includes('google-analytics') &&
        !current?.includes('google-analytics'))
    ) {
      window.location.reload()
    }
  },
  { deep: true }
)
</script>
