// import { GUI } from 'three/examples/jsm/libs/stats.module';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import RenderLoop from './RenderLoop'
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
  const camera = new THREE.PerspectiveCamera(
    75,
    containerWidth / containerHeight,
    0.1,
    1000)
  camera.position.set(10, 10, 10)
  camera.lookAt(0, 0, 0)
  return camera
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
// function createOrbitControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): OrbitControls {
//   const controls = new OrbitControls(camera, renderer.domElement)
//   const proxy = new Proxy(controls, {})
//   return proxy
// }

export class ThreeScene {
  private _container: HTMLElement
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  private _controls: OrbitControls
  constructor(elementId: string) {
    this._container = document.getElementById(elementId)
    if (this._container) {
      this._init()
    }
  }

  /** *********************************初始化*******************************************/
  _init() {
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
    if (true) {
      // 使用坐标轴
      this.useAxe()
    }
    if (true) { // 网格辅助对象
      this.useGridHelper()
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

  /** *********************************控制器*******************************************/
  _useOrbitControls() {
    // 控制器声明
    this._controls = new OrbitControls(this.camera, this.renderer.domElement)
    this._controls.target.set(0, 0.5, 0)
    this._controls.update()
    this._controls.enablePan = false
    this._controls.enableDamping = true
    this._controls.saveState()
  }

  /** *********************************辅助工具**********************************************/
  useAxe() {
    const axesHelper = new THREE.AxesHelper(10)
    this.scene.add(axesHelper)
  }

  useGridHelper() {
    const size = 50
    const divisions = 50

    const gridHelper = new THREE.GridHelper(size, divisions)
    this.scene.add(gridHelper)
  }

  /** *********************************相机*******************************************/
  useCameraHelper() {
    const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 50)
    camera.position.set(-10, 10, -10)
    camera.lookAt(0, 0, 0)
    camera.updateMatrixWorld()
    const helper = new THREE.CameraHelper(camera)
    this.scene.add(helper)
    return camera
  }

  setCameraPosAndOri(): void {
    // // 设置位置
    this.camera.position.set(10, 0, 0)
    // // 朝向
    // this.camera.setRotationFromEuler()
    // this.camera.setRotationFromQuaternion()
    // this.camera.setRotationFromAxisAngle()
    // this.camera.setRotationFromMatrix()
    // // 上方向
  }

  addMesh(mesh: THREE.Mesh) {
    this.scene.add(mesh)
  }

  cameraTrack() {

  }
}
