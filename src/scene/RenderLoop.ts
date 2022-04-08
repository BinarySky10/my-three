
import type { LoopElement, LoopWebGLRenderer } from './LoopElement'

export default class Loop {
  // 主renderer--------开启render循环
  private _renderer: LoopWebGLRenderer
  // 需要循环执行其他元素  如同: OrbitControls
  private _elements: Map<String, LoopElement>
  // 渲染器s  其他各种渲染器  CSS2DRenderer  CSS3DRenderer
  private _renderers: Map<String, LoopElement>

  constructor(renderer: LoopWebGLRenderer) {
    this._renderer = renderer
    this._elements = new Map<String, LoopElement>()
    this._renderers = new Map<String, LoopElement>()
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

  removeByName(name: String) {
    this._elements.delete(name)
  }

  pushRenderer(renderer: LoopElement, tickFun: () => void) {
    const name = renderer.name
    renderer.tick = tickFun
    this._renderers.set(name, renderer)
  }

  removeRendererByName(name: String) {
    this._renderers.delete(name)
  }

  _tick() {
    this._elements.forEach((obj: LoopElement) => {
      obj.tick()
    })
    // default
    this._renderers.forEach((render: LoopElement) => {
      render.tick()
    })
  }
}
