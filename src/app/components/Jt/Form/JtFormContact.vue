<template>
  <VioForm :form="v$" :is-form-sent="isFormSent" @submit.prevent="submit">
    <VioFormInput
      id-label="input-name"
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
      @input="form.emailAddress = $event"
    />
    <VioFormInput
      id-label="input-message"
      :title="t('message')"
      type="textarea"
      :value="v$.message"
    >
      <textarea
        v-if="v$.message"
        :id="`${siteConfig.id}-${
          runtimeConfig.public.vio.isInProduction ? 'prod' : 'dev'
        }-input-message`"
        class="form-input"
        name="message"
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
    <JtFormInputCaptcha
      :form-input="v$.captcha"
      @input="form.captcha = $event"
    />
  </VioForm>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

type FormValid = { emailAddress: string; name: string; message: string }

const emit = defineEmits<{
  submit: [form: FormValid]
}>()

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteConfig = useSiteConfig()

// data
const form = reactive({
  captcha: ref<string>(),
  emailAddress: ref<string>(),
  name: ref<string>(),
  message: ref<string>(),
})
const isFormSent = ref(false)

// methods
const submit = async () => {
  if (!(await isFormValid({ v$, isFormSent }))) return
  emit('submit', form as FormValid)
}

// vuelidate
const rules = {
  captcha: {
    required,
  },
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
</script>

<i18n lang="yaml">
de:
  message: Nachricht
  name: Name
  placeholderMessage: Guten Tag, …
  placeholderName: Manu Musterperson
en:
  message: Message
  name: Name
  placeholderMessage: Hello, …
  placeholderName: Person Doe
</i18n>
