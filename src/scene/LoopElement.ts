import { WebGLRenderer } from 'three'
import type { Camera, WebGLRendererParameters } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export interface LoopElement{
  name: String
  tick: () => void
}

export class LoopWebGLRenderer extends WebGLRenderer implements LoopElement {
  name: String
  constructor(parameters?: WebGLRendererParameters) {
    super(parameters)
    this.name = 'LoopWebGLRenderer'
  }

  tick: () => void
}
export class LoopOrbitControls extends OrbitControls implements LoopElement {
  name: String
  constructor(object: Camera, domElement?: HTMLElement) {
    super(object, domElement)
    this.name = 'OrbitControls'
  }

  tick() {
    this.update()
  }
}
