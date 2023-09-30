<template>
  <div>
    <mapbox-source 
      source-id="linestrings-source"
      :source="{
        type: 'geojson',
        data: collection
      }"
    />

    <mapbox-layer
      v-if="collection && currentLayer === 'linestring'"
      :layer="{
        id: 'linestrings-layer',
        source: 'linestrings-source',
        type: 'line',
        layout: {
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#ff0000',
          'line-width': 5
        }
      }"
    />

    <linestring-modal
      :is-open="showModal"
      :linestring-id="currentLinestringId"
      :markers="currentMarkers"
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

const { data, refresh } = $(await useFetch('/api/linestring/linestrings', {
  method: 'GET'
}))
const collection = $computed(() => data?.linestrings)

let showModal = $ref(false)
let currentLinestringId = $ref<number>()
let currentMarkers = $ref<Marker[]>([])

onMounted(() => {
  if (map) {
    map.on('click', 'linestrings-layer', (e) => {
      if (!e.features) return
      currentLinestringId = e.features[0].properties?.id
      // @ts-expect-error EXIST
      const coordinates = e.features[0].geometry.coordinates as [number, number][]
      const current: Marker[] = []
      coordinates.forEach((coordinate) => {
        current.push({
          lnglat: coordinate,
        })
      })
      currentMarkers = current

      showModal = true
    })
  }
})
</script>