import type { Camera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default class AdapterOrbitControls extends OrbitControls {
  constructor(object: Camera, domElement?: HTMLElement) {
    super(object, domElement)
  }
}
