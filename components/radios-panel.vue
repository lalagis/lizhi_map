<template>
  <div class="w-full py-2">
    <div class="mx-auto w-full max-w-md">
      <RadioGroup v-model="selected">
        <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
        <div class="space-y-2">
          <RadioGroupOption
            as="template"
            v-for="item, index in list"
            :key="index"
            :value="item"
            v-slot="{ active, checked }"
          >
            <div
              :class="[
                active
                  ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-300'
                  : '',
                checked ? 'bg-pink-900 bg-opacity-75 text-white ' : 'bg-white ',
              ]"
              class="relative flex cursor-pointer rounded-lg px-5 py-3 shadow-md focus:outline-none select-none"
            >
              <div class="flex w-full items-center justify-between">
                <div class="flex items-center">
                  <div class="text-sm">
                    <RadioGroupLabel
                      as="p"
                      :class="checked ? 'text-white' : 'text-gray-900'"
                      class="font-medium font-sans"
                    >
                      {{ item.title }}
                    </RadioGroupLabel>
                    <RadioGroupDescription
                      as="span"
                      :class="checked ? 'text-pink-100' : 'text-gray-500'"
                      class="inline font-sans"
                    >
                      <span>{{ item.description }}</span>
                    </RadioGroupDescription>
                  </div>
                </div>
                <div v-show="checked" class="shrink-0 text-white">
                  <span class="h-6 w-6">{{ item.icon }}</span>
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from '@headlessui/vue'
import { useGlobalStore } from '~/stores/global';

interface RadioItem {
  title: string
  description: string
  icon: string
}

const list: RadioItem[] = [
  {
    title: '所有的荔枝树',
    description: '搜索所有的荔枝树展示为点图层',
    icon: '🌳',
  },
  {
    title: '推荐的游览路径',
    description: '所有游览荔枝路径构成线串图层',
    icon: '🚗',
  },
  {
    title: '荔枝林区域',
    description: '所有荔枝林区域构成面图层',
    icon: '🏕️'
  }
]

const selected = $ref(list[0])

const store = useGlobalStore()

watch(() => selected, () => {
  switch (selected.title) {
    case '所有的荔枝树':
      if (store.currentLayer !== 'point') store.currentLayer = 'point'
      break
    case '推荐的游览路径':
      if (store.currentLayer !== 'linestring') store.currentLayer = 'linestring'
      break
    case '荔枝林区域':
      if (store.currentLayer !== 'polygon') store.currentLayer = 'polygon'
      break
  }
})
</script>