<template>
  <img
    alt="Open Graph image."
    fetchpriority="high"
    src="/__og_image__/og.png"
  />
  <!-- TODO: remove dynamic src string (https://github.com/nuxt/nuxt/issues/18920) -->
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>
