<template>
  <div>
    <h1>{{ t('title') }}</h1>
    <VioForm
      data-static-form-name="contact"
      :form="v$"
      :is-form-sent="isFormSent"
      @submit="submit"
    >
      <VioFormInput
        id-label="input-name"
        is-required
        :placeholder="t('placeholderName')"
        :title="t('name')"
        type="text"
        :value="v$.name"
        @input="form.name = $event"
      >
        <template #stateError>
          <!-- <VioFormInputStateError
            :form-input="v$.name"
            validation-property="maxLength"
          >
            {{ t('globalValidationLength') }}
          </VioFormInputStateError> -->
          <VioFormInputStateError
            :form-input="v$.name"
            validation-property="required"
          >
            {{ t('globalValidationRequired') }}
          </VioFormInputStateError>
        </template>
      </VioFormInput>
      <VioFormInputEmailAddress
        :form-input="v$.emailAddress"
        is-required
        @input="form.emailAddress = $event"
      />
      <VioFormInput
        id-label="input-message"
        is-required
        :title="t('message')"
        type="text"
        :value="v$.message"
      >
        <textarea
          v-if="v$.message"
          id="input-message"
          class="form-input"
          :placeholder="t('placeholderMessage')"
          rows="10"
          :value="v$.message.$model"
          @input="form.message = ($event.target as HTMLInputElement).value"
        />
        <template #stateError>
          <!-- <VioFormInputStateError
            :form-input="v$.message"
            validation-property="maxLength"
          >
            {{ t('globalValidationLength') }}
          </VioFormInputStateError> -->
          <VioFormInputStateError
            :form-input="v$.message"
            validation-property="required"
          >
            {{ t('globalValidationRequired') }}
          </VioFormInputStateError>
        </template>
      </VioFormInput>
    </VioForm>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

definePageMeta({
  colorMode: 'light',
})

const { t } = useI18n()

// data
const form = reactive({
  emailAddress: ref<string>(),
  name: ref<string>(),
  message: ref<string>(),
})
const isFormSent = ref(false)

// methods
const submit = async (e: Event) =>
  !(await isFormValid({ v$, isFormSent })) ? e.preventDefault() : undefined

// vuelidate
const rules = {
  emailAddress: {
    // maxLength: maxLength(100),
    required,
  },
  name: {
    // maxLength: maxLength(250),
    required,
  },
  message: {
    // maxLength: maxLength(100),
    required,
  },
}
const v$ = useVuelidate(rules, form)

// initialization
useHeadDefault({ title: t('title') })
</script>

<i18n lang="yaml">
de:
  message: Nachricht
  name: Name
  placeholderMessage: Guten Tag, …
  placeholderName: Manu Musterperson
  title: Kontakt
en:
  message: Message
  name: Name
  placeholderMessage: Hello, …
  placeholderName: Person Doe
  title: Contact
</i18n>
