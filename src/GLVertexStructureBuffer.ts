import { GLContextualisation } from '@cedric-demongivert/gl-tool-core'
import { GLContext } from '@cedric-demongivert/gl-tool-core'

import { VertexStructureBuffer } from './VertexStructureBuffer'
import { VertexStructure } from './VertexStructure'
import { BufferParameter } from './BufferParameter'
import { BufferBinding } from './BufferBinding'

export class GLVertexStructureBuffer extends GLContextualisation<VertexStructureBuffer> {
  private buffer : WebGLBuffer

  public constructor (descriptor : VertexStructureBuffer, context : GLContext) {
    super(descriptor, context)

    this.buffer = this.webgl.createBuffer()
  }

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

  public upload (field : VertexStructure.Field, attribute : number) : void
  public upload (field : number, attribute : number) : void
  public upload (field : string, attribute : number) : void
  public upload (field : string | number | VertexStructure.Field, attribute : number) : void {
    throw new Error('upload is not implemented.')
  }

  /**
  * @see GLContextualisation.synchronize
  */
  public synchronize () : void {
    super.synchronize()

    const webgl      : WebGLRenderingContext = this.webgl
    const descriptor : VertexStructureBuffer = this.descriptor

    webgl.bindBuffer(BufferBinding.ARRAY, this.buffer)
    webgl.bufferData(BufferBinding.ARRAY, descriptor.buffer.buffer, descriptor.usage)

    this.synchronized = true
  }

  /**
  * @see GLObject#destroy
  */
  public destroy () {
    this.webgl.deleteBuffer(this.buffer)

    super.destroy()
  }
}
