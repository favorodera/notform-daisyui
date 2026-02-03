<script lang="ts" setup>
import { NotForm, NotField, NotMessage } from 'notform'

const plans = [
  {
    id: 'starter',
    title: 'Starter (100K tokens/month)',
    description: 'For everyday use with basic features.',
  },
  {
    id: 'pro',
    title: 'Pro (1M tokens/month)',
    description: 'For advanced AI usage with more features.',
  },
  {
    id: 'enterprise',
    title: 'Enterprise (Unlimited tokens)',
    description: 'For large teams and heavy usage.',
  },
] as const

const { state, id, submit, reset, setState } = useNotForm({
  schema: z.object({
    plan: z.string().min(1, 'You must select a subscription plan to continue.'),
  }),
  initialState: {
    plan: '',
  },
  onSubmit: data => newToast(data),
})
</script>

<template>
  <Display
    :form-id="id"
    title="Radio Group"
  >
    <NotForm
      :id="id"
      @submit="submit"
      @reset="reset()"
    >

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Plan
        </legend>

        <div class="fieldset-label text-wrap">
          You can upgrade or downgrade your plan at any time.
        </div>

        <NotField
          v-slot="{ name,errors,methods}"
          name="plan"
        >
      
          <label
            v-for="plan in plans"
            :key="plan.id"
            :for="plan.id"
            class="
              validator join join-horizontal cursor-pointer items-center gap-4
              rounded-lg border p-4 transition
              hover:bg-base-200
            "
            style="color: var(--input-color)"
          >

            <div class="flex-1">
              <div class="fieldset-legend">{{ plan.title }}</div>
              <div class="fieldset-label">{{ plan.description }}</div>
            </div>

            <input
              :id="plan.id"
              :name="name"
              :value="plan.id"
              type="radio"
              class="radio"
              :checked="state.plan === plan.id"
              :aria-invalid="!!errors.length"
              v-bind="methods"
              @change="(event) => {
                const target = event.target as HTMLInputElement;
                setState({plan:target.value},false)
                methods.onChange()
              }"
            >
          </label>
          
          <NotMessage
            :name="name"
            class="validator-hint hidden"
          />
        </NotField>

      </fieldset>
    </NotForm>
  </Display>
</template>
