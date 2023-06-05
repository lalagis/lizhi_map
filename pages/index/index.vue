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
    >
      <points-layer v-if="currentLayer === 'point'" />
      <geolocate-control />
    </mapbox-map>

    <div class="absolute bottom-10 left-5 w-100">
      <radios-panel class="relative w-full" />
    </div>

    <hamburger-menu />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '~/stores/global';

const config = useRuntimeConfig()

const store = useGlobalStore()
const { currentLayer } = $(storeToRefs(store))
</script>