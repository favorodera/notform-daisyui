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
        <NotField
          v-slot="{ methods, name,errors }"
          name="plan"
        >
          <fieldset class="fieldset">

            <legend class="fieldset-legend">
              Subscription Plan
            </legend>

            <div class="fieldset-label">
              Choose your subscription plan.
            </div>

            <div class="validator flex flex-col gap-3">
              <label
                for="plan-basic"
                class="
                  flex cursor-pointer items-center justify-between rounded-lg
                  border p-4 transition
                  hover:bg-base-200
                "
                :class="{
                  'ring-2 ring-primary': state.plan === 'basic',
                  'border-error': errors.length
                }"
              >
                <div class="flex-1">
                  <div class="fieldset-legend">Basic</div>
                  <div class="label text-sm">
                    For individuals and small teams
                  </div>
                </div>
                <input
                  id="plan-basic"
                  type="radio"
                  name="plan"
                  value="basic"
                  :aria-invalid="!!errors.length"
                  class="radio radio-primary"
                  :checked="state.plan === 'basic'"
                  v-bind="methods"
                  @change="(event) => {
                    const target = event.target as HTMLInputElement;
                    setState({ plan: target.value }, false)
                    methods.onChange()
                  }"
                >
              </label>

              <label
                for="plan-pro"
                class="
                  flex cursor-pointer items-center justify-between rounded-lg
                  border p-4 transition
                  hover:bg-base-200
                "
                :class="{
                  'ring-2 ring-primary': state.plan === 'pro',
                  'border-error': errors.length
                }"
              >
                <div class="flex-1">
                  <div class="fieldset-legend">Pro</div>
                  <div class="label text-sm">
                    For businesses with higher demands
                  </div>
                </div>
                <input
                  id="plan-pro"
                  type="radio"
                  name="plan"
                  value="pro"
                  class="radio radio-primary"
                  :checked="state.plan === 'pro'"
                  :aria-invalid="!!errors.length"
                  v-bind="methods"
                  @change="(event) => {
                    const target = event.target as HTMLInputElement;
                    setState({ plan: target.value }, false)
                    methods.onChange()
                  }"
                >
              </label>

            </div>

            <NotMessage
              :name="name"
              class="validator-hint"
            />
          </fieldset>
        </NotField>

        <div class="divider" />

        <NotField
          v-slot="{ methods, name, errors }"
          name="billingPeriod"
        >
          <div class="fieldset">
            <label
              :for="name"
              class="fieldset-legend"
            >
              Billing Period
            </label>
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
            <div class="label">
              Choose how often you want to be billed.
            </div>
            <NotMessage
              :name="name"
              class="validator-hint"
            />
          </div>
        </NotField>

        <div class="divider" />

        <NotField
          v-slot="{ methods, name, errors }"
          name="addons"
        >
          <fieldset class="fieldset">

            <legend class="fieldset-legend">
              Add-ons
            </legend>

            <div class="label">
              Select additional features you'd like to include.
            </div>

            <div class="validator flex flex-col gap-3">

              <div
                v-for="addon in addons"
                :key="addon.id"
                class="join join-horizontal gap-4"
              >

                <input
                  :id="addon.id"
                  type="checkbox"
                  class="validator checkbox"
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

                  <label
                    :for="addon.id"
                    class="label p-0"
                  >
                    {{ addon.title }}
                  </label>

                  <div class="text-xs opacity-70">
                    {{ addon.description }}
                  </div>
                </div>
              </div>
            </div>

            <NotMessage
              :name="name"
              class="validator-hint"
            />
          </fieldset>
        </NotField>

        <div class="divider" />

        <NotField
          v-slot="{ methods, name, errors }"
          name="emailNotifications"
        >
          <div
            class="validator join join-horizontal items-center justify-between"
          >
            <div class="join join-vertical">
              <label
                :for="name"
                class="fieldset-legend"
              >
                Email Notifications
              </label>
              <div class="label text-wrap">
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

