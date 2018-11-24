import { GLContextualisation } from '@cedric-demongivert/gl-tool-core'

/**
* A contextualised buffer.
*/
export class GLBuffer extends GLContextualisation {
  /**
  * Create a new webgl buffer from a given descriptor and a rendering context.
  *
  * @param {GLContext|WebGLRenderingContext} context - The webgl rendering context of this instance.
  * @param {Buffer} descriptor - The buffer descriptor to contextualise.
  */
  constructor (context, descriptor) {
    super(context, descriptor)
    this._buffer = null
    this._synchronized = false
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
  * @param {WebGLBuffer} The underlying webgl buffer reference.
  */
  get buffer () {
    return this._buffer
  }

  /**
  * @return {boolean} True if this buffer is bound.
  */
  get bound () {
    throw new Error(`GLBuffer#get bound() : boolean is not implemented.`)
  }

  /**
  * Bind this buffer.
  *
  * @return {GLBuffer} The current instance for chaining purpose.
  */
  bind () {
    throw new Error(`GLBuffer#bind() : GLBuffer is not implemented.`)
  }

  /**
  * @return {number} The size of this buffer.
  */
  get size () {
    throw new Error(`GLBuffer#get size() : number is not implemented.`)
  }

  /**
  * @return {GLEnum} The current usage of this buffer.
  */
  get usage () {
    throw new Error(`GLBuffer#get usage() : GLEnum is not implemented.`)
  }

  /**
  * Synchronize this buffer with its descriptor.
  */
  synchronize () {
    const context = this.context.context

    if (this._buffer == null) {
      this._buffer = context.createBuffer()
    }
  }

  /**
  * Destroy this buffer from its GLContext.
  */
  destroy () {
    this.context.context.deleteBuffer(this._buffer)
    this._buffer = null
    super.destroy()
  }
}
