import { GLContextualisation } from '@cedric-demongivert/gl-tool-core'
import { Buffer } from './Buffer'
import { STATIC_DRAW } from './BufferUsage'
import { GLFaceBuffer } from './GLFaceBuffer'

/**
* A face buffer.
*/
export class FaceBuffer extends Buffer {
  /**
  * Create a new empty face buffer with an initial capacity and a given usage hint.
  *
  * @param {number} [capacity = 16] - Initial capacity of the buffer.
  * @param {BufferUsage} [usage = BufferUsage.STATIC_DRAW] - Usage hint of this buffer.
  */
  constructor (capacity = 16, usage = STATIC_DRAW) {
    super(usage)
    this._buffer = new Uint16Array(capacity * 3)
    this._size = 0
  }

  /**
  * Create a new empty face buffer with an initial capacity and a given usage hint.
  *
  * @param {number} [capacity = 16] - Initial capacity of the created buffer.
  * @param {BufferUsage} [usage = BufferUsage.STATIC_DRAW] - Usage hint of the created buffer.
  *
  * @return {FaceBuffer} The created buffer.
  */
  static empty (capacity = 16, usage = STATIC_DRAW) {
    return new FaceBuffer(capacity, usage)
  }

  /**
  * Create a clone of another face buffer.
  *
  * @param {FaceBuffer} toClone - The face buffer instance to clone.
  *
  * @return {FaceBuffer} A clone of the given instance.
  */
  static clone (toClone) {
    if (toClone == null) throw new Error('Trying to clone a null face buffer.')

    const clone = new FaceBuffer(toClone.capacity, toClone.usage)
    clone._buffer.set(toClone._buffer, 0)
    clone._size = toClone.size
    return clone
  }

  /**
  * @return {Uint16Array} The raw buffer behind this face buffer.
  */
  get buffer () {
    return this._buffer
  }

  /**
  * Return the current capacity of the buffer.
  *
  * @return {number} The current capacity of the buffer.
  */
  get capacity () {
    return this._buffer.length / 3
  }

  /**
  * @param {number} capacity - The new capacity of the buffer.
  */
  set capacity (capacity) {
    if (capacity < 0) {
      throw new Error('A FaceBuffer capacity can\'t be negative.')
    }

    const byteCapacity = capacity * 3

    if (byteCapacity > this._buffer.length) {
      const next = new Uint16Array(byteCapacity)
      next.set(this._buffer, 0)
      this._buffer = next
      this._view = new DataView(this._buffer.buffer)
    } else if (byteCapacity < this._buffer.length) {
      const next = new Uint16Array(byteCapacity)
      next.set(this._buffer.subarray(0, byteCapacity), 0)
      this._buffer = next
      if (this._size > capacity) this._size = capacity
      this._view = new DataView(this._buffer.buffer)
    }
  }

  /**
  * Return the number of elements in the buffer.
  *
  * @return {number} The number of elements in the buffer.
  */
  get size () {
    return this._size
  }

  /**
  * Change the current size of the buffer.
  *
  * @param {number} newSize - The new size of the buffer.
  */
  set size (newSize) {
    if (newSize < 0) {
      throw new Error('A FaceBuffer size can\'t be negative.')
    }

    if (newSize > this._size) {
      if (newSize > this._buffer.length / 3) {
        const byteCapacity = newSize * 3
        const next = new Uint16Array(byteCapacity)
        next.set(this._buffer, 0)
        this._buffer = next
        this._view = new DataView(this._buffer.buffer)
      }
      this._buffer.fill(
        0, this._size * 3, newSize * 3
      )
    }

    this._size = newSize
  }

  /**
  * Add a face into this buffer.
  *
  * @param {number} f1 - First vertex identifier of the face to add.
  * @param {number} f2 - Second vertex identifier of the face to add.
  * @param {number} f3 - Third vertex identifier of the face to add.
  *
  * @return {FaceBuffer} This face buffer for chaining purpose.
  */
  push (f1, f2, f3) {
    const start = this._size * 3
    this.size += 1

    this._buffer[start] = f1
    this._buffer[start + 1] = f2
    this._buffer[start + 2] = f3

    return this
  }

  /**
  * Set a face of this buffer.
  *
  * @param {number} index - Index of the face to set.
  * @param {number} f1 - First vertex identifier of the face to set.
  * @param {number} f2 - Second vertex identifier of the face to set.
  * @param {number} f3 - Third vertex identifier of the face to set.
  *
  * @return {FaceBuffer} This face buffer for chaining purpose.
  */
  set (index, f1, f2, f3) {
    if (index + 1 > this._size) this.size = index + 1

    const offset = index * 3

    this._buffer[offset] = f1
    this._buffer[offset + 1] = f2
    this._buffer[offset + 2] = f3

    return this
  }

  /**
  * Concat this buffer with another.
  *
  * @param {FaceBuffer} other - Buffer to concat.
  *
  * @return {FaceBuffer} This face buffer for chaining purpose.
  */
  concat (other) {
    const nextCapacity = this._size + other.size
    if (nextCapacity > this.capacity) this.capacity = nextCapacity
    const entrySize = 3

    this._buffer.set(
      other._buffer.slice(0, other.size * entrySize),
      this._size * entrySize
    )

    this._size += other.size

    return this
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
  * @return {FaceBuffer} The current buffer instance for chaining purpose.
  */
  copyWithin (target, start = 0, end = this._size) {
    let ftarget = target >> 0
    let fstart = start >> 0
    let fend = end >> 0

    const size = this._size
    fstart = (fstart < 0) ? Math.max(fstart + size, 0) : Math.min(fstart, size)
    fend = (fend < 0) ? Math.max(fend + size, 0) : Math.min(fend, size)
    ftarget = (ftarget < 0) ? Math.max(ftarget + size, 0) : Math.min(ftarget, size)

    const entrySize = 3
    this._buffer.copyWithin(
      ftarget * entrySize,
      fstart * entrySize,
      fend * entrySize
    )

    return this
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/entries
  *
  * @return {Iterator<[number, [number, number, number]]>}
  */
  * entries () {
    for (let i = 0; i < this._size; ++i) {
      yield [i, this.get(i)]
    }
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/every
  */
  every (callback, thisArg) {
    for (const [index, value] of this.entries()) {
      if (!callback.call(thisArg, value, index, this)) {
        return false
      }
    }

    return true
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/fill
  */
  fill (value, start = 0, end = this._size) {
    start >>= 0
    end >>= 0

    const size = this._size
    const rstart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size)
    const rend = end < 0 ? Math.max(size + end, 0) : Math.min(end, size)

    this._buffer.fill(value, rstart * 3, rend * 3)

    return this
  }

  /**
  * Check if a face was set at the given index.
  *
  * @param {number} index - Index to check.
  *
  * @return {boolean} True if a face exists at the given index.
  */
  has (index) {
    return index >= 0 && index < this._size
  }

  /**
  * Return a face of the buffer.
  *
  * @param {number} index - Index of the face to get.
  *
  * @return {[number, number, number]} A face of this buffer.
  */
  get (index) {
    return [
      this.getVertex(index, 0),
      this.getVertex(index, 1),
      this.getVertex(index, 2)
    ]
  }

  /**
  * Iterate over each vertex of a face.
  *
  * @param {number} index - Index of the face to iterate.
  *
  * @return {Iterator<number>} An iterator that iterate over each vertex of the given face.
  */
  * face (index) {
    yield this.getVertex(index, 0)
    yield this.getVertex(index, 1)
    yield this.getVertex(index, 2)
  }

  /**
  * Return a vertex of a face of the buffer.
  *
  * @param {number} faceIndex - Index of the face to get.
  * @param {number} vertexIndex - Index of the vertex to get.
  *
  * @return {number} The requested vertex.
  */
  getVertex (faceIndex, vertexIndex) {
    return this._buffer[faceIndex * 3 + vertexIndex]
  }

  /**
  * Delete one or multiple values from this buffer.
  *
  * @param {number} index - Index of the value to delete.
  * @param {number} [count = 1] - Count of value to delete.
  *
  * @return {FaceBuffer} The current buffer for chaining purpose.
  */
  delete (index, count = 1) {
    this._buffer.copyWithin(
      index * 3,
      (index + count) * 3,
      this._buffer.length
    )

    this.size -= count

    return this
  }

  /**
  * Check if this buffer is similar to another (have same size, and same content).
  *
  * @param {FaceBuffer} other - Other buffer to compare.
  *
  * @return {boolean} True if both buffer are similar.
  */
  equals (other) {
    if (other === this) return true
    if (other == null) return false

    if (other instanceof FaceBuffer && other.size === this._size) {
      const thisBuffer = this._buffer
      const otherBuffer = other.buffer
      let index = 3 * this._size

      while (index --) {
        if (otherBuffer[index] !== thisBuffer[index]) {
          return false
        }
      }

      return true
    } else {
      return false
    }
  }

  /**
  * Clone the current face buffer and return the result.
  *
  * @return {FaceBuffer} A clone of the current face buffer.
  */
  clone () {
    return FaceBuffer.clone(this)
  }

  /**
  * Clear this buffer.
  * @return {FaceBuffer} The current face buffer for chaining purpose.
  */
  clear () {
    this.size = 0
    return this
  }

  /**
  * @see Descriptor#contextualise
  */
  contextualise (context) {
    return new GLFaceBuffer(context, this)
  }
}
