<template>
  <div>
    <VioCardStateInfo
      v-if="'success' in route.query"
      class="flex flex-col gap-2"
    >
      <span class="text-xl font-bold">
        {{ t('thankYouTitle') }}
      </span>
      <span>
        {{ t('thankYouBody') }}
      </span>
    </VioCardStateInfo>
    <section v-else>
      <h1>{{ t('title') }}</h1>
      <FormContact />
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  colorMode: 'light',
})

const { t } = useI18n()
const route = useRoute()

// initialization
useHeadDefault({ title: t('title') })
</script>

<i18n lang="yaml">
de:
  thankYouBody: Deine Nachricht wurde versendet. Ich werde mich in Kürze bei dir melden.
  thankYouTitle: Danke!
  title: Kontakt
en:
  thankYouBody: Your message has been sent. I'll get back to you shortly.
  thankYouTitle: Thank you!
  title: Contact
</i18n>
