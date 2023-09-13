<template>
  <div>
    <h1>{{ t('title') }}</h1>
    <form data-static-form-name="contact">
      <div>
        <label>{{ t('name') }}<input type="text" name="name" /></label>
      </div>
      <div>
        <label>{{ t('email') }}<input type="email" name="email" /></label>
      </div>
      <div>
        <label>{{ t('message') }}<textarea name="message"></textarea></label>
      </div>
      <button type="submit">{{ t('send') }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  email: E-Mail-Adresse
  message: Nachricht
  name: Name
  send: Senden
  title: Kontakt
en:
  email: Email address
  message: Message
  name: Name
  send: Send
  title: Contact
</i18n>
