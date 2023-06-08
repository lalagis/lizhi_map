<template>
  <transition-root appear :show="isOpen" as="template">
    <Dialog as="div" @close="onCloseModal" class="relative z-10">
      <transition-child
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </transition-child>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <transition-child
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <dialog-panel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <dialog-title
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 font-sans font-semibold text-red"
              >
                {{ `荔枝林 ${polygonId}` }}
              </dialog-title>
              <div class="mt-2">
                <p class="text-sm text-gray-500 font-sans">
                  地理数据概览
                </p>

                <div class="flex flex-row justify-between w-full flex-wrap">
                  <div 
                    v-for="marker, index in markers"
                    :key="index"
                    class="flex flex-col items-center gap-y-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F87171" class="w-7 h-7">
                      <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
                    </svg>

                    <span class="font-sans text-gray-600 text-sm">{{ `[ ${marker.lnglat[0].toFixed(3)}, ${marker.lnglat[1].toFixed(3) } ]` }}</span>
                  </div>
                </div>
              </div>

              <div class="mt-2">
                <p class="text-sm text-gray-500 font-sans">
                  最佳相关游览路线
                </p>

                <div class="relative mb-6">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-gray-500 dark:text-gray-400">
                      <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input 
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-100 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="填写最佳游览路线id"
                    v-model="recommendRouteId"
                  >
                </div>
              </div>

              <div class="mt-10 flex flex-row justify-between">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 cursor-pointer"
                  @click="onClickUpdate"
                >
                  更新
                </button>

                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 cursor-pointer"
                  @click="onClickDelete"
                >
                  删除
                </button>
              </div>
            </dialog-panel>
          </transition-child>
        </div>
      </div>
    </Dialog>
  </transition-root>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import axios from 'axios'

const props = defineProps<{
  isOpen: boolean
  markers?: Marker[]
  polygonId?: number
}>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'refresh'): void
}>()

let polygon = $ref<Polygon>()
let recommendRouteId = $ref('')
watchEffect(async () => {
  if (props.polygonId) {
    const res = await axios.get(`/api/polygon/${props.polygonId}`)
    polygon = res.data.polygon
    if (polygon?.property.recommendedRouteId) recommendRouteId = polygon.property.recommendedRouteId.toString()
  }
})

const onClickUpdate = async () => {
  if (!props.polygonId || !recommendRouteId) return
  
  await axios.put('/api/polygon/' + props.polygonId.toString(), {
    body: {
      recommendedRouteId: parseInt(recommendRouteId)
    }
  })

  await emits('refresh')
}

const onClickDelete = async () => {
  if (!props.polygonId || !confirm('确定要删除吗？')) return

  await axios.delete('/api/polygon/' + props.polygonId.toString())

  await emits('refresh')

  onCloseModal()
}

const onCloseModal = () => {
  polygon = undefined
  recommendRouteId = ''
  emits('close')
}
</script>