import { System } from '@cedric-demongivert/gl-tool-ecs'
import { Pack } from '@cedric-demongivert/gl-tool-collection'

import { BufferCollectionListener } from '../systems/BufferCollectionListener'
import { BufferCollection } from '../systems/BufferCollection'

import { BufferIdentifier } from '../BufferIdentifier'

import { WebGLBufferState } from './WebGLBufferState'
import { WebGLBufferUsage } from './WebGLBufferUsage'
import { WebGLBufferBinding } from './WebGLBufferBinding'

export class WebGLBufferCollection extends System implements BufferCollectionListener {
  /**
  * This collection webgl context.
  */
  private _webgl : WebGLRenderingContext

  /**
  * A sequence of all existing webgl buffer indexed by their application identifier.
  */
  private _buffers : Pack<WebGLBuffer>

  /**
  * A sequence of all existing webgl buffer states indexed by their application identifier.
  */
  private _states : Pack<WebGLBufferState>

  /**
  * Parent application buffer collection.
  */
  private _descriptors : BufferCollection

  /**
  * Instantiate a new webgl shader collection for a given context.
  *
  * @param webgl - A webgl context.
  */
  public constructor (webgl : WebGLRenderingContext) {
    super()
    this._buffers = Pack.any(0)
    this._states = Pack.uint8(0)
    this._webgl = webgl
    this._descriptors = null
  }

  /**
  * @see BufferCollectionListener.afterSubscription
  */
  public afterSubscription (collection : BufferCollection) : void {
    if (this._descriptors == null) {
      this._descriptors = collection
      this._buffers.reallocate(this._descriptors.capacity)
      this._states.reallocate(this._descriptors.capacity)
    } else {
      throw new Error(
        'Unable to subscribe this WebGLBufferCollection to the given ' +
        'BufferCollection because this WebGLBufferCollection was already ' +
        'registered into another BufferCollection instance.'
      )
    }
  }

  /**
  * @see BufferCollectionListener.beforeUnsubscription
  */
  public beforeUnsubscription (collection : BufferCollection) : void {
    if (this._descriptors === collection) {
      this._descriptors = null
      this._buffers.reallocate(0)
      this._states.reallocate(0)
    } else {
      throw new Error(
        'Unable to unsubscribe this WebGLBufferCollection from the given ' +
        'BufferCollection because this WebGLBufferCollection was registered ' +
        'into another BufferCollection instance.'
      )
    }
  }

  /**
  * @see BufferCollectionListener.beforeBufferDeletion
  */
  public beforeBufferDeletion (identifier : BufferIdentifier) : void {
    const state : WebGLBufferState = this._states.get(identifier)

    if (state !== WebGLBufferState.BLANK) {
      this._webgl.deleteBuffer(this._buffers.get(identifier))
    }
  }

  /**
  * @see BufferCollectionListener.afterBufferCreation
  */
  public afterBufferCreation (identifier : BufferIdentifier) : void {
    this._states.set(identifier, WebGLBufferState.BLANK)
  }

  /**
  * @see BufferCollectionListener.afterBufferCommit
  */
  public afterBufferCommit (identifier : BufferIdentifier) : void {
    if (this._states.get(identifier) !== WebGLBufferState.BLANK) {
      this._states.set(identifier, WebGLBufferState.DIRTY)
    }
  }

  /**
  * Instantiate the requested buffer and return it's associated WebGL pointer.
  *
  * @param identifier - The buffer to instantiate.
  */
  public instantiate (identifier : BufferIdentifier) : WebGLBuffer {
    const state : WebGLBufferState = this._states.get(identifier)

    if (state === WebGLBufferState.BLANK) {
      const buffer : WebGLBuffer = this._webgl.createBuffer()

      this._webgl.bindBuffer(this.getBinding(identifier), buffer)

      this._buffers.set(identifier, buffer)
      this._states.set(identifier, WebGLBufferState.DIRTY)
      return buffer
    } else {
      throw new Error(
        'Unable to instantiate the buffer #' + identifier + ' because this ' +
        'buffer was already instantiated and is currently in #' + state +
        ' "' + WebGLBufferState.toString(state) + '" state.'
      )
    }
  }

  /**
  * Commit the content of the buffer to the rendering context.
  *
  * @param identifier - The buffer to commit.
  * @param usage - Usage hint.
  */
  public commit (identifier : BufferIdentifier, usage : WebGLBufferUsage) : WebGLBuffer {
    const webgl : WebGLRenderingContext = this._webgl
    const buffer : WebGLBuffer = this._buffers.get(identifier)
    const state : WebGLBufferState = this._states.get(identifier)

    switch (state) {
      case WebGLBufferState.BLANK:
        throw new Error(
          'Unable to commit buffer #' + identifier + ' because the given ' +
          'buffer was not instantiated.'
        )
      case WebGLBufferState.ERROR:
      case WebGLBufferState.DIRTY:
        const content : ArrayBuffer = this._descriptors.getData(identifier)
        const binding : WebGLBufferBinding = this.getBinding(identifier)

        this._webgl.bindBuffer(binding, buffer)
        webgl.bufferData(binding, content, usage)

        this._states.set(identifier, WebGLBufferState.READY)
      case WebGLBufferState.READY:
        return
      default:
        throw new Error(
          'Unable to compile shader #' + identifier + ' in state #' + state +
          ' "' + WebGLBufferState.toString(state) + '" because this ' +
          'WebGLShaderCollection does not define a compilation procedure for ' +
          'shaders in this state.'
        )
    }
  }

  private getBinding (identifier : BufferIdentifier) : WebGLBufferBinding {
    return WebGLBufferBinding.fromType(this._descriptors.getType(identifier))
  }

  /**
  * Instantiate and Commit the given buffer.
  *
  * @param identifier - The buffer to bootstrap.
  * @param usage - Usage hint.
  */
  public bootstrap (identifier : BufferIdentifier, usage : WebGLBufferUsage) : void {
    const webgl : WebGLRenderingContext = this._webgl
    const state : WebGLBufferState = this._states.get(identifier)

    switch (state) {
      case WebGLBufferState.BLANK:
        this.instantiate(identifier)
      case WebGLBufferState.ERROR:
      case WebGLBufferState.DIRTY:
        this.commit(identifier, usage)
      case WebGLBufferState.READY:
        return
      default:
        throw new Error(
          'Unable to bootstrap the buffer #' + identifier + ' in state #' +
          state + ' "' + WebGLBufferState.toString(state) + '" because this ' +
          'WebGLBufferCollection does not define a bootstrap procedure for ' +
          'buffer in this state.'
        )
    }
  }

  /**
  * Release the requested buffer.
  *
  * @param identifier - Buffer to free.
  */
  public free (identifier : BufferIdentifier) : void {
    const state : WebGLBufferState = this._states.get(identifier)

    if (state !== WebGLBufferState.BLANK) {
      this._webgl.deleteBuffer(this._buffers.get(identifier))
      this._states.set(identifier, WebGLBufferState.BLANK)
    } else {
      throw new Error(
        'Unable to free the buffer #' + identifier + ' because this ' +
        'buffer was not instantiated into this context.'
      )
    }
  }

  /**
  * Bind the requested shader.
  *
  * @param identifier - Buffer to bind.
  */
  public bind (identifier : BufferIdentifier) : void {
    const state : WebGLBufferState = this._states.get(identifier)

    if (state === WebGLBufferState.READY) {
      this._webgl.bindBuffer(
        this.getBinding(identifier),
        this._buffers.get(identifier)
      )
    } else {
      throw new Error(
        'Unable to bind the buffer #' + identifier + ' because this ' +
        'buffer was not ready into this context.'
      )
    }
  }

  /**
  * @return The parent application shader collection.
  */
  public getDescriptors () : BufferCollection {
    return this._descriptors
  }

  /**
  * @return The WebGLContext of this collection.
  */
  public getContext () : WebGLRenderingContext {
    return this._webgl
  }

  /**
  * Return the buffer pointer associated with the given identifier.
  *
  * @param identifier - A buffer identifier.
  *
  * @return The pointer associated with the given buffer.
  */
  public getBuffer (identifier : BufferIdentifier) : WebGLBuffer {
    if (this._states.get(identifier) !== WebGLBufferState.BLANK) {
      return this._buffers.get(identifier)
    } else {
      throw new Error(
        'Unable to return the pointer associated to the buffer #' + identifier +
        ' because this buffer was not instantiated into this context.'
      )
    }
  }

  public getState (identifier : BufferIdentifier) : WebGLBufferState {
    return this._states.get(identifier)
  }

  /**
  * @see System.destroy
  */
  public destroy () {
    if (this._descriptors != null) {
      this._descriptors.deleteListener(this)
    }
  }
}
