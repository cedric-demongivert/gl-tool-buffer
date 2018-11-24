import { Descriptor } from '@cedric-demongivert/gl-tool-core'
import { VertexBuffer } from './VertexBuffer'
import { STATIC_DRAW } from './BufferUsage'

/**
* A vertex buffer based on a given vertex structure.
*/
export class VertexStructureBuffer extends Descriptor {
  /**
  * Create a new vertex structure buffer with a given format.
  *
  * @param {VertexStructure} format - Format of all vertex structures stored into this buffer.
  * @param {number} [capacity = 16] - Initial capacity of the buffer.
  */
  constructor (format, capacity = 16, usage = STATIC_DRAW) {
    super()
    this._buffer = new VertexBuffer(capacity * format.size, usage)
    this._format = format
  }

  /**
  * @return {Uint8Array} The buffer behind this vertex buffer.
  */
  get buffer () {
    return this._buffer.buffer
  }

  /**
  * @see Buffer#get usage
  */
  get usage () {
    return this._buffer.usage
  }

  /**
  * @see Buffer#set usage
  */
  set usage (usage) {
    this._buffer.usage = usage
  }

  /**
  * @return {VertexBuffer} The vertex buffer instance behind this structure buffer.
  */
  get vertexBuffer () {
    return this._buffer
  }

  /**
  * @return {VertexStructure} The format of all vertex structures stored into this buffer.
  */
  get format () {
    return this._format
  }

  /**
  * Return the current capacity of the buffer.
  *
  * @return {number} The current capacity of the buffer.
  */
  get capacity () {
    throw new Error('get capacity is not implemented.')
  }

  /**
  * @param {number} capacity - The new capacity of the buffer.
  */
  set capacity (capacity) {
    throw new Error('set capacity is not implemented.')
  }

  /**
  * Return the number of elements in the buffer.
  *
  * @return {number} The number of elements in the buffer.
  */
  get size () {
    throw new Error('get size is not implemented.')
  }

  /**
  * Change the current size of the buffer.
  *
  * @param {number} newSize - The new size of the buffer.
  */
  set size (newSize) {
    throw new Error('set size is not implemented.')
  }

  /**
  * Concat other buffers into this one.
  *
  * @param {...VertexStructureBuffer} others - Buffers to concat.
  *
  * @return {VertexStructureBuffer} The current instance for chaining purpose.
  */
  concat (...others) {
    throw new Error('concatIn is not implemented.')
  }

  /**
  * Copy some content within this buffer. It will not change the current buffer size.
  *
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/copyWithin
  *
  * @param {number} target
  * @param {number} start
  * @param {number} end
  *
  * @return {VertexStructureBuffer} The current buffer instance for chaining purpose.
  */
  copyWithin (target, start = 0, end = this.size) {
    throw new Error('copyWithin is not implemented.')
  }

  /**
  * Delete one or multiple values from this buffer.
  *
  * @param {number} index - Index of the value to delete.
  * @param {number} [count = 1] - Count of value to delete.
  *
  * @return {VertexStructureBuffer} The current buffer for chaining purpose.
  */
  delete (index, count = 1) {
    throw new Error('delete is not implemented.')
  }

  /**
  * Push another empty vertex structure into this buffer.
  *
  * @return {VertexStructureBuffer} The current buffer for chaining purpose.
  */
  push () {
    throw new Error('push is not implemented.')
  }

  /**
  * Check if this buffer is similar to another (have same size, and equal content).
  *
  * @param {VertexStructureBuffer} other - Other buffer to compare.
  *
  * @return {boolean} True if both buffer are similar.
  */
  equals (other) {
    throw new Error('equals is not implemented.')
  }

  /**
  * Clone the current vertex buffer and return the result.
  *
  * @return {VertexStructureBuffer} A clone of the current vertex buffer.
  */
  clone () {
    throw new Error('clone is not implemented.')
  }

  /**
  * Clear this buffer.
  *
  * @return {VertexStructureBuffer} The current buffer for chaining purpose.
  */
  clear () {
    throw new Error('clear is not implemented.')
  }

  commit () {
    this._buffer.commit()
    return this
  }

  /**
  * @see Descriptor#contextualise
  */
  contextualise (context) {
    throw new Error('contextualise is not implemented.')
  }
}
