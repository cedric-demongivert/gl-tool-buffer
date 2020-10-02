import { ComponentType } from '@cedric-demongivert/gl-tool-ecs'

import { Geometry } from '../components/Geometry'

export const GeometryComponentType : ComponentType<Geometry> = {
  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate (...params : any) : Geometry {
    return new Geometry(...params)
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : Geometry, target : Geometry) : void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : Geometry) : void {
    instance.clear()
  }
}
