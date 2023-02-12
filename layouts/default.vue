<template>
  <div class="p-4 md:px-8">
    <main>
      <slot />
    </main>
    <CookieControl :locale="locale" />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

// initialization
useHeadLayout()
</script>
