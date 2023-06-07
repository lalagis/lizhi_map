<template>
  <mapbox-default-marker
    v-for="marker, index in markers"
    :key="`marker ${index + 1}`"
    :marker-id="`marker ${index + 1}`"
    :lnglat="marker.lnglat"
    :options="{
      color: '#ff0000',
    }"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '~/stores/global';

const store = useGlobalStore()
const { markers } = $(storeToRefs(store))

// const markers = $ref<Marker[]>([
//   {
//     lnglat: [113.931, 22.539]
//   },
//   {
//     lnglat: [113.931, 22.538]
//   }
// ])

onMounted(() => {
  // markers.push({
  //   lnglat: [113.930, 22.539]
  // })
  // store.markers.push({
  //   lnglat: [113.930, 22.539]
  // })
})
</script>