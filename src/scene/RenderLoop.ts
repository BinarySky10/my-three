
import { MathUtils } from 'three'

import type { WebGLRenderer } from 'three'
import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import type { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
export interface LoopElement{
  name: String
  tick: Function
}
export default class Loop {
  // 主renderer--------开启render循环
  private _renderer: WebGLRenderer
  // 需要循环执行其他元素  如同: OrbitControls
  private _elements: Map<String, LoopElement>
  // 渲染器s  其他各种渲染器  CSS2DRenderer  CSS3DRenderer
  private _renderers: Map<String, WebGLRenderer | CSS2DRenderer | CSS3DRenderer>

  constructor(renderer: WebGLRenderer) {
    this._renderer = renderer
    this._elements = new Map<String, LoopElement>()
    this._renderers = new Map<String, WebGLRenderer|CSS2DRenderer | CSS3DRenderer>()
  }

  start() {
    this._renderer.setAnimationLoop(() => {
      this._tick()
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

  _tick() {
    this._elements.forEach((obj: LoopElement) => {
      obj.tick()
    })
    // default
    // for (const defaultKey in this.defaults) {
    //   const obj = this.defaults[defaultKey]
    // }
  }
}
