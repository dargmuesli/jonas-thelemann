<template>
  <div>
    <VioCardStateInfo v-if="isFormSent" class="flex flex-col gap-2">
      <span class="text-xl font-bold">
        {{ t('thankYouTitle') }}
      </span>
      <span>
        {{ t('thankYouBody') }}
      </span>
    </VioCardStateInfo>
    <section v-else>
      <h1>{{ t('title') }}</h1>
      <FormContact @submit="submit" />
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const alertError = useAlertError()
const backendFetch = useServiceFetch({
  name: 'backend',
})

// data
const isFormSent = ref(false)

// methods
const submit = async (body: object) => {
  try {
    await backendFetch('/api/contact', {
      method: 'POST',
      body,
    })

    isFormSent.value = true
  } catch (error) {
    alertError({
      ...(error instanceof Error ? { error } : {}),
      messageI18n: t('fetchError'),
    })
  }
}

// initialization
useHeadDefault({ title: t('title') })
</script>

<i18n lang="yaml">
de:
  fetchError: Es gab einen Fehler beim Versenden der Nachricht
  thankYouBody: Deine Nachricht wurde versendet. Ich werde mich in Kürze bei dir melden.
  thankYouTitle: Danke!
  title: Kontakt
en:
  fetchError: There was an error sending the message
  thankYouBody: Your message has been sent. I'll get back to you shortly.
  thankYouTitle: Thank you!
  title: Contact
</i18n>
