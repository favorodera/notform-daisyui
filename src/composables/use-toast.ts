/* eslint-disable @typescript-eslint/no-explicit-any */
export const toasts = ref<any[]>([])

export function newToast(data: any) {
  toasts.value.push(data)

  setTimeout(() => {
    toasts.value.shift()
  }, 5000)

}
