<template>
  <div>
    <h1>{{ t('title') }}</h1>
    <FormContact />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  colorMode: 'light',
})

const { t } = useI18n()

// initialization
useHeadDefault({ title: t('title') })
</script>

<i18n lang="yaml">
de:
  title: Kontakt
en:
  title: Contact
</i18n>
