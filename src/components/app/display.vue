<script lang="ts" setup>
defineProps<{
  title: string
  formId: string
}>()
</script>

<template>
  <div
    class="
      card w-full bg-base-100 shadow-sm card-border
      sm:max-w-xl
    "
  >
    <div class="card-body">
      <h2 class="card-title">
        {{ title }}
      </h2>

      <p class="text-sm">
        Demo for {{ title }}
      </p>
    </div>

    <div class="card-body">
      <slot />
    </div>

    <div class="card-body">
      <button
        class="btn btn-secondary"
        :form="formId"
        type="reset"
      >
        Reset
      </button>
      <button
        class="btn btn-primary"
        :form="formId"
        type="submit"
      >
        Submit
      </button>
    </div>
  </div>
</template>
