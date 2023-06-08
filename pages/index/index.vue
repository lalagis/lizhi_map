<template>
  <div class="w-screen h-screen m-0 relative">
    <mapbox-map
      map-id="base"
      class="absolute inset-0"
      :options="{
        style: config.public.MAPBOX_STYLE,
        center: [113.931, 22.539],
        zoom: 17,
      }"
      @click="onClick"
    >
      <!-- markers -->
      <markers />

      <!-- layers -->
      <points-layer />
      <lines-layer />
      <polygons-layer />
      <editing-layer :type="editingLayerType" />

      <!-- controls -->
      <geolocate-control />
    </mapbox-map>

    <div class="absolute bottom-10 left-5 w-100">
      <radios-panel class="relative w-full" />
    </div>

    <hamburger-menu />
  </div>
</template>

<script setup lang="ts">
import { MapMouseEvent } from 'mapbox-gl';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '~/stores/global';

const config = useRuntimeConfig()

const store = useGlobalStore()
const { cursor, insertType } = $(storeToRefs(store))

let editingLayerType = $ref<ShapeType>()

const onClick = async (event: MapMouseEvent) => {
  if (cursor === 'cell') {
    console.log('clicked here', event.lngLat)
    let { lng, lat } = event.lngLat

    lng = parseFloat(lng.toFixed(5))
    lat = parseFloat(lat.toFixed(5))

    // insert point
    if (insertType === 'point') {
      editingLayerType = 'point'

      store.markers.push({
        lnglat: [lng, lat],
      })

      await useFetch('/api/point/:id', {
        method: 'POST',
        body: {
          lng,
          lat,
          matureStatus: undefined
        }
      })

      store.cursor = 'grab'
      store.insertType = undefined
    }

    // insert linestring
    if (insertType === 'linestring') {
      editingLayerType = 'linestring'

      store.markers.push({
        lnglat: [lng, lat],
      })
    }

    // insert polygon
    if (insertType === 'polygon') {
      editingLayerType = 'polygon'

      store.markers.push({
        lnglat: [lng, lat],
      })
    }
  }
}
</script>