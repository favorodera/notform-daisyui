<script lang="ts" setup>
import { NotField, NotForm, NotArrayField, NotMessage } from 'notform'

const { state, id, submit, reset, schema } = useNotForm({
  schema: z.object({
    emails: z
      .array(
        z.object({
          address: z.string().email('Enter a valid email address.'),
        }),
      )
      .min(1, 'Add at least one email address.')
      .max(5, 'You can add up to 5 email addresses.'),
  }),
  initialState: {
    emails: [{ address: '' }, { address: '' }],
  },
  onSubmit: data => newToast(data),
})
</script>

<template>
  <Display
    :form-id="id"
    title="Array Fields"
  >
    <NotForm
      :id="id"
      @submit="submit"
      @reset="reset()"
    >

      <NotArrayField
        v-slot="{ fields, remove, append }"
        name="emails"
        :schema="schema.shape.emails"
      >
      
        <fieldset class="fieldset">
          <legend class="fieldset-legend">
            Email Addresses
          </legend>
          <div class="fieldset-label text-wrap">
            Add up to 5 email addresses where we can contact you.
          </div>

          <div class="flex flex-col gap-2">

            <NotField
              v-for="(field, index) in fields"
              :key="field.key"
              v-slot="{ errors, methods, name }"
              :name="`emails[${index}].address`"
            >
              <label
                :for="name"
                class="validator join w-full"
              >
                <input
                  :id="name"
                  v-model="state.emails[index]!.address"
                  type="email"
                  class="validator input join-item w-full"
                  placeholder="name@example.com"
                  autocomplete="email"
                  :aria-invalid="!!errors.length"
                  v-bind="methods"
                >
                <button
                  v-if="fields.length > 1"
                  type="button"
                  class="btn join-item"
                  :aria-label="`Remove email ${index + 1}`"
                  @click="remove(index)"
                >
                  x
                </button>
              </label>
              <NotMessage
                :name="name"
                class="validator-hint hidden"
              />
            </NotField>

            <button
              type="button"
              class="btn mt-2 items-center btn-sm btn-neutral"
              :disabled="state.emails.length >= 5"
              @click="append({ address: '' })"
            >
              Add Email Address
            </button>

          </div>

        </fieldset>
      
        <NotMessage
          name="emails"
          class="text-error"
        />
      </NotArrayField>

    </NotForm>
  </Display>
</template>
