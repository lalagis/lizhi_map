<template>
  <div>
    <mapbox-source 
      source-id="polygons-source"
      :source="{
        type: 'geojson',
        data: collection
      }"
    />

    <mapbox-layer
      v-if="collection && currentLayer === 'polygon'"
      :layer="{
        id: 'polygons-layer',
        source: 'polygons-source',
        type: 'fill',
        paint: {
          'fill-color': '#ff0000',
          'fill-opacity': 0.4
        }
      }"
    />

    <polygon-modal
      :is-open="showModal"
      :polygon-id="currentPolygonId"
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

const { data, refresh } = $(await useFetch('/api/polygon/polygons', {
  method: 'GET'
}))
const collection = $computed(() => data?.polygons)

let showModal = $ref(false)
let currentPolygonId = $ref<number>()
let currentMarkers = $ref<Marker[]>([])

onMounted(() => {
  if (map) {
    // why trigger in a small area?
    map.on('click', 'polygons-layer', (e) => {
      if (!e.features) return
      currentPolygonId = e.features[0].properties?.id
      // @ts-expect-error EXIST
      const coordinates = e.features[0].geometry.coordinates[0] as [number, number][]
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