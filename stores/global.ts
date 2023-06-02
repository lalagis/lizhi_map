import { defineStore } from "pinia"

export const useGlobalStore = defineStore('global', () => {
  let count = $ref(0)

  onMounted(() => {
    count++
  })

  return $$({
    count,
  })
})