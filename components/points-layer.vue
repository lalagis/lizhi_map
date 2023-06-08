<template>
  <div>
    <mapbox-source 
      source-id="points-source"
      :source="{
        type: 'geojson',
        data: collection
      }"
    />

    <mapbox-layer
      v-if="collection && currentLayer === 'point'"
      :layer="{
        id: 'points-layer',
        source: 'points-source',
        type: 'symbol',
        layout: {
          'icon-image': 'fully',
          'icon-size': 0.15
        }
      }"
    />

    <point-modal
      :is-open="showModal"
      :point-id="currentPointId"
      :marker="currentMarker"
      @close="showModal = false"
      @refresh="refresh"
    />
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/stores/global'
import { storeToRefs } from 'pinia'

const store = useGlobalStore()
const { currentLayer, map } = $(storeToRefs(store))

const { data, refresh } = $(await useFetch('/api/point/points', {
  method: 'GET'
}))
const collection = $computed(() => data?.points)

let showModal = $ref(false)
let currentPointId = $ref<number>()
let currentMarker = $ref<Marker>()

onMounted(() => {
  if (map) {
    map.on('click', 'points-layer', (e) => {
      if (!e.features) return
      currentPointId = e.features[0].properties?.id
      currentMarker = {
        lnglat: e.lngLat.toArray() as [number, number],
      }
      showModal = true
    })
  }
})
</script>