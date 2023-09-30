<template>
  <mapbox-geolocate-control
    :options="{
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }"
    @geolocate="onGeolocate"
  />

  <div>
    <mapbox-source 
      source-id="nearest-points-source"
      :source="{
        type: 'geojson',
        data: collection
      }"
    />

    <mapbox-layer
      v-if="collection && currentLayer === 'nearest'"
      :layer="{
        id: 'nearest-points-layer',
        source: 'nearest-points-source',
        type: 'symbol',
        layout: {
          'icon-image': 'fully',
          'icon-size': 0.15
        }
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { FeatureCollection } from 'geojson'
import { useGlobalStore } from '~/stores/global'

const store = useGlobalStore()
const { currentLayer } = $(storeToRefs(store))

let collection = $ref<FeatureCollection>()

// no type GeolocateControl 
const onGeolocate = (control: any) => {
  // and no type called GeolationPosition
  control.options.geolocation.getCurrentPosition(async (position: any) => {
    const lng: number = position.coords.longitude
    const lat: number = position.coords.latitude
    console.log('user position', [lng, lat])

    const { data } = await axios.get('/api/point/nearest', {
      params: {
        lng: lng.toFixed(5),
        lat: lat.toFixed(5)
      }
    })
    collection = data.nearest

    store.currentLayer = 'nearest'
  })
}
</script>