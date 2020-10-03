import { System } from '@cedric-demongivert/gl-tool-ecs'
import { IdentifierSet } from '@cedric-demongivert/gl-tool-collection'
import { Pack } from '@cedric-demongivert/gl-tool-collection'
import { Sequence } from '@cedric-demongivert/gl-tool-collection'
import { Buffer as TypedArray } from '@cedric-demongivert/gl-tool-collection'

import { BufferIdentifier } from '../BufferIdentifier'
import { BufferType } from '../BufferType'

import { BufferCollectionListener } from './BufferCollectionListener'

const EMPTY_BUFFER : ArrayBuffer = new ArrayBuffer(0)

export class BufferCollection extends System {
  /**
  * A view over the underlying set of all existing buffers.
  */
  public readonly buffers : Sequence<number>

  /**
  * The maximum number of buffers that can be stored into this collection.
  */
  public readonly capacity : number

  /**
  * A set of all existing buffers.
  */
  private readonly _buffers : IdentifierSet

  /**
  * A sequence of data of buffer indexed by buffer identifier.
  */
  private readonly _datas : Pack<ArrayBuffer>

  /**
  * A sequence of all existing buffer types indexed by their identifier.
  */
  private readonly _types : Pack<BufferType>

  /**
  * A set of all shader collection listener.
  */
  private readonly _listeners : Set<BufferCollectionListener>

  /**
  * Instantiate a new empty shading system.
  *
  * @param [shaderCapacity = 256] - Capacity to allocate for indexing all shaders of this system.
  */
  public constructor (capacity : number = 256) {
    super()

    this._buffers = IdentifierSet.allocate(capacity)
    this._datas = Pack.any(capacity)
    this._types = Pack.uint8(capacity)

    this.buffers = this._buffers.view()
    this._listeners = new Set()
    this.capacity = capacity
  }

  /**
  * Register an existing collection listener.
  *
  * @param listener - A listener to register.
  */
  public addListener (listener : BufferCollectionListener) : void {
    this._listeners.add(listener)

    listener.afterSubscription(this)

    for (const buffer of this._buffers) {
      listener.afterBufferCreation(buffer)
    }
  }

  /**
  * Remove a previously registered collection listener.
  *
  * @param listener - A listener to remove.
  */
  public deleteListener (listener : BufferCollectionListener) : void {
    for (const buffer of this._buffers) {
      listener.beforeBufferDeletion(buffer)
    }

    listener.beforeUnsubscription(this)

    this._listeners.delete(listener)
  }

  /**
  * @see System.initialize
  */
  public initialize () : void {

  }

  /**
  * Declare a new buffer into this collection.
  *
  * @param type - Type of buffer to instantiate.
  *
  * @return The identifier of the buffer that was allocated.
  */
  public create (type : BufferType) : BufferIdentifier
  /**
  * Declare a new buffer into this collection.
  *
  * @param identifier - Identifier of the buffer to declare.
  * @param type - The data to attach to the buffer.
  *
  * @return The identifier of the buffer that was allocated.
  */
  public create (identifier : number, type : BufferType) : BufferIdentifier
  public create (...parameters : any[]) : number {
    let identifier : number, type : BufferType

    if (parameters.length < 2) {
      identifier = BufferIdentifier.UNDEFINED
      type = parameters[0]
    } else {
      identifier = parameters[0]
      type = parameters[1]
    }

    if (identifier === BufferIdentifier.UNDEFINED) {
      identifier = this._buffers.next()
    } else if (this._buffers.has(identifier)) {
      throw new Error(
        'Unable to create buffer #' + identifier + ' because this buffer ' +
        'was already created.'
      )
    } else {
      this._buffers.add(identifier)
    }

    this._datas.set(identifier, EMPTY_BUFFER)
    this._types.set(identifier, type)

    for (const listener of this._listeners) {
      listener.afterBufferCreation(identifier)
    }

    return identifier
  }

  /**
  * Update the content of the given buffer.
  *
  * @param identifier - Identifier of the buffer to commit.
  * @param data - The new buffer content.
  */
  public commit (identifier : BufferIdentifier, data : TypedArray) : void
  /**
  * Update the content of the given buffer.
  *
  * @param identifier - Identifier of the buffer to commit.
  */
  public commit (identifier : BufferIdentifier) : void
  public commit (identifier : BufferIdentifier, data? : TypedArray) : void {
    if (!this._buffers.has(identifier)) {
      throw new Error(
        'Unable to commit buffer #' + identifier + ' because there is ' +
        'no buffer with the given identifier into this system.'
      )
    }

    if (data !== undefined) {
      this._datas.set(identifier, data || EMPTY_BUFFER)
    }

    for (const listener of this._listeners) {
      listener.afterBufferCommit(identifier)
    }
  }

  /**
  * Return a buffer content.
  *
  * @param identifier - Identifier of the buffer to fetch.
  *
  * @return The associated buffer content.
  */
  public getData (identifier : BufferIdentifier) : ArrayBuffer {
    if (!this._buffers.has(identifier)) {
      throw new Error(
        'Unable to get the data associated with buffer #' + identifier +
        ' because there is no buffer with the given identifier into ' +
        'this system.'
      )
    }

    return this._datas.get(identifier)
  }

  /**
  * Return a buffer content.
  *
  * @param identifier - Identifier of the buffer to fetch.
  *
  * @return The associated buffer content.
  */
  public getType (identifier : BufferIdentifier) : BufferType {
    if (!this._buffers.has(identifier)) {
      throw new Error(
        'Unable to get the type associated with buffer #' + identifier +
        ' because there is no buffer with the given identifier into ' +
        'this system.'
      )
    }

    return this._types.get(identifier)
  }

  /**
  * Remove a buffer from this system.
  *
  * @param identifier - Identifier of the buffer to delete.
  */
  public delete (identifier : BufferIdentifier) : void {
    if (!this._buffers.has(identifier)) {
      throw new Error(
        'Unable to delete buffer #' + identifier + ' because there is ' +
        'no buffer with the given identifier into this system.'
      )
    }

    for (const listener of this._listeners) {
      listener.beforeBufferDeletion(identifier)
    }

    this._buffers.delete(identifier)
    this._datas.set(identifier, null)
  }

  /**
  * @see System.destroy
  */
  public destroy () : void {
    while (this._buffers.size > 0) {
      this.delete(this._buffers.last)
    }

    while (this._listeners.size > 0) {
      this.deleteListener(this._listeners.values().next().value)
    }
  }

  /**
  * @see Object.equals
  */
  public equals (other : any) : boolean {
    if (other == null) return false

    return other === this
  }

  /**
  * @see Object.toString
  */
  public toString () : string {
    let result : string = ''
    let first : boolean = true

    result += 'BufferCollection ['
    for (const shader of this._buffers) {
      if (first) {
        first = false
      } else {
        result += ', '
      }

      result += shader
    }
    result += ']'

    return result
  }
}
