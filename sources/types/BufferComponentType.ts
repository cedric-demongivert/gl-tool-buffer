import { ComponentType } from '@cedric-demongivert/gl-tool-ecs'

import { Buffer } from '../components/Buffer'

export const BufferComponentType : ComponentType<Buffer> = {
  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate (...params : any) : Buffer {
    return new Buffer(...params)
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : Buffer, target : Buffer) : void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : Buffer) : void {
    instance.clear()
  }
}
