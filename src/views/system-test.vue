<script lang="ts" setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import * as THREE from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'
import { main } from '../system/main'

// 生命周期 挂载
onMounted(() => {
  main().catch((err) => {
    console.error(err)
  })
})

</script>
<template>
  <div id="scene-container" />
  <!-- <button @click="handleResetCamera()">
    重置相机
  </button>
  <button @click="handletoJson()">
    toJson
  </button>
  <button @click="handletoTest()">
    test
    </button> -->
</template>
<style lang="scss" scoped>
#scene-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
