<script lang="ts" setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import * as THREE from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import type { Mesh, Object3D } from 'three'
import { Scene } from 'three'
import { ThreeScene } from '@/scene/threeView'
import type { LoopMesh } from '@/scene/LoopElement'

let threeScene: ThreeScene = null
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
  const s = threeScene
}

let x = 1
function createMesh(geometry: THREE.BoxGeometry, material: THREE.MeshBasicMaterial): LoopMesh {
  const cube = new THREE.Mesh(geometry, material) as LoopMesh
  cube.tick = () => {
    x++
    cube.position.setX(x / 50)
  }
  return cube
}

// 生命周期 挂载
onMounted(async () => {
  threeScene = new ThreeScene('three-container')

  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
  // const cube = new THREE.Mesh(geometry, material)
  const cube = createMesh(geometry, material)
  cube.name = 'cube'
  threeScene.addMesh(cube)
  // threeScene.cameraTrack(cube)

  const loader = new GLTFLoader()
  async function loadGltf() {
    const gltf = await loader.loadAsync(new URL('../scene/assets/scene/model/weilan.gltf', import.meta.url).href)

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = child.material.color
        child.material.emissiveMap = child.material.map
      }
    })
    return gltf.scene
  }
  const y = await loadGltf()
  for (let i = 0; i < 100; i++) {
    const z = y.clone()
    z.tick = () => { }
    z.name = `weilan${i}`
    z.position.z = -i
    threeScene.addMesh(z)
  }

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
    cameraTrack() {
      threeScene.cameraTrack(cube)
    },
    cameraUntrack() {
      threeScene.cameraUntrack()
    },
  }
  const gui = new GUI()
  const folder3 = gui.addFolder('相机控制')
  folder3.add(controls, 'resetCamera').name('重置相机')
  folder3.add(controls, 'startAutoRotate').name('开启旋转')
  folder3.add(controls, 'stopAutoRotate').name('关闭旋转')
  folder3.add(controls, 'cameraTrack').name('开始追踪')
  folder3.add(controls, 'cameraUntrack').name('关闭追踪')
})

</script>
<template>
  <div id="Stats-output" />
  <div id="three-container" />
  <button @click="handleResetCamera()">
    重置相机
  </button>
  <button @click="handletoJson()">
    toJson
  </button>
  <button @click="handletoTest()">
    test
  </button>
</template>
<style lang="scss" scoped>
#three-container {
  height: 700px;
  width: 800px;
}
</style>
