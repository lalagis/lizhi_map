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
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/stores/global'
import { storeToRefs } from 'pinia'

const store = useGlobalStore()
const { currentLayer } = $(storeToRefs(store))

const { data } = $(await useFetch('/api/linestring/linestrings', {
  method: 'GET'
}))
const collection = $computed(() => data?.linestrings)
</script>