<script lang="ts" setup>
import { NotField, NotForm, NotMessage } from 'notform'

const schema = z.object({
  title: z
    .string()
    .min(5, 'Bug title must be at least 5 characters.')
    .max(32, 'Bug title must be at most 32 characters.'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters.')
    .max(100, 'Description must be at most 100 characters.'),
})

const { id, state, submit, reset } = useNotForm({
  schema,
  initialState: {
    title: '',
    description: '',
  },
  onSubmit: data => newToast(data),
})
</script>

<template>
  <Display
    title="Demo"
    :form-id="id"
  >
    <NotForm
      :id
      @submit="submit"
      @reset="reset()"
    >
      <NotField
        v-slot="{ errors, name, methods }"
        name="title"
      >

        <label
          :for="name"
          class="fieldset"
        >
          <span class="fieldset-legend">Bug Title</span>

          <input
            :id="name"
            v-bind="methods"
            v-model="state.title"
            type="text"
            class="validator input w-full"
            placeholder="Login button not working on mobile"
            autocomplete="off"
            :aria-invalid="!!errors.length"
          >

          <NotMessage
            :name="name"
            class="validator-hint hidden"
          />
        </label>

      </NotField>

      <NotField
        v-slot="{ methods, name, errors }"
        name="description"
      >

        <label
          :for="name"
          class="fieldset"
        >

          <span class="fieldset-legend">Description</span>

          <textarea
            :id="name"
            v-bind="methods"
            v-model="state.description"
            class="validator textarea min-h-24 w-full resize-none"
            placeholder="I'm having an issue with the login button on mobile."
            :rows="6"
            autocomplete="off"
            :aria-invalid="!!errors.length"
          />

          <NotMessage
            :name="name"
            class="validator-hint hidden"
          />

        </label>

      </NotField>

    </NotForm>

  </Display>
</template>
