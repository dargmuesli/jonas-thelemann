<template>
  <div v-if="typeof route.query.code === 'string'" class="flex flex-col">
    <span class="break-words">
      {{ route.query.code }}
    </span>
    <VioButton :aria-label="t('copy')" class="border" @click="copy">
      {{ t('copy') }}
    </VioButton>
  </div>
</template>

<script setup lang="ts">
import clipboard from 'clipboardy'

definePageMeta({
  middleware: [
    (to) => {
      const localePath = useLocalePath()

      if (!to.query.code) {
        return navigateTo(localePath('/'))
      }
    },
  ],
})

const route = useRoute()
const { t } = useI18n()

// methods
const copy = async () => {
  if (typeof route.query.code !== 'string') return

  await clipboard.write(route.query.code)
  showToast({ title: t('copySuccess') })
}

// initialization
useSeoMeta({ title: 'OAuth' })
</script>

<i18n lang="yaml">
de:
  copy: Kopieren
  copySuccess: In die Zwischenablage kopiert
en:
  copy: Copy
  copySuccess: Copied to the clipboard
</i18n>
