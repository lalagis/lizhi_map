<template>
  <div>
    <!-- <mapbox-source 
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
    /> -->

    <!-- default layer -->
    <div>
      <mapbox-source 
        source-id="default-points-source"
        :source="{
          type: 'geojson',
          data: defaultList
        }"
      />

      <mapbox-layer
        v-if="collection && currentLayer === 'point'"
        :layer="{
          id: 'default-points-layer',
          source: 'default-points-source',
          type: 'symbol',
          layout: {
            'icon-image': 'mature',
            'icon-size': 0.15
          }
        }"
      />
    </div>

    <!-- immature layer -->
    <div>
      <mapbox-source 
        source-id="immature-points-source"
        :source="{
          type: 'geojson',
          data: immatureList
        }"
      />

      <mapbox-layer
        v-if="collection && currentLayer === 'point'"
        :layer="{
          id: 'immature-points-layer',
          source: 'immature-points-source',
          type: 'symbol',
          layout: {
            'icon-image': 'immature',
            'icon-size': 0.15
          }
        }"
      />
    </div>

    <!-- partially layer -->
    <div>
      <mapbox-source 
        source-id="partially-points-source"
        :source="{
          type: 'geojson',
          data: partiallyList
        }"
      />

      <mapbox-layer
        v-if="collection && currentLayer === 'point'"
        :layer="{
          id: 'partially-points-layer',
          source: 'partially-points-source',
          type: 'symbol',
          layout: {
            'icon-image': 'partially',
            'icon-size': 0.15
          }
        }"
      />
    </div>

    <!-- mature layer -->
    <div>
      <mapbox-source 
        source-id="mature-points-source"
        :source="{
          type: 'geojson',
          data: matureList
        }"
      />

      <mapbox-layer
        v-if="collection && currentLayer === 'point'"
        :layer="{
          id: 'mature-points-layer',
          source: 'mature-points-source',
          type: 'symbol',
          layout: {
            'icon-image': 'mature',
            'icon-size': 0.15
          }
        }"
      />
    </div>

    <!-- fully layer -->
    <div>
      <mapbox-source 
        source-id="fully-points-source"
        :source="{
          type: 'geojson',
          data: fullyList
        }"
      />

      <mapbox-layer
        v-if="collection && currentLayer === 'point'"
        :layer="{
          id: 'fully-points-layer',
          source: 'fully-points-source',
          type: 'symbol',
          layout: {
            'icon-image': 'fully',
            'icon-size': 0.15
          }
        }"
      />
    </div>

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
import { FeatureCollection } from 'geojson';
import { MapMouseEvent } from 'mapbox-gl';

const store = useGlobalStore()
const { currentLayer, map } = $(storeToRefs(store))

const { data, refresh } = $(await useFetch('/api/point/points', {
  method: 'GET'
}))
const collection = $computed(() => data?.points)
// rending as different layers
const defaultList = $ref<FeatureCollection>({ type: 'FeatureCollection', features: [] })
const immatureList = $ref<FeatureCollection>({ type: 'FeatureCollection', features: [] })
const partiallyList = $ref<FeatureCollection>({ type: 'FeatureCollection', features: [] })
const matureList = $ref<FeatureCollection>({ type: 'FeatureCollection', features: [] })
const fullyList = $ref<FeatureCollection>({ type: 'FeatureCollection', features: [] })
watchEffect(() => {
  if (collection) {
    // init
    defaultList.features = []
    immatureList.features = []
    partiallyList.features = []
    matureList.features = []

    for (const feature of collection.features) {
      if (!feature.properties) continue

      // @ts-expect-error has status
      switch (feature.properties.matureStatus) {
        case 'IMMATURE':
          immatureList.features.push(feature)
          break
        case 'PARTIALLY':
          partiallyList.features.push(feature)
          break
        case 'MATURE':
          matureList.features.push(feature)
          break
        case 'FULLY':
          fullyList.features.push(feature)
          break
        default:
          defaultList.features.push(feature)
          break
      }
    }
  }
})

let showModal = $ref(false)
let currentPointId = $ref<number>()
let currentMarker = $ref<Marker>()

const onClickItem = (e: MapMouseEvent & {
    features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
} & mapboxgl.EventData) => {
  if (!e.features) return
  currentPointId = e.features[0].properties?.id
  currentMarker = {
    lnglat: e.lngLat.toArray() as [number, number],
  }
  showModal = true
}

onMounted(() => {
  if (map) {
    map.on('click', 'default-points-layer', onClickItem)
    map.on('click', 'immature-points-layer', onClickItem)
    map.on('click', 'partially-points-layer', onClickItem)
    map.on('click', 'mature-points-layer', onClickItem)
    map.on('click', 'fully-points-layer', onClickItem)
  }
})
</script>