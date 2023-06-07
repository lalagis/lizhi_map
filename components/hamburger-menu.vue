<template>
  <div class="pie pie1" @click="onSelectedMode('point')">
    <div class="pie-color pie-color1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="point">
        <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
  <div class="pie pie2" @click="onSelectedMode('linestring')">
    <div class="pie-color pie-color2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="line">
        <path fill-rule="evenodd" d="M15.22 6.268a.75.75 0 01.968-.432l5.942 2.28a.75.75 0 01.431.97l-2.28 5.941a.75.75 0 11-1.4-.537l1.63-4.251-1.086.483a11.2 11.2 0 00-5.45 5.174.75.75 0 01-1.199.19L9 12.31l-6.22 6.22a.75.75 0 11-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l3.606 3.605a12.694 12.694 0 015.68-4.973l1.086-.484-4.251-1.631a.75.75 0 01-.432-.97z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
  <div class="pie pie3" @click="onSelectedMode('polygon')">
    <div class="pie-color pie-color3">
      <svg class="cart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <path
          d="M98.993 14.537c-.816-.966-2.018-1.503-3.263-1.503H25.698c-.064 0-.107.022-.172.022l-9.36-9.404c-.816-.794-1.91-1.245-3.05-1.245H4.295C1.932 2.407 0 4.34 0 6.7c0 2.363 1.932 4.295 4.294 4.295h7.063l7.73 7.728 9.574 56.893c.344 2.06 2.148 3.585 4.23 3.585h50.388c2.36 0 4.293-1.93 4.293-4.293 0-2.36-1.93-4.293-4.292-4.293h-46.76l-1.588-9.447h54.423c2.104 0 3.908-1.524 4.23-3.606l6.354-39.545c.215-1.267-.128-2.533-.944-3.478zm-60.177 38.02H33.49L31.56 41.03h7.256zm0-20.115H30.1L28.273 21.6h10.542zm16.38 20.116h-7.793V41.03h7.793zm0-20.116h-7.793V21.6h7.793zm16.38 20.116h-7.792V41.03h7.793zm0-20.116h-7.792V21.6h7.793zm14.128 20.116h-5.54V41.03h7.386zm3.22-20.116h-8.78V21.6h10.52zm-47.618 50.13c-4.143 0-7.514 3.37-7.514 7.514 0 4.143 3.37 7.514 7.514 7.514s7.514-3.37 7.514-7.514-3.37-7.514-7.514-7.514zm34.758 0c-4.143 0-7.514 3.37-7.514 7.514 0 4.143 3.37 7.514 7.514 7.514 4.165 0 7.514-3.37 7.514-7.514s-3.35-7.514-7.514-7.514z"
        />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="polygon">
        <path fill-rule="evenodd" d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
  <div class="menu" onclick="document.body.classList.toggle('active')">
    <svg class="hamburger" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <g fill="none" stroke="#000" stroke-width="7.999" stroke-linecap="round">
        <path d="M 55,26.000284 L 24.056276,25.999716" />
        <path d="M 24.056276,49.999716 L 75.943724,50.000284" />
        <path d="M 45,73.999716 L 75.943724,74.000284" />
        <path d="M 75.943724,26.000284 L 45,25.999716" />
        <path d="M 24.056276,73.999716 L 55,74.000284" />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/stores/global';

const store = useGlobalStore()

const onSelectedMode = (type: ShapeType) => {
  document.body.classList.remove('active')
  store.cursor = 'cell'
  store.insertType = type
  store.markers = []
}
</script>

<style scoped lang="css">
.pie {
  -webkit-tap-highlight-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  height: 400px;
  left: -200px;
  position: absolute;
  top: -200px;
  width: 400px;
  transform: translateX(-200px) translateY(-200px);
  transition: transform 300ms;
}
.pie-color:hover {
  opacity: 0.85;
}
.pie-color:active {
  opacity: 0.7;
}
.pie1 {
  clip-path: polygon(200px 200px, 344px 450px, 0 450px);
  transition-delay: 30ms;
}
.pie2 {
  clip-path: polygon(200px 200px, 344px 450px, 450px 344px);
  transition-delay: 60ms;
}
.pie3 {
  clip-path: polygon(200px 200px, 450px 0, 450px 344px);
  transition-delay: 90ms;
}
.pie-color {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.pie-color1 {
  background: linear-gradient(135deg, #f12711, #f5af19);
  clip-path: polygon(200px 200px, 344px 450px, 0 450px);
}
.pie-color2 {
  background: linear-gradient(135deg, #444, #7e84f9);
  clip-path: polygon(200px 200px, 344px 450px, 450px 344px);
}
.pie-color3 {
  background: linear-gradient(135deg, #444, #b7e13f);
  clip-path: polygon(200px 200px, 450px 0, 450px 344px);
}
.point {
  left: 215px;
  position: absolute;
  top: 318px;
  width: 46px;
}
.line {
  left: 288px;
  position: absolute;
  top: 282px;
  width: 46px;
}
.polygon {
  left: 324px;
  position: absolute;
  top: 212px;
  width: 46px;
}
.menu {
  -webkit-tap-highlight-color: transparent;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 4px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  height: 200px;
  left: -100px;
  position: absolute;
  top: -100px;
  width: 200px;
}
.hamburger {
  cursor: pointer;
  height: 46px;
  left: 58%;
  position: relative;
  top: 58%;
  width: 46px;
}
.title {
  color: white;
  font-family: 'Crimson Text', serif;
  font-size: 80px;
  line-height: 84px;
  margin-top: 60px;
  text-align: center;
}
.body {
  color: white;
  font-family: 'Work Sans', sans-serif;
  font-size: 20px;
  justify-content: center;
  line-height: 28px;
  margin: 30px auto;
  max-width: 600px;
  text-align: center;
}
.hamburger path {
  transition: transform 300ms;
}
.hamburger path:nth-child(1) {
  transform-origin: 25% 29%;
}
.hamburger path:nth-child(2) {
  transform-origin: 50% 50%;
}
.hamburger path:nth-child(3) {
  transform-origin: 75% 72%;
}
.hamburger path:nth-child(4) {
  transform-origin: 75% 29%;
}
.hamburger path:nth-child(5) {
  transform-origin: 25% 72%;
}
.active .pie {
  transform: translateX(0) translateY(0);
}
.active .hamburger path:nth-child(1) {
  transform: rotate(45deg);
}
.active .hamburger path:nth-child(2) {
  transform: scaleX(0);
}
.active .hamburger path:nth-child(3) {
  transform: rotate(45deg);
}
.active .hamburger path:nth-child(4) {
  transform: rotate(-45deg);
}
.active .hamburger path:nth-child(5) {
  transform: rotate(-45deg);
}
</style>
