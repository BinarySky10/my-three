<script lang="ts" setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ThreeScene } from '@/scene/index'
// THREE.OrbitControls
onMounted(() => {
  // 场景 相机 渲染器
  /** ************容器获取*****************/
  const container = document.getElementById('three-container')

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  /** ************容器使用*****************/
  container.appendChild(renderer.domElement)

  // 控制器声明
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0.5, 0)
  controls.update()
  controls.enablePan = false
  controls.enableDamping = true

  // 窗口变化调整事件
  function setSize(camera: THREE.PerspectiveCamera, container: HTMLElement, renderer: THREE.WebGLRenderer) {
    // 更新相机
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    // 更新渲染尺寸的宽高比
    renderer.setSize(container.clientWidth, container.clientHeight)
    // this.label2DRenderer.setSize(this.container.clientWidth, this.container.clientHeight)
    // this.label3DRenderer.setSize(this.container.clientWidth, this.container.clientHeight)

    // 设置屏幕像素比(读取设备像素比)
    renderer.setPixelRatio(window.devicePixelRatio)
  }
  window.addEventListener('resize', () => {
    setSize(camera, container, renderer)
  })

  // 场景操作
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  camera.position.z = 5

  // 渲染循环
  function animate() {
    requestAnimationFrame(animate)
    controls.update()// 控制器update
    renderer.render(scene, camera)// 渲染器render
  }
  animate()
})
</script>
<template>
  <div id="three-container" />
</template>
<style lang="scss" scoped>
.mine-map {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(182, 179, 179, 0.082);
  div {
    display: flex;
    .mine-block {
      width: 40px;
      height: 40px;
      margin: 1px;
    }
  }
}
</style>
