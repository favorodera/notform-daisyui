<script setup lang="ts">
import { NotForm, NotField, NotMessage } from 'notform'

const { id, reset, submit, state } = useNotForm({
  schema: z.object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters.')
      .max(10, 'Username must be at most 10 characters.')
      .regex(
        /^\w+$/,
        'Username can only contain letters, numbers, and underscores.',
      ),
  }),
  initialState: {
    username: '',
  },
  onSubmit: data => newToast(data),
})

</script>

<template>
  <Display
    :form-id="id"
    title="Input"
  >
    <NotForm
      :id
      @submit="submit"
      @reset="reset()"
    >
      <NotField
        v-slot="{ errors, name, methods }"
        name="username"
      >
        <div class="fieldset">
          <label
            :for="name"
            class="fieldset-legend"
          >
            Username
          </label>

          <input
            :id="name"
            v-bind="methods"
            v-model="state.username"
            type="text"
            class="validator input w-full"
            placeholder="daisyui"
            autocomplete="username"
            :aria-invalid="!!errors.length"
          >

          <div
            class="label text-wrap"
          >
            This is your public display name. Must be between 3 and 10
            characters. Must only contain letters, numbers, and
            underscores.
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
