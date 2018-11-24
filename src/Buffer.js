import { Descriptor, GLContextualisation } from '@cedric-demongivert/gl-tool-core'
import { STATIC_DRAW } from './BufferUsage'
import { GLBuffer } from './GLBuffer'

export class Buffer extends Descriptor {
  /**
  * Create a new empty buffer with the given usage.
  *
  * @param {BufferUsage} [usage = BufferUsage.STATIC_DRAW] - Usage hint of the created buffer.
  */
  constructor (usage = STATIC_DRAW) {
    super()
    this._usage = usage
  }

  /**
  * @see https://www.khronos.org/registry/OpenGL-Refpages/es2.0/xhtml/glBufferData.xml
  * @return {BufferUsage} The current usage hint of this buffer.
  */
  get usage () {
    return this._usage
  }

  /**
  * @see https://www.khronos.org/registry/OpenGL-Refpages/es2.0/xhtml/glBufferData.xml
  * @param {BufferUsage} value - The new usage hint to apply to this buffer.
  */
  set usage (value) {
    this._usage = value
  }

  /**
  * Commit this buffer content to the graphic card.

  * @return {Buffer} The current buffer for chaining purpose.
  */
  commit () {
    for (const contextualisation of GLContextualisation.all(this)) {
      contextualisation.synchronized = false
    }

    return this
  }

  /**
  * @see Descriptor#contextualise
  */
  contextualise (context) {
    return new GLBuffer(context, this)
  }
}
