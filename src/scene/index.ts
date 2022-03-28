import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 基本 scene camera renderer 渲染循环
// 新增 controls
// 新增 resize

export class ThreeScene {
  private _elementId: string
  scene: THREE.Scene
  camera: THREE.Camera
  renderer: THREE.WebGLRenderer
  controls: OrbitControls

  constructor(elementId: string) {
    this._elementId = elementId
    this.init()
    this.addControl()
    this.animate()
  }

  init() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById(this._elementId).appendChild(this.renderer.domElement)

    // 代码
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
    const cube = new THREE.Mesh(geometry, material)

    this.scene.add(cube)
    this.camera.position.z = 5
  }

  animate() {
    requestAnimationFrame(this.animate)
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  animateFunction() {

  }

  addControl() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 0.5, 0)
    this.controls.update()
    this.controls.enablePan = false
    this.controls.enableDamping = true
  }
}
