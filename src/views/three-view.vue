<script lang="ts" setup>
import * as path from 'path'
import { getuid } from 'process'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import * as THREE from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'
import { ThreeScene } from '@/scene/threeView'
let threeScene = null
let camera2 = null
function handletoTest() {
  const s = threeScene as ThreeScene
  s.setCameraPosAndOri()
}
function handleResetCamera() {
  // 重置相机 临时
  const s = threeScene as ThreeScene
  const controls: OrbitControls = Reflect.get(s, '_controls')
  controls.reset()
}
function handletoJson() {
  // 相机tojson临时
  const s = threeScene as ThreeScene
  console.log(s.camera.toJSON())
}

// 生命周期 挂载
onMounted(() => {
  threeScene = new ThreeScene('three-container')

  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
  const cube = new THREE.Mesh(geometry, material)
  threeScene.addMesh(cube)
  camera2 = threeScene.useCameraHelper()
  const theControl = Reflect.get(threeScene, '_controls') as OrbitControls

  // 编辑器
  const controls = {
    resetCamera() {
      theControl.reset()
    },
    startAutoRotate() {
      theControl.autoRotate = true
      theControl.autoRotateSpeed = 10
      theControl.update()
    },
    stopAutoRotate() {
      theControl.autoRotate = false
      theControl.update()
    },
  }
  const gui = new GUI()
  const folder3 = gui.addFolder('相机控制')
  folder3.add(controls, 'resetCamera').name('重置相机')
  folder3.add(controls, 'startAutoRotate').name('开启旋转')
  folder3.add(controls, 'stopAutoRotate').name('关闭旋转')
})

</script>
<template>
  <div id="three-container" />
  <button @click="handleResetCamera()">重置相机</button>
  <button @click="handletoJson()">toJson</button>
  <button @click="handletoTest()">test</button>
</template>
<style lang="scss" scoped>
#three-container {
  height: 600px;
  width: 600px;
}
</style>
