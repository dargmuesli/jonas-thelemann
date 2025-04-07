<template>
  <div>
    <slot />
    <CookieControl :locale="locale" />
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '@dargmuesli/nuxt-cookie-control/runtime/types.js'
import type { WritableComputedRef } from 'vue'

const i18n = useI18n()

// data
const locale = i18n.locale as WritableComputedRef<Locale>
</script>
