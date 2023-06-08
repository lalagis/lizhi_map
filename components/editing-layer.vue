<template>
  <div>
    <mapbox-source 
      source-id="editing-layer-source"
      :source="{
        type: 'geojson',
        data: geojson
      }"
    />

    <mapbox-layer
      v-if="props.type && markers.length && layerType"
      :layer="{
        id: 'editing-layer',
        source: 'editing-layer-source',
        type: layerType,
        // paint: layerPaint
      }"
    />
  </div>

  <button 
    type="button"
    v-if="insertType === 'linestring' || insertType === 'polygon'"
    class="cursor-pointer text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center fixed right-70 bottom-70 font-sans font-semibold"
    @click="onClickStopDraw"
  >
    停止绘制
  </button>
</template>

<script setup lang="ts">
import { FeatureCollection } from 'geojson';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '~/stores/global';

const props = defineProps<{
  type?: ShapeType
}>()
const layerType = $computed(() => {
  if (!props.type) return undefined
  if (props.type === 'point') return 'circle'
  if (props.type === 'linestring') return 'line'
  if (props.type === 'polygon') return 'fill'
})
// const layerPaint = $computed(() => {
//   if (!props.type) return undefined
//   if (props.type === 'point') return {
//     'circle-color': '#ff0000',
//     'circle-size': 10
//   }
//   if (props.type === 'linestring') return {
//     'line-color': '#ff0000',
//     'line-width': 5
//   }
//   if (props.type === 'polygon') return {
//     'fill-color': '#ff0000',
//     'fill-opacity': 0.4
//   }
// })

const store = useGlobalStore()
const { markers, insertType } = $(storeToRefs(store))

// make markers lnglat as geojson
const geojson = $computed<FeatureCollection>(() => {
  if (!props.type) return {
    type: 'FeatureCollection',
    features: []    
  }
  return points2Geojson(props.type, markers)
})

const onClickStopDraw = async () => {
  if (!props.type) return
  if (props.type === 'point') return

  if (props.type === 'linestring') {
    await useFetch('/api/linestring/:id', {
      method: 'POST',
      body: {
        geometry: geojson.features[0].geometry,
        reason: undefined
      }
    })

    store.insertType = undefined
    store.cursor = 'grab'
    store.currentLayer = 'linestring'
  }

  if (props.type === 'polygon') {
    await useFetch('/api/polygon/:id', {
      method: 'POST',
      body: {
        geometry: geojson.features[0].geometry,
        recommendedRouteId: undefined
      }
    })

    store.insertType = undefined
    store.cursor = 'grab'
    store.currentLayer = 'polygon'
  }
}
</script>