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
                {{ `荔枝树 ${pointId}` }}
              </dialog-title>
              <div class="mt-2">
                <p class="text-sm text-gray-500 font-sans">
                  地理数据概览
                </p>

                <div v-if="marker" class="flex flex-col items-center gap-y-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F87171" class="w-7 h-7">
                    <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
                  </svg>

                  <span class="font-sans text-gray-600 text-sm">{{ `[ ${marker.lnglat[0].toFixed(3)}, ${marker.lnglat[1].toFixed(3) } ]` }}</span>
                </div>
              </div>

              <div class="mt-2">
                <p class="text-sm text-gray-500 font-sans">
                  成熟状况
                </p>

                <listbox v-model="selectedStatus" class="w-60 mx-auto">
                  <div class="relative mt-1">
                    <listbox-button class="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span class="block truncate font-sans">{{ statusCN(selectedStatus) }}</span>
                      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400">
                          <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </listbox-button>

                    <transition
                      leave-active-class="transition duration-100 ease-in"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0"
                    >
                      <listbox-options
                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        <listbox-option
                          v-slot="{ active, selected }"
                          v-for="item, index in statusList"
                          :key="index"
                          :value="item"
                          as="template"
                        >
                          <li
                            :class="[
                              active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                              'relative cursor-pointer select-none py-2 pl-10 pr-4',
                            ]"
                          >
                            <span
                              :class="[
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate font-sans',
                              ]"
                              >{{ statusCN(item) }}</span
                            >
                            <span
                              v-if="selected"
                              class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                              </svg>
                            </span>
                          </li>
                        </listbox-option>
                      </listbox-options>
                    </transition>
                  </div>
                </listbox>
              </div>

              <div class="mt-2">
                <p class="text-sm text-gray-500 font-sans">
                  图标
                </p>

                <span v-if="!selectedStatus" class="text-center text-gray-500 font-sans text-sm">暂无</span>

                <div v-else class="flex items-center justify-center mt-2">
                  <img :src="image" class="w-20 h-20" >
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
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import axios from 'axios'
import { ImmaturePNG, PartiallyPNG, MaturePNG, FullyPNG } from '~/assets'

const props = defineProps<{
  isOpen: boolean
  marker?: Marker
  pointId?: number
}>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'refresh'): void
}>()

let point = $ref<Point>()
watchEffect(async () => {
  if (props.pointId) {
    const res = await axios.get(`/api/point/${props.pointId}`)
    point = res.data.point
    if (point?.property.matureStatus) selectedStatus = point.property.matureStatus
  }
})

const statusList = $ref<MatureStatus[]>(['IMMATURE', 'PARTIALLY', 'MATURE', 'FULLY'])
let selectedStatus = $ref<MatureStatus>()
const image = $computed(() => {
  if (!selectedStatus) return undefined
  if (selectedStatus === 'IMMATURE') return ImmaturePNG
  if (selectedStatus === 'PARTIALLY') return PartiallyPNG
  if (selectedStatus === 'MATURE') return MaturePNG
  if (selectedStatus === 'FULLY') return FullyPNG
})

const statusCN = (status?: MatureStatus) => {
  if (!status) return '暂无'
  if (status === 'IMMATURE') return '未成熟'
  if (status === 'PARTIALLY') return '半熟'
  if (status === 'MATURE') return '成熟'
  if (status === 'FULLY') return '完全成熟'
}

const onClickUpdate = async () => {
  if (!selectedStatus || !props.pointId) return
  
  await axios.put('/api/point/' + props.pointId, {
    body: {
      matureStatus: selectedStatus
    }
  })

  // await emits('refresh')
}

const onClickDelete = async () => {
  if (!confirm('确定要删除吗？')) return

  await axios.delete('/api/point/' + props.pointId)

  await emits('refresh')

  onCloseModal()
}

const onCloseModal = () => {
  point = undefined
  selectedStatus = undefined
  emits('close')
}
</script>