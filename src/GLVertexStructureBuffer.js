import { GLContextualisation } from '@cedric-demongivert/gl-tool-core'

export class GLVertexStructureBuffer extends GLContextualisation {
  constructor (context, descriptor) {
    super(context, descriptor)
    GLContextualisation.of(context, descriptor.vertexBuffer)
    this._synchronized = false
  }

  /**
  * @see GLVertexBuffer#get buffer
  */
  get buffer () {
    return this.vertexBuffer.buffer
  }

  /**
  * @return {boolean} True if this contextualisation is not synchronized with its descriptor.
  */
  get synchronized () {
    return this._synchronized
  }

  /**
  * @param {boolean} value - New synchronization state of this contextualisation.
  */
  set synchronized (value) {
    this._synchronized = value
  }

  /**
  * @return {GLVertexBuffer} The underlying VertexBuffer contextualisation.
  */
  get vertexBuffer () {
    return GLContextualisation.of(this.context, this.descriptor.vertexBuffer)
  }

  /**
  * @see GLBuffer#get bound
  */
  get bound () {
    return this.vertexBuffer.bound
  }

  /**
  * @see GLBuffer#bind
  */
  bind () {
    this.vertexBuffer.bind()

    return this
  }

  /**
  * @see GLBuffer#synchronize
  */
  synchronize () {
    this.vertexBuffer.synchronize()
    this.synchronized = true
  }

  /**
  * @see GLVertexBuffer#data
  */
  data (...params) {
    this.vertexBuffer.data(...params)
    return this
  }

  /**
  * @see GLVertexBuffer#subdata
  */
  subdata (...params) {
    this.vertexBuffer.subdata(...params)
    return this
  }

  /**
  * @see GLBuffer#get size
  */
  get size () {
    return this.vertexBuffer.size
  }

  /**
  * @see GLBuffer#get usage
  */
  get usage () {
    return this.vertexBuffer.usage
  }

  /**
  * Upload the content of this buffer to a given program.
  *
  * @param {GLProgram} program - A program reference.
  * @param {{string: string}} [alias = undefined] - Alias that map fields of this structure to attributes of the given program.
  *
  * @return {GLVertexStructureBuffer} The current buffer instance for chaining purpose.
  */
  uploadTo (program, alias) {
    throw new Error('uploadTo is not implemented.')
  }

  /**
  * @see GLObject#destroy
  */
  destroy () {
    const vertexBuffer = this.vertexBuffer
    super.destroy()
    vertexBuffer.destroy()
  }
}
