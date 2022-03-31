<script lang="ts" setup>
import * as path from 'path'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ThreeScene } from '@/scene/threeView'

onMounted(() => {
  const threeScene = new ThreeScene('three-container')

  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
  const cube = new THREE.Mesh(geometry, material)
  threeScene.addMesh(cube)
  threeScene.useCameraHelper()
  // threeScene.renderer.setViewport(100, 100, 100, 500)
})
</script>
<template>
  <div id="three-container" />
</template>
<style lang="scss" scoped>
#three-container {
  height: 600px;
  width: 600px;
}
</style>
