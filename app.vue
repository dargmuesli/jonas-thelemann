<template>
  <div :data-is-loading="isLoading">
    <NuxtLayout>
      <SeoKit
        :site-description="t('globalOgSeoDescription')"
        :language="locale"
      />
      <OgImageStatic :alt="t('globalOgImageAlt')" component="OgImage" />
      <NuxtPage />
      <CookieControl :locale="locale" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { locale } = useI18n()
const cookieControl = useCookieControl()

const { loadingIds, indicateLoadingDone } = useLoadingDoneIndicator('app')

// computations
const isLoading = computed(() => !!loadingIds.value.length)

// lifecycle
onMounted(() => indicateLoadingDone())
watch(
  () => cookieControl.cookiesEnabledIds.value,
  (current, previous) => {
    if (
      (!previous?.includes('ga') && current?.includes('ga')) ||
      (previous?.includes('ga') && !current?.includes('ga'))
    ) {
      window.location.reload()
    }
  },
  { deep: true }
)
// initialization
useHeadLayout()
</script>
