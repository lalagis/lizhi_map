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
</template>

<script setup lang="ts">
// no type GeolocateControl 
const onGeolocate = (control: any) => {
  // and no type called GeolationPosition
  control.options.geolocation.getCurrentPosition((position: any) => {
    const lng: number = position.coords.longitude
    const lat: number = position.coords.latitude
    console.log('user position', [lng, lat])
  })
}
</script>