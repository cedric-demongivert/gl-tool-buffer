import { GLBuffer } from './GLBuffer'
import { contextualise as contextualiseBufferUsage } from './BufferUsage'

/**
* A wrapper over a WebGLBuffer to bind to an ARRAY_BUFFER target.
*/
export class GLVertexBuffer extends GLBuffer {
  /**
  * @see GLBuffer#get bound
  */
  get bound () {
    const context = this.context.context
    return context.getParameter(
      context.ARRAY_BUFFER_BINDING
    ) === this.buffer
  }

  /**
  * @see GLBuffer#bind
  */
  bind () {
    const context = this.context.context
    context.bindBuffer(context.ARRAY_BUFFER, this._buffer)

    return this
  }

  synchronize () {
    super.synchronize()

    const context = this.context.context
    const descriptor = this.descriptor

    context.bindBuffer(context.ARRAY_BUFFER, this._buffer)

    context.bufferData(
      context.ARRAY_BUFFER,
      descriptor.buffer,
      contextualiseBufferUsage(context, descriptor.usage)
    )

    this.synchronized = true
  }

  /**
  * @see GLBuffer#data
  */
  data (...params) {
    const context = this.context.context
    context.bufferData(context.ARRAY_BUFFER, ...params)
    return this
  }

  /**
  * @see GLBuffer#subdata
  */
  subdata (...params) {
    const context = this.context.context
    context.bufferSubData(context.ARRAY_BUFFER, ...params)
    return this
  }

  /**
  * @see GLBuffer#get size
  */
  get size () {
    const context = this.context.context
    return context.getBufferParameter(
      context.ARRAY_BUFFER,
      context.BUFFER_SIZE
    )
  }

  /**
  * @see GLBuffer#get usage
  */
  get usage () {
    const context = this.context.context
    return context.getBufferParameter(
      context.ARRAY_BUFFER,
      context.BUFFER_USAGE
    )
  }
}
