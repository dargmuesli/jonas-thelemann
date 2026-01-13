<template>
  <div class="flex flex-col items-center gap-2 text-sm leading-6">
    <div class="mx-auto mt-8 flex w-9/12 items-center">
      <VioLayoutHr />
      <JtLayoutLogo
        background-fill="rgba(0,0,0,0)"
        class="mx-12 h-12 w-12 opacity-50 brightness-0 dark:opacity-60 dark:invert"
      />
      <VioLayoutHr />
    </div>
    <span class="flex justify-center">
      {{ t('copyright', { year }) }}
    </span>
    <div class="flex gap-4">
      <VioLink is-colored :to="localePath('/legal-notice')">
        {{ t('legalNotice') }}
      </VioLink>
      <VioLink is-colored :to="localePath('/privacy-policy')">
        {{ t('privacyPolicy') }}
      </VioLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()

// computations
const year = computed(() =>
  runtimeConfig.public.vio.isTesting ? 1337 : new Date().getFullYear(),
)
</script>

<i18n lang="yaml">
de:
  copyright: © {year} Jonas Thelemann. Alle Rechte vorbehalten.
  legalNotice: Impressum
  privacyPolicy: Datenschutzerklärung
en:
  copyright: © {year} Jonas Thelemann. All rights reserved.
  legalNotice: Legal notice
  privacyPolicy: Privacy policy
</i18n>
