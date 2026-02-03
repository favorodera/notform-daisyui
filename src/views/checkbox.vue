<script setup lang="ts">
import { NotForm, NotField, NotMessage } from 'notform'

const tasks = [
  {
    id: 'push',
    label: 'Push notifications',
  },
  {
    id: 'email',
    label: 'Email notifications',
  },
] as const

const { id, submit, reset, setState, state } = useNotForm({
  schema: z.object({
    responses: z.boolean(),
    tasks: z
      .array(z.string())
      .min(1, 'Please select at least one notification type.')
      .refine(
        value => value.every(task => tasks.some(t => t.id === task)),
        {
          message: 'Invalid notification type selected.',
        },
      ),
  }),
  initialState: {
    responses: true,
    tasks: [],
  },
  onSubmit: data => newToast(data),
})
</script>

<template>
  <Display
    :form-id="id"
    title="Checkbox"
  >
    <NotForm
      :id
      @submit="submit"
      @reset="reset()"
    >

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Responses
        </legend>

        <div class="fieldset-label text-wrap">
          Get notified for requests that take time, like research or image
          generation.
        </div>

        <NotField
          v-slot="{ name,errors,methods}"
          name="responses"
        >
      
          <label
            :for="name"
            class="validator join join-horizontal gap-4"
          >
            <input
              :id="name"
              v-model="state.responses"
              v-bind="methods"
              :name="name"
              type="checkbox"
              disabled
              :checked="state.responses"
              class="checkbox"
              :aria-invalid="!!errors.length"
            >
            <span class="fieldset-legend">Push notifications</span>
          </label>
          
          <NotMessage
            :name="name"
            class="validator-hint hidden"
          />
        </NotField>
      </fieldset>

      <div class="divider" />

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Tasks
        </legend>

        <div class="fieldset-label text-wrap">
          Get notified when tasks you've created have updates.
        </div>

        <NotField
          v-slot="{ name,errors,methods}"
          name="tasks"
        >
      
          <label
            v-for="task in tasks"
            :key="task.id"
            :for="task.id"
            class="validator join join-horizontal gap-4"
          >
            <input
              :id="task.id"
              :name="name"
              :value="task.id"
              type="checkbox"
              class="checkbox"
              :checked="state.tasks.includes(task.id)"
              :aria-invalid="!!errors.length"
              v-bind="methods"
              @change="(event) => {
                const target = event.target as HTMLInputElement;
                const newTasks = target.checked
                  ? [...state.tasks, task.id]
                  : state.tasks.filter(id => id !== task.id);
        
                setState({ tasks: newTasks },false);
                methods.onChange()
              }"
            >
            <span class="fieldset-legend">{{ task.label }}</span>
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
