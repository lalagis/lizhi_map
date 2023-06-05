import { defineStore } from "pinia"

export const useGlobalStore = defineStore('global', () => {
  const currentLayer = $ref<'point' | 'linestring' | 'polygon'>('point')

  return $$({
    currentLayer,
  })
})