<script setup lang="ts">
import { NotForm, NotField, NotMessage } from 'notform'

const { id, reset, submit, state } = useNotForm({
  schema: z.object({
    twoFactor: z.boolean().refine(val => val === true, {
      message: 'It is highly recommended to enable two-factor authentication.',
    }),
  }),
  initialState: {
    twoFactor: false,
  },
  onSubmit: data => newToast(data),
})

</script>

<template>
  <Display
    :form-id="id"
    title="Switch"
  >
    <NotForm
      :id
      @submit="submit"
      @reset="reset()"
    >
      <div class="fieldset">
        <NotField
          v-slot="{ errors, name, methods }"
          name="twoFactor"
        >


          <div
            class="validator join join-horizontal items-center justify-between"
          >

            <div class="join join-vertical">
              <label
                :for="name"
                class="fieldset-legend"
              >
                Multi-factor authentication
              </label>

              <div
                class="label text-wrap"
              >
                Enable two-factor authentication to add an extra layer of security to your account.
              </div>

            </div>

            <input
              :id="name"
              v-model="state.twoFactor"
              type="checkbox"
              class="toggle"
              :name="name"
              v-bind="methods"
              :checked="state.twoFactor"
              :aria-invalid="!!errors.length"
            >

          </div>

          <NotMessage
            :name="name"
            class="validator-hint"
          />
        </NotField>
      </div>
    </NotForm>
  </Display>
</template>
