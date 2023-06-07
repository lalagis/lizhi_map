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
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/stores/global'
import { storeToRefs } from 'pinia'

const store = useGlobalStore()
const { currentLayer } = $(storeToRefs(store))

const { data } = $(await useFetch('/api/polygons', {
  method: 'GET'
}))
const collection = $computed(() => data?.polygons)
</script>