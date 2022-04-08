import { WebGLRenderer } from 'three'
import type { WebGLRendererParameters } from 'three'
import type { LoopElement } from './sceneTypes'
export default class LoopWebGLRenderer extends WebGLRenderer implements LoopElement {
  name: String
  constructor(parameters?: WebGLRendererParameters) {
    super(parameters)
    this.name = 'LoopWebGLRenderer'
  }

  tick() {

  }
}
