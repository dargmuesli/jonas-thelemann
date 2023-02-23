<template>
  <div class="p-4 md:px-8">
    <div class="breadcrumbs">
      <Breadcrumbs>
        <template #breadcrumb="{ to, title }">
          <NuxtLink :to="localePath(to)">
            {{ title }}
          </NuxtLink>
        </template>
      </Breadcrumbs>
    </div>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
