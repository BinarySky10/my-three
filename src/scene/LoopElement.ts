import { WebGLRenderer } from 'three'
import type { WebGLRendererParameters } from 'three'
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
