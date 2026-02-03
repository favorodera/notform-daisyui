<script setup lang="ts">
import { NotForm, NotField, NotMessage } from 'notform'

const { id, reset, submit, state } = useNotForm({
  schema: z.object({
    about: z
      .string()
      .min(3, 'About must be at least 3 characters.')
      .max(100, 'About must be at most 100 characters.'),
  }),
  initialState: {
    about: '',
  },
  onSubmit: data => submitToast(data),
})

</script>

<template>
  <Display
    title="Textarea"
    :form-id="id"
  >
    <NotForm
      :id
      @submit="submit"
      @reset="reset()"
    >
      <NotField
        v-slot="{ errors, name, methods }"
        name="about"
      >
        <div class="fieldset">
          <label
            :for="name"
            class="fieldset-legend"
          >
            More about you
          </label>

          <textarea
            :id="name"
            v-bind="methods"
            v-model="state.about"
            placeholder="I'm a software engineer..."
            class="textarea min-h-[120px] w-full"
            :aria-invalid="!!errors.length"
          />

          <div
            class="label text-wrap"
          >
            Tell us more about yourself. This will be used to help us personalize your experience.
          </div>

          <NotMessage
            :name="name"
            class="validator-hint"
          />
        </div>
      </NotField>
    </NotForm>

  </Display>
</template>
