import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 基本 scene camera renderer 渲染循环
// 新增 controls
// 新增 resize
/**
 * 创建场景
 * @returns {THREE.Scene}
 */
function createScene(): THREE.Scene {
  const scene = new THREE.Scene()
  // // scene 天空盒
  const r = '../../public/scene/skybox/Bridge2/'
  const urls = [`${r}posx.jpg`, `${r}negx.jpg`,
    `${r}posy.jpg`, `${r}negy.jpg`,
    `${r}posz.jpg`, `${r}negz.jpg`]
  const textureCube = new THREE.CubeTextureLoader().load(urls)
  scene.background = textureCube
  return scene
}
/**
 * 创建相机
 * @returns {THREE.PerspectiveCamera}
 */
function createCamera(containerWidth: number, containerHeight: number): THREE.PerspectiveCamera {
  return new THREE.PerspectiveCamera(
    75,
    containerWidth / containerHeight,
    0.1,
    1000)
}
/**
 * 创建渲染器
 * @returns {THREE.WebGLRenderer}
 */
function createRenderer(containerWidth: number, containerHeight: number): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(containerWidth, containerHeight)
  return renderer
}

export class ThreeScene {
  private _container: HTMLElement
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  private _controls: OrbitControls
  constructor(elementId: string) {
    this._container = document.getElementById(elementId)
    // 创建 scene Camera renderer
    this.scene = createScene()
    this.camera = createCamera(this._container.clientWidth, this._container.clientHeight)
    this.renderer = createRenderer(this._container.clientWidth, this._container.clientHeight)
    // renderer绑定DOM
    this._container.appendChild(this.renderer.domElement)
    // 绑定setsize
    window.addEventListener('resize', () => {
      this._setSize()
    })
    if (true) {
      // 使用控制器
      this._useOrbitControls()
    }
    // 渲染循环
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera)
    })
  }

  // 重新设置窗口宽高
  _setSize() {
  // 更新相机
    this.camera.aspect = this._container.clientWidth / this._container.clientHeight
    this.camera.updateProjectionMatrix()
    // 更新渲染尺寸的宽高比
    this.renderer.setSize(this._container.clientWidth, this._container.clientHeight)

    // 设置屏幕像素比(读取设备像素比)
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }

  _useOrbitControls() {
    // 控制器声明
    this._controls = new OrbitControls(this.camera, this.renderer.domElement)
    this._controls.target.set(0, 0.5, 0)
    this._controls.update()
    this._controls.enablePan = false
    this._controls.enableDamping = true
  }

  useCameraHelper() {
    const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000)
    const helper = new THREE.CameraHelper(camera)
    this.scene.add(helper)
  }

  addMesh(mesh: THREE.Mesh) {
    this.scene.add(mesh)
  }

  cameraTrack() {

  }
}
