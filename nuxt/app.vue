<template>
  <VioApp
    :site-description="t('globalOgSeoDescription')"
    og-image-component="Default"
    :og-image-alt="t('globalOgImageAlt')"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
