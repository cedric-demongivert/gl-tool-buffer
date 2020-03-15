import { GLBuffer } from './GLBuffer'
import { FaceBuffer } from './FaceBuffer'
import { BufferBinding } from './BufferBinding'
import { BufferParameter } from './BufferParameter'

/**
* Contextualisation of a face buffer.
*/
export class GLFaceBuffer extends GLBuffer<FaceBuffer> {
  /**
  * @see GLBuffer#get bound
  */
  public get bound () : boolean {
    return this.webgl.getParameter(BufferParameter.ELEMENT_ARRAY_BINDING) === this.buffer
  }

  /**
  * @see GLBuffer#bind
  */
  public bind () : void {
    this.webgl.bindBuffer(BufferBinding.ELEMENT_ARRAY, this.buffer)
  }

  /**
  * @see GLBuffer#synchronize
  */
  public synchronize () : void {
    super.synchronize()

    const webgl      : WebGLRenderingContext = this.webgl
    const descriptor : FaceBuffer            = this.descriptor

    webgl.bindBuffer(BufferBinding.ELEMENT_ARRAY, this.buffer)
    webgl.bufferData(BufferBinding.ELEMENT_ARRAY, descriptor.buffer, descriptor.usage)

    this.synchronized = true
  }
}
