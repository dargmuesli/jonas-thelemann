<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const cookieControl = useCookieControl()

// lifecycle
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
