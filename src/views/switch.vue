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


      <NotField
        v-slot="{ name,errors,methods}"
        name="twoFactor"
      >
      
        <label
          :for="name"
          class="
            validator join join-horizontal cursor-pointer items-center gap-4
          "
        >

          <div class="flex-1">
            <div class="fieldset-legend">Multi-factor authentication</div>
            <div class="fieldset-label">Enable two-factor authentication to add an extra layer of security to your account.</div>
          </div>

          <input
            :id="name"
            v-model="state.twoFactor"
            type="checkbox"
            class="validator toggle"
            :name="name"
            v-bind="methods"
            :checked="state.twoFactor"
            :aria-invalid="!!errors.length"
          >
        </label>
          
        <NotMessage
          :name="name"
          class="validator-hint hidden"
        />
      </NotField>

    </NotForm>
  </Display>
</template>
