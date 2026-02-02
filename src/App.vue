<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { toasts } from './composables/use-toast'

useColorMode()

const router = useRouter()

const pages = computed(() => {
  return router.getRoutes().filter(route => route.name).map((route) => {
    return {
      title: route.meta.title,
      path: route.path,
    }
  })
})

const navigation = computed(() => {
  const currentRoute = router.currentRoute.value
  const currentIndex = pages.value.findIndex(page => page.path === currentRoute.path)
  const prevPage = currentIndex > 0 ? pages.value[currentIndex - 1] : null
  const nextPage = currentIndex < pages.value.length - 1 ? pages.value[currentIndex + 1] : null
  return {
    prevPage,
    nextPage,
  }
})
</script>

<template>
  <main
    class="grid h-dvh auto-rows-min grid-cols-1 place-items-center gap-2 p-4"
  >
    <div
      class="
        mx-auto flex w-full max-w-xl flex-wrap items-center justify-between
        gap-2
      "
    >
      <button
        v-if="navigation.prevPage"
        class="btn btn-sm btn-primary"
      >
        <RouterLink :to="navigation.prevPage.path">
          {{ navigation.prevPage.title }}
        </RouterLink>
      </button>


      <button
        v-if="navigation.nextPage"
        class="btn ml-auto btn-sm btn-primary"
      >
        <RouterLink :to="navigation.nextPage.path">
          {{ navigation.nextPage.title }}
        </RouterLink>
      </button>
    </div>

    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>

    <div class="toast toast-center toast-top">
      <div
        v-for="(toast, index) in toasts"
        :key="index"
        role="alert"
        class="alert alert-vertical"
      >
        <div>
          <h3 class="font-bold">
            You submitted the following values:
          </h3>
          <pre class="text-xs">{{ toast }}</pre>
        </div>
      </div>
    </div>
  </main>
</template>
