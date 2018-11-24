import { GLBuffer } from './GLBuffer'
import { contextualise as contextualiseBufferUsage } from './BufferUsage'

/**
* Contextualisation of a face buffer.
*/
export class GLFaceBuffer extends GLBuffer {
  /**
  * @see GLBuffer#get bound
  */
  get bound () {
    const context = this.context.context

    return this.buffer != null && context.getParameter(
      context.ELEMENT_ARRAY_BUFFER_BINDING
    ) === this.buffer
  }

  /**
  * @see GLBuffer#bind
  */
  bind () {
    const context = this.context.context
    context.bindBuffer(
      context.ELEMENT_ARRAY_BUFFER,
      this.buffer
    )

    return this
  }

  /**
  * @see GLBuffer#synchronize
  */
  synchronize () {
    super.synchronize()

    const context = this.context.context
    const descriptor = this.descriptor

    context.bindBuffer(
      context.ELEMENT_ARRAY_BUFFER,
      this.buffer
    )

    context.bufferData(
      this.buffer,
      descriptor.buffer,
      contextualiseBufferUsage(context, descriptor.usage)
    )

    this.synchronized = true
  }

  /**
  * @see GLBuffer#get size
  */
  get size () {
    const context = this.context.context
    return context.getBufferParameter(
      context.ELEMENT_ARRAY_BUFFER,
      context.BUFFER_SIZE
    )
  }

  /**
  * @see GLBuffer#get usage
  */
  get usage () {
    const context = this.context.context
    return context.getBufferParameter(
      context.ELEMENT_ARRAY_BUFFER,
      context.BUFFER_USAGE
    )
  }
}
