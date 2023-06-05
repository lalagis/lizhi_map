<template>
  <mapbox-layer
    v-if="collection"
    source-id="points"
    :source="{
      type: 'geojson',
      data: collection,
    }"
    :layer="{
      source: 'points',
      id: 'lizhi-points-layer',
      type: 'circle',
      paint: {
        'circle-color': '#ff0000'
      }
    }"
  />
</template>

<script setup lang="ts">
const { data } = $(await useFetch('/api/points', {
  method: 'GET'
}))
const collection = $computed(() => data?.points)
</script>