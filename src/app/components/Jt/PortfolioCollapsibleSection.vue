<template>
  <section class="relative isolate flex flex-col">
    <h2 class="text-2xl">{{ title }}</h2>
    <div class="relative mt-2 overflow-hidden">
      <div class="transition-all duration-200 ease-out">
        <div
          v-if="!isExpanded && hiddenCount > 0"
          class="dark:from-background-dark pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-linear-to-t from-white from-0% to-transparent to-100%"
        />
        <ul
          class="ml-4.5 flex list-disc flex-col gap-1 marker:text-gray-500 dark:marker:text-gray-400"
        >
          <slot :is-expanded />
        </ul>
      </div>
    </div>
    <div
      v-if="hiddenCount && !isExpanded"
      class="absolute -bottom-3.5 flex w-full justify-center"
    >
      <button
        :aria-label="`${isExpanded ? t('collapse') : t('expand')} ${title}`"
        :aria-expanded="isExpanded"
        class="flex items-center gap-1.5 border border-gray-200 px-2.5 py-0.5 text-sm font-medium transition-colors dark:border-gray-700"
        :class="[
          isExpanded
            ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
            : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
        ]"
        @click="isExpanded = !isExpanded"
      >
        <svg
          class="size-4 transition-transform duration-300"
          :class="!isExpanded && '-rotate-180'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 14-7-7m0 0-7 7m7-7v12"
          />
        </svg>
        <span>{{ isExpanded ? t('collapse') : t('expand') }}</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const { items } = defineProps<{
  title: string
  items: { isVisible?: boolean }[]
}>()

const { t } = useI18n()

const isExpanded = defineModel<boolean>('isExpanded', { default: false })

const hiddenCount = computed(() =>
  items.reduce((count, item) => count + (item.isVisible === false ? 1 : 0), 0),
)
</script>

<i18n lang="yaml">
de:
  collapse: einklappen
  expand: ausklappen
en:
  collapse: collapse
  expand: expand
</i18n>
