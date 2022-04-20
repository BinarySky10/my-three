import type { PerspectiveCamera, WebGLRenderer } from 'three'

import { loadBirds } from './components/birds/birds'
import { createCamera } from './components/camera'
import { createLights } from './components/lights'
import { createScene } from './components/scene'

import { createControls } from './systems/controls'
import { createRenderer } from './systems/renderer'
import { Resizer } from './systems/Resizer'
import { Loop } from './systems/Loop'

let controls

let scene
let loop
// code from https://discoverthreejs.com/book/first-steps/animation-system/
class World {
  _camera: PerspectiveCamera
  _renderer: WebGLRenderer
  constructor(container: HTMLElement) {
    this._camera = createCamera()
    this._renderer = createRenderer()

    scene = createScene()
    loop = new Loop(this._camera, scene, this._renderer)
    container.append(this._renderer.domElement)
    controls = createControls(this._camera, this._renderer.domElement)

    const { ambientLight, mainLight } = createLights()

    loop.updatables.push(controls)
    scene.add(ambientLight, mainLight)

    const resizer = new Resizer(container, this._camera, this._renderer)
  }

  async init() {
    const { parrot, flamingo, stork } = await loadBirds()

    // move the target to the center of the front bird
    controls.target.copy(parrot.position)

    loop.updatables.push(parrot, flamingo, stork)
    scene.add(parrot, flamingo, stork)
  }

  render() {
    this._renderer.render(scene, this._camera)
  }

  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }
}

export { World }
