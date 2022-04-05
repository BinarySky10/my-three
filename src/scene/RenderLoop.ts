
import type { WebGL1Renderer, WebGLRenderer } from 'three'
import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import type { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
interface LoopElement{
  name: String
  update: Function
}
export default class Loop {
  private _renderer: WebGL1Renderer
  private _elements: Map<String, LoopElement>
  private _otherRenderers: Map<String, WebGLRenderer | CSS2DRenderer | CSS3DRenderer>

  constructor(renderer: WebGL1Renderer) {
    this._renderer = renderer
    this._elements = new Map<String, LoopElement>()
    this._otherRenderers = new Map<String, WebGLRenderer|CSS2DRenderer | CSS3DRenderer>()
  }

  start() {
    this._renderer.setAnimationLoop(() => {
      this._update()
    })
  }

  stop() {
    this._renderer.setAnimationLoop(null)
  }

  push(obj: LoopElement) {
    const name = obj.name!
    this._elements.set(name, obj)
  }

  remove(name: String) {
    this._elements.delete(name)
  }

  // pushRenderers(renderer: WebGLRenderer|CSS2DRenderer | CSS3DRenderer) {
  //   const name = renderer.name!
  //   this._otherRenderers.set(name, renderer)
  // }

  // removeRenderers(name: String) {
  //   this._otherRenderers.delete(name)
  // }

  _update() {
    this._elements.forEach((obj: LoopElement) => {
      obj.update()
    })
    // default
    // for (const defaultKey in this.defaults) {
    //   const obj = this.defaults[defaultKey]
    // }
  }
}
