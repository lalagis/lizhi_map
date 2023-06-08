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
                {{ `游览路线 ${linestringId}` }}
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
                  推荐原因
                </p>

                <div class="relative mb-6">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 dark:text-gray-400">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-100 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="留下推荐原因吧～"
                    v-model="reason"
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
  linestringId?: number
}>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'refresh'): void
}>()

let linestring = $ref<Linestring>()
let reason = $ref('')
watchEffect(async () => {
  if (props.linestringId) {
    const res = await axios.get(`/api/linestring/${props.linestringId}`)
    linestring = res.data.linestring
    if (linestring?.property.reason) reason = linestring.property.reason
  }
})

const onClickUpdate = async () => {
  if (!props.linestringId) return
  
  await axios.put('/api/linestring/' + props.linestringId, {
    body: {
      reason
    }
  })

  await emits('refresh')
}

const onClickDelete = async () => {
  if (!confirm('确定要删除吗？')) return

  await axios.delete('/api/linestring/' + props.linestringId)

  await emits('refresh')

  onCloseModal()
}

const onCloseModal = () => {
  linestring = undefined
  reason = ''
  emits('close')
}
</script>