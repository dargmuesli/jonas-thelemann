<template>
  <div v-if="typeof route.query.code === 'string'" class="flex flex-col gap-4">
    <span class="rounded-sm border p-4 wrap-break-word">
      {{ route.query.code }}
    </span>
    <VioButtonColored :aria-label="t('copy')" @click="copy">
      {{ t('copy') }}
    </VioButtonColored>
  </div>
  <VioError v-else :description="t('codeError')" :status-code="400" />
</template>

<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()

// methods
const copy = async () => {
  if (typeof route.query.code !== 'string') return

  await copyText(route.query.code)
  showToast({ title: t('copySuccess') })
}

// initialization
useHeadDefault({ title: 'OAuth' })
</script>

<i18n lang="yaml">
de:
  codeError: Code fehlt
  copy: Kopieren
  copySuccess: In die Zwischenablage kopiert
en:
  codeError: Code is missing
  copy: Copy
  copySuccess: Copied to the clipboard
</i18n>
