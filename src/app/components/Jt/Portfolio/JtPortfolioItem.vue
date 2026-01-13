<template>
  <li v-if="isVisible">
    <i18n-t
      keypath="titleSubtitle"
      class="text-gray-500 dark:text-gray-400"
      tag="span"
    >
      <template #title>
        <component
          :is="titleUrl ? 'a' : 'span'"
          class="text-text-dark dark:text-text-bright"
          :href="titleUrl"
        >
          {{ title }}
        </component>
      </template>
      <template #subtitle>
        <i18n-t v-if="hasPlaceTime" keypath="placeTime">
          <template #place>
            <a v-if="subtitlePlaceUrl" :href="subtitlePlaceUrl">
              {{ subtitlePlace }}
            </a>
            <span v-else>{{ subtitlePlace }}</span>
          </template>
          <template #time>
            {{ subtitleTime }}
          </template>
        </i18n-t>
        <a v-else-if="subtitleTextUrl" :href="subtitleTextUrl">
          {{ subtitleText }}
        </a>
        <span v-else>{{ subtitleText }}</span>
      </template>
    </i18n-t>
  </li>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isVisible?: boolean
    subtitlePlace?: string
    subtitlePlaceUrl?: string
    subtitleText?: string
    subtitleTextUrl?: string
    subtitleTime?: string
    title: string
    titleUrl?: string
  }>(),
  {
    isVisible: true,
    subtitlePlace: undefined,
    subtitlePlaceUrl: undefined,
    subtitleText: undefined,
    subtitleTextUrl: undefined,
    subtitleTime: undefined,
    titleUrl: undefined,
  },
)

const hasPlaceTime = computed(
  () => props.subtitlePlace !== undefined || props.subtitleTime !== undefined,
)

// needs to be specified for i18n-t usage
const { t } = useI18n() // eslint-disable-line @typescript-eslint/no-unused-vars
</script>

<i18n lang="yaml">
de:
  placeTime: '{place}, {time}'
  titleSubtitle: '{title} · {subtitle}'
en:
  placeTime: '{place}, {time}'
  titleSubtitle: '{title} · {subtitle}'
</i18n>
