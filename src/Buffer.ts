import { Descriptor } from '@cedric-demongivert/gl-tool-core'

import { BufferUsage } from './BufferUsage'

export class Buffer implements Descriptor {
  /**
  * @see https://www.khronos.org/registry/OpenGL-Refpages/es2.0/xhtml/glBufferData.xml
  * @return {BufferUsage} The current usage hint of this buffer.
  */
  public usage : BufferUsage

  /**
  * Create a new empty buffer with the given usage.
  *
  * @param [usage = STATIC_DRAW] - Usage hint of the created buffer.
  */
  public constructor (usage : BufferUsage = BufferUsage.STATIC_DRAW) {
    this.usage = usage
  }
}
