<template>
  <VioLayout>
    <slot />
    <template #header>
      <div class="mb-8 flex items-center justify-between gap-4">
        <VioButtonColored
          :aria-label="t('home')"
          :is-primary="false"
          :to="localePath('/')"
        >
          <VioIconArrowLeft class="h-6 w-6 xl:h-8 xl:w-8" />
          {{ t('home') }}
        </VioButtonColored>
      </div>
    </template>
    <template #footer>
      <JtFooter />
    </template>
  </VioLayout>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<i18n lang="yaml">
de:
  home: Portfolio
en:
  home: Portfolio
</i18n>
