// import { GUI } from 'three/examples/jsm/libs/stats.module';
import * as THREE from 'three'
import type { Object3D } from 'three'
import RenderLoop from './RenderLoop'
import { LoopOrbitControls, LoopWebGLRenderer } from './LoopElement'
import type { LoopElement } from './LoopElement'

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
 * @returns {LoopWebGLRenderer}
 */
function createRenderer(containerWidth: number, containerHeight: number): LoopWebGLRenderer {
  const renderer = new LoopWebGLRenderer()
  renderer.setSize(containerWidth, containerHeight)
  return renderer
}
// function createOrbitControls(camera: THREE.PerspectiveCamera, renderer: LoopWebGLRenderer): OrbitControls {
//   const controls = new OrbitControls(camera, renderer.domElement)
//   const proxy = new Proxy(controls, {})
//   return proxy
// }
interface Iscene{
  assetsPath: string
  container: HTMLElement
  scene: THREE.Scene
  mainCamera: THREE.Camera
  renderLoop: any
  clickEvent: any
  controls: any
}
export class ThreeScene {
  private _container: HTMLElement
  scene: THREE.Scene
  renderer: LoopWebGLRenderer
  camera: THREE.PerspectiveCamera
  private _renderLoop: RenderLoop

  private _controls: LoopOrbitControls
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
      // 使用坐标轴
      this.useAxe()
    }
    if (true) { // 网格辅助对象
      this.useGridHelper()
    }
    // 渲染循环
    this._renderLoop = new RenderLoop(this.renderer)

    this._renderLoop.pushRenderer(this.renderer, () => {
      this.renderer.render(this.scene, this.camera)
    })
    // if (true) {
    //   // 使用控制器
    //   this._useOrbitControls()
    // }

    this._renderLoop.start()
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
    this._controls = new LoopOrbitControls(this.camera, this.renderer.domElement)
    this._controls.target.set(0, 0.5, 0)
    this._controls.update()
    this._controls.enablePan = false
    this._controls.enableDamping = true
    this._controls.saveState()
    this._renderLoop.push(this._controls)
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

  setCamera(obj: Object3D) {
    // 设置位置
    // this.camera.
    // 朝向

  }

  addMesh(mesh: any) {
    this.scene.add(mesh)
    this._renderLoop.push(mesh as LoopElement)
  }

  cameraTrack(mesh: THREE.Mesh) {
    // 意外 单纯实现相机追踪 没用极坐标, 只用向量+原点就解决了
    const targetPosition0 = mesh.position
    const cameraPosition0 = this.camera.position
    const offset0 = new THREE.Vector3().copy(cameraPosition0).sub(targetPosition0/* fcous on 位置 */)
    // 这相当于实现了一个闭包, 但是由此可见,闭包会导致代码可读性下降的 尤其是隐藏形闭包+无作用域意识变量
    this._renderLoop.push({
      name: 'cameraTrack',
      tick: () => {
        const targetPosition = mesh.position
        // 相机位置= target + 相机指向向量
        this.camera.position.copy(targetPosition).add(offset0)
        // 相加仍然看向target
        this.camera.lookAt(targetPosition)
      },
    })
  }

  cameraUntrack() {
    this._renderLoop.removeByName('cameraTrack')
  }
}
