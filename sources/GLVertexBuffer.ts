import { GLBuffer } from './GLBuffer'
import { VertexBuffer } from './VertexBuffer'
import { BufferBinding } from './BufferBinding'
import { BufferParameter } from './BufferParameter'

/**
* A wrapper over a WebGLBuffer to bind to an ARRAY_BUFFER target.
*/
export class GLVertexBuffer extends GLBuffer<VertexBuffer> {
  /**
  * @see GLBuffer.bound
  */
  public get bound () : boolean {
    return this.webgl.getParameter(BufferParameter.ARRAY_BINDING) === this.buffer
  }

  /**
  * @see GLBuffer.bind
  */
  public bind () : void {
    this.webgl.bindBuffer(BufferBinding.ARRAY, this.buffer)
  }

  /**
  * @see GLContextualisation.synchronize
  */
  public synchronize () : void {
    super.synchronize()

    const webgl      : WebGLRenderingContext = this.webgl
    const descriptor : VertexBuffer = this.descriptor

    webgl.bindBuffer(BufferBinding.ARRAY, this.buffer)
    webgl.bufferData(BufferBinding.ARRAY, descriptor.buffer, descriptor.usage)

    this.synchronized = true
  }
}
