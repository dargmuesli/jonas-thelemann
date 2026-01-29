<template>
  <VioFormInput
    :class="{
      hidden: !isVisible && !formInput.$error,
    }"
    :title="t('captcha')"
    :value="formInput"
  >
    <NuxtTurnstile
      ref="turnstileRef"
      :class="{ 'h-16.25': isVisible }"
      :options="{
        'error-callback': () => (isLoading = false),
        'expired-callback': () => emit('input', undefined),
      }"
      @update:model-value="update"
    />
    <VioFormInputStateError
      v-if="!isVisible"
      :form-input="formInput"
      validation-property="required"
    >
      {{ t('globalValidationRequired') }}
    </VioFormInputStateError>
    <template v-if="isVisible" #stateError>
      <VioFormInputStateError
        :form-input="formInput"
        validation-property="required"
      >
        {{ t('globalValidationRequired') }}
      </VioFormInputStateError>
    </template>
    <template v-if="!isVisible && isLoading" #stateInfo>
      <VioFormInputStateInfo>
        {{ t('globalStatusLoading') }}
      </VioFormInputStateInfo>
    </template>
    <template v-if="formInput.$error" #assistance>
      <VioButtonColored :aria-label="t('reset')" @click="reset">
        {{ t('reset') }}
        <template #prefix>
          <!-- <IHeroiconsArrowPath /> -->
        </template>
      </VioButtonColored>
    </template>
  </VioFormInput>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'

withDefaults(
  defineProps<{
    formInput: BaseValidation
  }>(),
  {},
)

const emit = defineEmits<{
  input: [event?: string]
}>()

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()

// refs
const turnstileRef = ref()

// data
const isLoading = ref(true)

// computations
const isVisible = computed(
  () => !runtimeConfig.public.vio.isTesting,
  // TODO: implement invisible widget type with fallback in case of required user interaction (https://github.com/maevsi/maevsi/issues/1239)
  // !['1x00000000000000000000BB', '2x00000000000000000000BB'].includes(
  //   config.public.turnstile.siteKey
  // )
)

// methods
const reset = () => {
  isLoading.value = true
  turnstileRef.value.reset()
}
const update = (e: string) => {
  isLoading.value = false
  emit('input', e)
}
</script>

<i18n lang="yaml">
de:
  captcha: Captcha
  reset: Captcha neu laden
en:
  captcha: Captcha
  reset: Reload captcha
</i18n>
