<script setup lang="ts">
import { NotForm, NotField, NotMessage } from 'notform'

const addons = [
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Advanced analytics and reporting',
  },
  {
    id: 'backup',
    title: 'Backup',
    description: 'Automated daily backups',
  },
  {
    id: 'support',
    title: 'Priority Support',
    description: '24/7 premium customer support',
  },
] as const

const plans = [
  {
    id: 'basic',
    title: 'Basic',
    description: 'For individuals and small teams',
  },
  {
    id: 'pro',
    title: 'Pro',
    description: 'For businesses with higher demands',
  },
] as const

const { id, reset, submit, state, setState } = useNotForm({
  schema: z.object({
    plan: z
      .string()
      .min(1, 'Please select a subscription plan')
      .refine(value => value === 'basic' || value === 'pro', {
        message: 'Invalid plan selection. Please choose Basic or Pro',
      }),
    billingPeriod: z
      .string()
      .min(1, 'Please select a billing period'),
    addons: z
      .array(z.string())
      .min(1, 'Please select at least one add-on')
      .max(3, 'You can select up to 3 add-ons')
      .refine(
        value => value.every(addon => addons.some(a => a.id === addon)),
        {
          message: 'You selected an invalid add-on',
        },
      ),
    emailNotifications: z.boolean(),
  }),
  initialState: {
    plan: 'basic',
    billingPeriod: '',
    addons: [],
    emailNotifications: false,
  },
  onSubmit: data => newToast(data),
})
</script>

<template>
  <Display
    :form-id="id"
    title="Complex Form"
  >
    <NotForm
      :id
      @submit="submit"
      @reset="reset()"
    >
      <div class="flex flex-col">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">
            Subscription Plan
          </legend>

          <div class="fieldset-label text-wrap">
            Choose your subscription plan.
          </div>

          <NotField
            v-slot="{ methods, name, errors }"
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
                type="radio"
                :name="name"
                :value="plan.id"
                class="radio"
                :checked="state.plan === plan.id"
                :aria-invalid="!!errors.length"
                v-bind="methods"
                @change="(event) => {
                  const target = event.target as HTMLInputElement;
                  setState({ plan: target.value }, false)
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

        <div class="divider" />

        <NotField
          v-slot="{ methods, name, errors }"
          name="billingPeriod"
        >
          <label
            :for="name"
            class="fieldset"
          >
            <span class="fieldset-legend">Billing Period</span>

            <div class="fieldset-label text-wrap">
              Choose how often you want to be billed.
            </div>

            <select
              :id="name"
              v-model="state.billingPeriod"
              class="validator select w-full"
              :aria-invalid="!!errors.length"
              v-bind="methods"
            >
              <option
                value=""
                disabled
                selected
                hidden
              >
                Select
              </option>
              <option value="monthly">
                Monthly
              </option>
              <option value="yearly">
                Yearly
              </option>
            </select>

            <NotMessage
              :name="name"
              class="validator-hint hidden"
            />
          </label>
        </NotField>

        <div class="divider" />

        <fieldset class="fieldset">
          <legend class="fieldset-legend">
            Add-ons
          </legend>

          <div class="fieldset-label text-wrap">
            Select additional features you'd like to include.
          </div>

          <NotField
            v-slot="{ methods, name, errors }"
            name="addons"
          >
            <label
              v-for="addon in addons"
              :key="addon.id"
              :for="addon.id"
              class="validator join join-horizontal gap-4"
            >
              <input
                :id="addon.id"
                type="checkbox"
                class="checkbox"
                :checked="state.addons.includes(addon.id)"
                :aria-invalid="!!errors.length"
                v-bind="methods"
                @change="(event) => {
                  const target = event.target as HTMLInputElement;
                  const newAddons = target.checked
                    ? [...state.addons, addon.id]
                    : state.addons.filter(id => id !== addon.id);
                  setState({ addons: newAddons }, false);
                  methods.onChange()
                }"
              >
              <div class="flex flex-col">
                <span class="fieldset-legend">{{ addon.title }}</span>
                <span class="text-xs opacity-70">{{ addon.description }}</span>
              </div>
            </label>

            <NotMessage
              :name="name"
              class="validator-hint hidden"
            />
          </NotField>
        </fieldset>

        <div class="divider" />

        <NotField
          v-slot="{ methods, name, errors }"
          name="emailNotifications"
        >
          <label
            :for="name"
            class="
              validator join join-horizontal cursor-pointer items-center gap-4
            "
          >
            <div class="flex-1">
              <div class="fieldset-legend">Email Notifications</div>
              <div class="fieldset-label text-wrap">
                Receive email updates about your subscription
              </div>
            </div>

            <input
              :id="name"
              v-model="state.emailNotifications"
              type="checkbox"
              class="validator toggle"
              :name="name"
              v-bind="methods"
              :checked="state.emailNotifications"
              :aria-invalid="!!errors.length"
            >
          </label>
          <NotMessage
            :name="name"
            class="validator-hint hidden"
          />
        </NotField>
      </div>
    </NotForm>

  </Display>
</template>

