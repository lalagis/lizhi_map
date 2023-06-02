<template>
  <div class="w-screen h-screen m-0 relative">
    <mapbox-map
      map-id="base"
      class="absolute inset-0"
      :options="{
        style: 'mapbox://styles/ddiu8081/ckz82q8eb000c14o8uw4ky79d',
        center: [113.933, 22.538],
        zoom: 16
      }"
      @load="onMapLoad"
    >
      <mapbox-layer
        source-id="points"
        :source="{
          type: 'geojson',
          data: received,
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
      <mapbox-geolocate-control />
      <mapbox-navigation-control />
    </mapbox-map>
  </div>
</template>

<script setup lang="ts">
import { FeatureCollection } from 'geojson';

const received: FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          113.93271840674674,
          22.53762055135546
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          113.93176890468033,
          22.539275420395086
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          113.93255210971074,
          22.539884843169958
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          113.92988062953367,
          22.538715541816885
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          113.93067456340196,
          22.53946865229844
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          113.93160797213858,
          22.5404496716325
        ],
        "type": "Point"
      }
    }
  ]
}

const onMapLoad = (map: mapboxgl.Map) => {
  console.log('map loaded')
}
</script>