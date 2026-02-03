<script setup lang="ts">
import { NotForm, NotField, NotMessage } from 'notform'

const { id, reset, submit, state } = useNotForm({
  schema: z.object({
    language: z
      .string()
      .min(1, 'Please select your spoken language.')
      .refine(value => value !== 'auto', {
        message:
          'Auto-detection is not allowed. Please select a specific language.',
      }),
  }),
  initialState: {
    language: '',
  },
  onSubmit: data => newToast(data),
})

const spokenLanguages = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Italian', value: 'it' },
  { label: 'Chinese', value: 'zh' },
  { label: 'Japanese', value: 'ja' },
] as const

</script>

<template>
  <Display
    :form-id="id"
    title="Select"
  >
    <NotForm
      :id
      @submit="submit"
      @reset="reset()"
    >

      <NotField
        v-slot="{ errors, name, methods }"
        name="language"
      >
        <label
          :for="name"
          class="fieldset"
        >

          <span class="fieldset-legend">Spoken Language</span>

          <div
            class="fieldset-label text-wrap"
          >
            For best results, select the language you speak.
          </div>

          <select
            :id="name"
            v-bind="methods"
            v-model="state.language"
            class="validator select w-full"
            :aria-invalid="!!errors.length"
          >
            <option
              value=""
              disabled
              selected
              hidden
            >
              Select
            </option>

            <option value="auto">
              Auto
            </option>
            
            <option
              v-for="language in spokenLanguages"
              :key="language.value"
              :value="language.value"
              :selected="language.value === state.language"
            >
              {{ language.label }}
            </option>
          </select>

          <NotMessage
            :name="name"
            class="validator-hint hidden"
          />
        </label>

      </NotField>

    </NotForm>

  </Display>
</template>
