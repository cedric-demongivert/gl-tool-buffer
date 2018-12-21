import { Buffer } from './Buffer'
import { GLVertexBuffer } from './GLVertexBuffer'
import { STATIC_DRAW } from './BufferUsage'
/**
* A generic vertex buffer.
*/
export class VertexBuffer extends Buffer {
  /**
  * Create a new empty vertex buffer with an initial capacity.
  *
  * @param {number} [capacity = 16] - Initial capacity of the buffer in bytes.
  * @param {BufferUsage} [usage = STATIC_DRAW] - Usage hint of the new buffer.
  */
  constructor (capacity = 16, usage = STATIC_DRAW) {
    super(usage)
    this._buffer = new Uint8Array(capacity)
    this._view = new DataView(this._buffer.buffer)
    this._size = 0
  }

  /**
  * Create a new empty vertex buffer with an initial capacity.
  *
  * @param {number} [capacity = 16] - Initial capacity of the created buffer.
  * @param {BufferUsage} [usage = STATIC_DRAW] - Usage hint of the created buffer.
  *
  * @return {VertexBuffer} The created buffer.
  */
  static empty (capacity = 16, usage = STATIC_DRAW) {
    return new VertexBuffer(capacity, usage)
  }

  /**
  * Create a clone of another vertex buffer.
  *
  * @param {VertexBuffer} toClone - The vertex buffer instance to clone.
  *
  * @return {VertexBuffer} A clone of the given instance.
  */
  static clone (toClone) {
    if (toClone == null) {
      throw new Error('Trying to clone a null vertex buffer.')
    }

    const clone = new VertexBuffer(toClone.capacity, toClone.usage)
    clone._buffer.set(toClone._buffer, 0)
    clone._size = toClone._size
    return clone
  }

  /**
  * @return {Uint8Array} The raw buffer behind this vertex buffer.
  */
  get buffer () {
    return this._buffer
  }

  /**
  * Return the current capacity of the buffer in bytes.
  *
  * @return {number} The current capacity of the buffer in bytes.
  */
  get capacity () {
    return this._buffer.length
  }

  /**
  * @param {number} capacity - The new capacity of the buffer in bytes.
  */
  set capacity (capacity) {
    if (capacity < 0) {
      throw new Error('A VertexBuffer capacity can\'t be negative.')
    }

    if (capacity > this._buffer.length) {
      const next = new Uint8Array(capacity)
      next.set(this._buffer, 0)
      this._buffer = next
      this._view = new DataView(this._buffer.buffer)
    } else if (capacity < this._buffer.length) {
      const next = new Uint8Array(capacity)
      next.set(this._buffer.subarray(0, capacity), 0)
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
      throw new Error('A VertexBuffer size can\'t be negative.')
    }

    if (newSize > this._size) {
      if (newSize > this._buffer.length) {
        const next = new Uint8Array(newSize)
        next.set(this._buffer, 0)
        this._buffer = next
        this._view = new DataView(this._buffer.buffer)
      }
      this._buffer.fill(0, this._size, newSize)
    }

    this._size = newSize
  }

  get (byte) {
    return this._buffer[byte]
  }

  getFloat (byte) {
    return this._view.getFloat32(byte, true)
  }

  getDouble (byte) {
    return this._view.getFloat64(byte, true)
  }

  getByte (byte) {
    return this._view.getInt8(byte)
  }

  getUnsignedByte (byte) {
    return this._view.getUint8(byte)
  }

  getShort (byte) {
    return this._view.getInt16(byte, true)
  }

  getUnsignedShort (byte) {
    return this._view.getUint16(byte, true)
  }

  getInt (byte) {
    return this._view.getInt32(byte, true)
  }

  getUnsignedInt (byte) {
    return this._view.getUint32(byte, true)
  }

  getFloatVector (byte, index) {
    return this._view.getFloat32(byte + index * Float32Array.BYTES_PER_ELEMENT, true)
  }

  getDoubleVector (byte, index) {
    return this._view.getFloat64(byte + index * Float64Array.BYTES_PER_ELEMENT, true)
  }

  getByteVector (byte, index) {
    return this._view.getInt8(byte + index * Int8Array.BYTES_PER_ELEMENT, true)
  }

  getUnsignedByteVector (byte, index) {
    return this._view.getUint8(byte + index * Uint8Array.BYTES_PER_ELEMENT, true)
  }

  getShortVector (byte, index) {
    return this._view.getInt16(byte + index * Int16Array.BYTES_PER_ELEMENT, true)
  }

  getUnsignedShortVector (byte, index) {
    return this._view.getUint16(byte + index * Uint16Array.BYTES_PER_ELEMENT, true)
  }

  getIntVector (byte, index) {
    return this._view.getInt32(byte + index * Int32Array.BYTES_PER_ELEMENT, true)
  }

  getUnsignedIntVector (byte, index) {
    return this._view.getUint32(byte + index * Uint32Array.BYTES_PER_ELEMENT, true)
  }

  get2x2FloatMatrix (byte, x, y) {
    return this._view.getFloat32(
      byte + (x * 2 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  get2x3FloatMatrix (byte, x, y) {
    return this._view.getFloat32(
      byte + (x * 3 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  get2x4FloatMatrix (byte, x, y) {
    return this._view.getFloat32(
      byte + (x * 4 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  get3x2FloatMatrix (byte, x, y) {
    return this._view.getFloat32(
      byte + (x * 2 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  get3x3FloatMatrix (byte, x, y) {
    return this._view.getFloat32(
      byte + (x * 3 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  get3x4FloatMatrix (byte, x, y) {
    return this._view.getFloat32(
      byte + (x * 4 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  get4x2FloatMatrix (byte, x, y) {
    return this._view.getFloat32(
      byte + (x * 2 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  get4x3FloatMatrix (byte, x, y) {
    return this._view.getFloat32(
      byte + (x * 3 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  get4x4FloatMatrix (byte, x, y) {
    return this._view.getFloat32(
      byte + (x * 4 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  get2x2DoubleMatrix (byte, x, y) {
    return this._view.getFloat64(
      byte + (x * 2 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  get2x3DoubleMatrix (byte, x, y) {
    return this._view.getFloat64(
      byte + (x * 3 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  get2x4DoubleMatrix (byte, x, y) {
    return this._view.getFloat64(
      byte + (x * 4 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  get3x2DoubleMatrix (byte, x, y) {
    return this._view.getFloat64(
      byte + (x * 2 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  get3x3DoubleMatrix (byte, x, y) {
    return this._view.getFloat64(
      byte + (x * 3 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  get3x4DoubleMatrix (byte, x, y) {
    return this._view.getFloat64(
      byte + (x * 4 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  get4x2DoubleMatrix (byte, x, y) {
    return this._view.getFloat64(
      byte + (x * 2 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  get4x3DoubleMatrix (byte, x, y) {
    return this._view.getFloat64(
      byte + (x * 3 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  get4x4DoubleMatrix (byte, x, y) {
    return this._view.getFloat64(
      byte + (x * 4 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  set (byte, value) {
    this._buffer[byte] = value
    return this
  }

  setFloat (byte, value) {
    const view = this._view
    view.setFloat32(byte, value, true)
    return this
  }

  setDouble (byte, value) {
    const view = this._view
    view.setFloat64(byte, value, true)
    return this
  }

  setByte (byte, value) {
    const view = this._view
    view.setInt8(byte, value)
    return this
  }

  setUnsignedByte (byte, value) {
    const view = this._view
    view.setUint8(byte, value)
    return this
  }

  setShort (byte, value) {
    const view = this._view
    view.setInt16(byte, value, true)
    return this
  }

  setUnsignedShort (byte, value) {
    const view = this._view
    view.setUint16(byte, value, true)
    return this
  }

  setInt (byte, value) {
    const view = this._view
    view.setInt32(byte, value, true)
    return this
  }

  setUnsignedInt (byte, value) {
    const view = this._view
    view.setUint32(byte, value, true)
    return this
  }

  set2FloatVector (byte, x, y) {
    const view = this._view
    view.setFloat32(byte, x, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, y, true)
    return this
  }

  set3FloatVector (byte, x, y, z) {
    const view = this._view
    view.setFloat32(byte, x, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, y, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, z, true)
    return this
  }

  set4FloatVector (byte, r, g, b, a) {
    const view = this._view
    view.setFloat32(byte, r, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, a, true)
    return this
  }

  set2DoubleVector (byte, x, y) {
    const view = this._view
    view.setFloat64(byte, x, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, y, true)
    return this
  }

  set3DoubleVector (byte, x, y, z) {
    const view = this._view
    view.setFloat64(byte, x, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, y, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, z, true)
    return this
  }

  set4DoubleVector (byte, r, g, b, a) {
    const view = this._view
    view.setFloat64(byte, r, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, a, true)
    return this
  }

  set2ByteVector (byte, x, y) {
    const view = this._view
    view.setInt8(byte, x)
    view.setInt8(byte + Int8Array.BYTES_PER_ELEMENT, y)
    return this
  }

  set3ByteVector (byte, x, y, z) {
    const view = this._view
    view.setInt8(byte, x)
    view.setInt8(byte + Int8Array.BYTES_PER_ELEMENT, y)
    view.setInt8(byte + 2 * Int8Array.BYTES_PER_ELEMENT, z)
    return this
  }

  set4ByteVector (byte, r, g, b, a) {
    const view = this._view
    view.setInt8(byte, r)
    view.setInt8(byte + Int8Array.BYTES_PER_ELEMENT, g)
    view.setInt8(byte + 2 * Int8Array.BYTES_PER_ELEMENT, b)
    view.setInt8(byte + 3 * Int8Array.BYTES_PER_ELEMENT, a)
    return this
  }

  set2UnsignedByteVector (byte, x, y) {
    const view = this._view
    view.setUint8(byte, x)
    view.setUint8(byte + Uint8Array.BYTES_PER_ELEMENT, y)
    return this
  }

  set3UnsignedByteVector (byte, x, y, z) {
    const view = this._view
    view.setUint8(byte, x)
    view.setUint8(byte + Uint8Array.BYTES_PER_ELEMENT, y)
    view.setUint8(byte + 2 * Uint8Array.BYTES_PER_ELEMENT, z)
    return this
  }

  set4UnsignedByteVector (byte, r, g, b, a) {
    const view = this._view
    view.setUint8(byte, r)
    view.setUint8(byte + Uint8Array.BYTES_PER_ELEMENT, g)
    view.setUint8(byte + 2 * Uint8Array.BYTES_PER_ELEMENT, b)
    view.setUint8(byte + 3 * Uint8Array.BYTES_PER_ELEMENT, a)
    return this
  }

  set2ShortVector (byte, x, y) {
    const view = this._view
    view.setInt16(byte, x, true)
    view.setInt16(byte + Int16Array.BYTES_PER_ELEMENT, y, true)
    return this
  }

  set3ShortVector (byte, x, y, z) {
    const view = this._view
    view.setInt16(byte, x, true)
    view.setInt16(byte + Int16Array.BYTES_PER_ELEMENT, y, true)
    view.setInt16(byte + 2 * Int16Array.BYTES_PER_ELEMENT, z, true)
    return this
  }

  set4ShortVector (byte, r, g, b, a) {
    const view = this._view
    view.setInt16(byte, r, true)
    view.setInt16(byte + Int16Array.BYTES_PER_ELEMENT, g, true)
    view.setInt16(byte + 2 * Int16Array.BYTES_PER_ELEMENT, b, true)
    view.setInt16(byte + 3 * Int16Array.BYTES_PER_ELEMENT, a, true)
    return this
  }

  set2UnsignedShortVector (byte, x, y) {
    const view = this._view
    view.setUint16(byte, x, true)
    view.setUint16(byte + Uint16Array.BYTES_PER_ELEMENT, y, true)
    return this
  }

  set3UnsignedShortVector (byte, x, y, z) {
    const view = this._view
    view.setUint16(byte, x, true)
    view.setUint16(byte + Uint16Array.BYTES_PER_ELEMENT, y, true)
    view.setUint16(byte + 2 * Uint16Array.BYTES_PER_ELEMENT, z, true)
    return this
  }

  set4UnsignedShortVector (byte, r, g, b, a) {
    const view = this._view
    view.setUint16(byte, r, true)
    view.setUint16(byte + Uint16Array.BYTES_PER_ELEMENT, g, true)
    view.setUint16(byte + 2 * Uint16Array.BYTES_PER_ELEMENT, b, true)
    view.setUint16(byte + 3 * Uint16Array.BYTES_PER_ELEMENT, a, true)
    return this
  }

  set2IntVector (byte, x, y) {
    const view = this._view
    view.setInt32(byte, x, true)
    view.setInt32(byte + Int32Array.BYTES_PER_ELEMENT, y, true)
    return this
  }

  set3IntVector (byte, x, y, z) {
    const view = this._view
    view.setInt32(byte, x, true)
    view.setInt32(byte + Int32Array.BYTES_PER_ELEMENT, y, true)
    view.setInt32(byte + 2 * Int32Array.BYTES_PER_ELEMENT, z, true)
    return this
  }

  set4IntVector (byte, r, g, b, a) {
    const view = this._view
    view.setInt32(byte, r, true)
    view.setInt32(byte + Int32Array.BYTES_PER_ELEMENT, g, true)
    view.setInt32(byte + 2 * Int32Array.BYTES_PER_ELEMENT, b, true)
    view.setInt32(byte + 3 * Int32Array.BYTES_PER_ELEMENT, a, true)
    return this
  }

  set2UnsignedIntVector (byte, x, y) {
    const view = this._view
    view.setUint32(byte, x, true)
    view.setUint32(byte + Uint32Array.BYTES_PER_ELEMENT, y, true)
    return this
  }

  set3UnsignedIntVector (byte, x, y, z) {
    const view = this._view
    view.setUint32(byte, x, true)
    view.setUint32(byte + Uint32Array.BYTES_PER_ELEMENT, y, true)
    view.setUint32(byte + 2 * Uint32Array.BYTES_PER_ELEMENT, z, true)
    return this
  }

  set4UnsignedIntVector (byte, r, g, b, a) {
    const view = this._view
    view.setUint32(byte, r, true)
    view.setUint32(byte + Uint32Array.BYTES_PER_ELEMENT, g, true)
    view.setUint32(byte + 2 * Uint32Array.BYTES_PER_ELEMENT, b, true)
    view.setUint32(byte + 3 * Uint32Array.BYTES_PER_ELEMENT, a, true)
    return this
  }

  set2x2FloatMatrix (
    byte,
    a, b,
    c, d
  ) {
    const view = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, d, true)
    return this
  }

  set2x3FloatMatrix (
    byte,
    a, b,
    c, d,
    e, f
  ) {
    const view = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 4 * Float32Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat32(byte + 5 * Float32Array.BYTES_PER_ELEMENT, f, true)
    return this
  }

  set2x4FloatMatrix (
    byte,
    a, b,
    c, d,
    e, f,
    g, h
  ) {
    const view = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat32(byte + 4 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 5 * Float32Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat32(byte + 6 * Float32Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat32(byte + 7 * Float32Array.BYTES_PER_ELEMENT, h, true)
    return this
  }

  set3x2FloatMatrix (
    byte,
    a, b, c,
    d, e, f
  ) {
    const view = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat32(byte + 4 * Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 5 * Float32Array.BYTES_PER_ELEMENT, f, true)
    return this
  }

  set3x3FloatMatrix (
    byte,
    a, b, c,
    d, e, f,
    g, h, i
  ) {
    const view = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 4 * Float32Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat32(byte + 5 * Float32Array.BYTES_PER_ELEMENT, h, true)
    view.setFloat32(byte + 6 * Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 7 * Float32Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat32(byte + 8 * Float32Array.BYTES_PER_ELEMENT, i, true)
    return this
  }

  set3x4FloatMatrix (
    byte,
    a, b, c,
    d, e, f,
    g, h, i,
    j, k, l
  ) {
    const view = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, j, true)

    view.setFloat32(byte + 4 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 5 * Float32Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat32(byte + 6 * Float32Array.BYTES_PER_ELEMENT, h, true)
    view.setFloat32(byte + 7 * Float32Array.BYTES_PER_ELEMENT, k, true)

    view.setFloat32(byte + 8 * Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 9 * Float32Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat32(byte + 10 * Float32Array.BYTES_PER_ELEMENT, i, true)
    view.setFloat32(byte + 11 * Float32Array.BYTES_PER_ELEMENT, l, true)

    return this
  }

  set4x2FloatMatrix (
    byte,
    a, b, c, d,
    e, f, g, h
  ) {
    const view = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat32(byte + 4 * Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 5 * Float32Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat32(byte + 6 * Float32Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat32(byte + 7 * Float32Array.BYTES_PER_ELEMENT, h, true)
    return this
  }

  set4x3FloatMatrix (
    byte,
    a, b, c, d,
    e, f, g, h,
    i, j, k, l
  ) {
    const view = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, i, true)

    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 4 * Float32Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat32(byte + 5 * Float32Array.BYTES_PER_ELEMENT, j, true)

    view.setFloat32(byte + 6 * Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 7 * Float32Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat32(byte + 8 * Float32Array.BYTES_PER_ELEMENT, k, true)

    view.setFloat32(byte + 9 * Float32Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat32(byte + 10 * Float32Array.BYTES_PER_ELEMENT, h, true)
    view.setFloat32(byte + 11 * Float32Array.BYTES_PER_ELEMENT, l, true)

    return this
  }

  set4x4FloatMatrix (
    byte,
    a, b, c, d,
    e, f, g, h,
    i, j, k, l,
    m, n, o, p
  ) {
    const view = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, i, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, m, true)

    view.setFloat32(byte + 4 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 5 * Float32Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat32(byte + 6 * Float32Array.BYTES_PER_ELEMENT, j, true)
    view.setFloat32(byte + 7 * Float32Array.BYTES_PER_ELEMENT, n, true)

    view.setFloat32(byte + 8 * Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 9 * Float32Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat32(byte + 10 * Float32Array.BYTES_PER_ELEMENT, k, true)
    view.setFloat32(byte + 11 * Float32Array.BYTES_PER_ELEMENT, o, true)

    view.setFloat32(byte + 12 * Float32Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat32(byte + 13 * Float32Array.BYTES_PER_ELEMENT, h, true)
    view.setFloat32(byte + 14 * Float32Array.BYTES_PER_ELEMENT, l, true)
    view.setFloat32(byte + 15 * Float32Array.BYTES_PER_ELEMENT, p, true)

    return this
  }

  set2x2DoubleMatrix (
    byte,
    a, b,
    c, d
  ) {
    const view = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, d, true)
    return this
  }

  set2x3DoubleMatrix (
    byte,
    a, b,
    c, d,
    e, f
  ) {
    const view = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 4 * Float64Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat64(byte + 5 * Float64Array.BYTES_PER_ELEMENT, f, true)
    return this
  }

  set2x4DoubleMatrix (
    byte,
    a, b,
    c, d,
    e, f,
    g, h
  ) {
    const view = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat64(byte + 4 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 5 * Float64Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat64(byte + 6 * Float64Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat64(byte + 7 * Float64Array.BYTES_PER_ELEMENT, h, true)
    return this
  }

  set3x2DoubleMatrix (
    byte,
    a, b, c,
    d, e, f
  ) {
    const view = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat64(byte + 4 * Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 5 * Float64Array.BYTES_PER_ELEMENT, f, true)
    return this
  }

  set3x3DoubleMatrix (
    byte,
    a, b, c,
    d, e, f,
    g, h, i
  ) {
    const view = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 4 * Float64Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat64(byte + 5 * Float64Array.BYTES_PER_ELEMENT, h, true)
    view.setFloat64(byte + 6 * Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 7 * Float64Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat64(byte + 8 * Float64Array.BYTES_PER_ELEMENT, i, true)
    return this
  }

  set3x4DoubleMatrix (
    byte,
    a, b, c,
    d, e, f,
    g, h, i,
    j, k, l
  ) {
    const view = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, j, true)

    view.setFloat64(byte + 4 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 5 * Float64Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat64(byte + 6 * Float64Array.BYTES_PER_ELEMENT, h, true)
    view.setFloat64(byte + 7 * Float64Array.BYTES_PER_ELEMENT, k, true)

    view.setFloat64(byte + 8 * Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 9 * Float64Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat64(byte + 10 * Float64Array.BYTES_PER_ELEMENT, i, true)
    view.setFloat64(byte + 11 * Float64Array.BYTES_PER_ELEMENT, l, true)

    return this
  }

  set4x2DoubleMatrix (
    byte,
    a, b, c, d,
    e, f, g, h
  ) {
    const view = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat64(byte + 4 * Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 5 * Float64Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat64(byte + 6 * Float64Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat64(byte + 7 * Float64Array.BYTES_PER_ELEMENT, h, true)
    return this
  }

  set4x3DoubleMatrix (
    byte,
    a, b, c, d,
    e, f, g, h,
    i, j, k, l
  ) {
    const view = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, i, true)

    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 4 * Float64Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat64(byte + 5 * Float64Array.BYTES_PER_ELEMENT, j, true)

    view.setFloat64(byte + 6 * Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 7 * Float64Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat64(byte + 8 * Float64Array.BYTES_PER_ELEMENT, k, true)

    view.setFloat64(byte + 9 * Float64Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat64(byte + 10 * Float64Array.BYTES_PER_ELEMENT, h, true)
    view.setFloat64(byte + 11 * Float64Array.BYTES_PER_ELEMENT, l, true)

    return this
  }

  set4x4DoubleMatrix (
    byte,
    a, b, c, d,
    e, f, g, h,
    i, j, k, l,
    m, n, o, p
  ) {
    const view = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, i, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, m, true)

    view.setFloat64(byte + 4 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 5 * Float64Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat64(byte + 6 * Float64Array.BYTES_PER_ELEMENT, j, true)
    view.setFloat64(byte + 7 * Float64Array.BYTES_PER_ELEMENT, n, true)

    view.setFloat64(byte + 8 * Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 9 * Float64Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat64(byte + 10 * Float64Array.BYTES_PER_ELEMENT, k, true)
    view.setFloat64(byte + 11 * Float64Array.BYTES_PER_ELEMENT, o, true)

    view.setFloat64(byte + 12 * Float64Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat64(byte + 13 * Float64Array.BYTES_PER_ELEMENT, h, true)
    view.setFloat64(byte + 14 * Float64Array.BYTES_PER_ELEMENT, l, true)
    view.setFloat64(byte + 15 * Float64Array.BYTES_PER_ELEMENT, p, true)

    return this
  }

  push (value) {
    const byte = this._size
    this.size += 1
    return this.set(byte, value)
  }

  pushFloat (value) {
    const byte = this._size
    this.size += Float32Array.BYTES_PER_ELEMENT
    return this.setFloat(byte, value)
  }

  pushDouble (value) {
    const byte = this._size
    this.size += Float64Array.BYTES_PER_ELEMENT
    return this.setDouble(byte, value)
  }

  pushByte (value) {
    const byte = this._size
    this.size += Int8Array.BYTES_PER_ELEMENT
    return this.setByte(byte, value)
  }

  pushUnsignedByte (value) {
    const byte = this._size
    this.size += Uint8Array.BYTES_PER_ELEMENT
    return this.setUnsignedByte(byte, value)
  }

  pushShort (value) {
    const byte = this._size
    this.size += Int16Array.BYTES_PER_ELEMENT
    return this.setShort(byte, value)
  }

  pushUnsignedShort (value) {
    const byte = this._size
    this.size += Uint16Array.BYTES_PER_ELEMENT
    return this.setUnsignedShort(byte, value)
  }

  pushInt (value) {
    const byte = this._size
    this.size += Int32Array.BYTES_PER_ELEMENT
    return this.setInt(byte, value)
  }

  pushUnsignedInt (value) {
    const byte = this._size
    this.size += Uint32Array.BYTES_PER_ELEMENT
    return this.setUnsignedInt(byte, value)
  }

  push2FloatVector (x, y) {
    const byte = this._size
    this.size += 2 * Float32Array.BYTES_PER_ELEMENT
    return this.set2FloatVector(byte, x, y)
  }

  push3FloatVector (x, y, z) {
    const byte = this._size
    this.size += 3 * Float32Array.BYTES_PER_ELEMENT
    return this.set3FloatVector(byte, x, y, z)
  }

  push4FloatVector (r, g, b, a) {
    const byte = this._size
    this.size += 4 * Float32Array.BYTES_PER_ELEMENT
    return this.set4FloatVector(byte, r, g, b, a)
  }

  push2DoubleVector (x, y) {
    const byte = this._size
    this.size += 2 * Float64Array.BYTES_PER_ELEMENT
    return this.set2DoubleVector(byte, x, y)
  }

  push3DoubleVector (x, y, z) {
    const byte = this._size
    this.size += 3 * Float64Array.BYTES_PER_ELEMENT
    return this.set3DoubleVector(byte, x, y, z)
  }

  push4DoubleVector (r, g, b, a) {
    const byte = this._size
    this.size += 4 * Float64Array.BYTES_PER_ELEMENT
    return this.set4DoubleVector(byte, r, g, b, a)
  }

  push2ByteVector (x, y) {
    const byte = this._size
    this.size += 2 * Int8Array.BYTES_PER_ELEMENT
    return this.set2ByteVector(byte, x, y)
  }

  push3ByteVector (x, y, z) {
    const byte = this._size
    this.size += 3 * Int8Array.BYTES_PER_ELEMENT
    return this.set3ByteVector(byte, x, y, z)
  }

  push4ByteVector (r, g, b, a) {
    const byte = this._size
    this.size += 4 * Int8Array.BYTES_PER_ELEMENT
    return this.set4ByteVector(byte, r, g, b, a)
  }

  push2UnsignedByteVector (x, y) {
    const byte = this._size
    this.size += 2 * Uint8Array.BYTES_PER_ELEMENT
    return this.set2UnsignedByteVector(byte, x, y)
  }

  push3UnsignedByteVector (x, y, z) {
    const byte = this._size
    this.size += 3 * Uint8Array.BYTES_PER_ELEMENT
    return this.set3UnsignedByteVector(byte, x, y, z)
  }

  push4UnsignedByteVector (r, g, b, a) {
    const byte = this._size
    this.size += 4 * Uint8Array.BYTES_PER_ELEMENT
    return this.set4UnsignedByteVector(byte, r, g, b, a)
  }

  push2ShortVector (x, y) {
    const byte = this._size
    this.size += 2 * Int16Array.BYTES_PER_ELEMENT
    return this.set2ShortVector(byte, x, y)
  }

  push3ShortVector (x, y, z) {
    const byte = this._size
    this.size += 3 * Int16Array.BYTES_PER_ELEMENT
    return this.set3ShortVector(byte, x, y, z)
  }

  push4ShortVector (r, g, b, a) {
    const byte = this._size
    this.size += 4 * Int16Array.BYTES_PER_ELEMENT
    return this.set4ShortVector(byte, r, g, b, a)
  }

  push2UnsignedShortVector (x, y) {
    const byte = this._size
    this.size += 2 * Uint16Array.BYTES_PER_ELEMENT
    return this.set2UnsignedShortVector(byte, x, y)
  }

  push3UnsignedShortVector (x, y, z) {
    const byte = this._size
    this.size += 3 * Uint16Array.BYTES_PER_ELEMENT
    return this.set3UnsignedShortVector(byte, x, y, z)
  }

  push4UnsignedShortVector (r, g, b, a) {
    const byte = this._size
    this.size += 4 * Uint16Array.BYTES_PER_ELEMENT
    return this.set4UnsignedShortVector(byte, r, g, b, a)
  }

  push2IntVector (x, y) {
    const byte = this._size
    this.size += 2 * Int32Array.BYTES_PER_ELEMENT
    return this.set2IntVector(byte, x, y)
  }

  push3IntVector (x, y, z) {
    const byte = this._size
    this.size += 3 * Int32Array.BYTES_PER_ELEMENT
    return this.set3IntVector(byte, x, y, z)
  }

  push4IntVector (r, g, b, a) {
    const byte = this._size
    this.size += 4 * Int32Array.BYTES_PER_ELEMENT
    return this.set4IntVector(byte, r, g, b, a)
  }

  push2UnsignedIntVector (x, y) {
    const byte = this._size
    this.size += 2 * Uint32Array.BYTES_PER_ELEMENT
    return this.set2UnsignedIntVector(byte, x, y)
  }

  push3UnsignedIntVector (x, y, z) {
    const byte = this._size
    this.size += 3 * Uint32Array.BYTES_PER_ELEMENT
    return this.set3UnsignedIntVector(byte, x, y, z)
  }

  push4UnsignedIntVector (r, g, b, a) {
    const byte = this._size
    this.size += 4 * Uint32Array.BYTES_PER_ELEMENT
    return this.set4UnsignedIntVector(byte, r, g, b, a)
  }

  push2x2FloatMatrix (
    a, b,
    c, d
  ) {
    const byte = this._size
    this.size += 4 * Float32Array.BYTES_PER_ELEMENT
    return this.set2x2FloatMatrix(byte, a, b, c, d)
  }

  push2x3FloatMatrix (
    a, b,
    c, d,
    e, f
  ) {
    const byte = this._size
    this.size += 6 * Float32Array.BYTES_PER_ELEMENT
    return this.set2x3FloatMatrix(byte, a, b, c, d, e, f)
  }

  push2x4FloatMatrix (
    a, b,
    c, d,
    e, f,
    g, h
  ) {
    const byte = this._size
    this.size += 8 * Float32Array.BYTES_PER_ELEMENT
    return this.set2x4FloatMatrix(byte, a, b, c, d, e, f, g, h)
  }

  push3x2FloatMatrix (
    a, b, c,
    d, e, f
  ) {
    const byte = this._size
    this.size += 6 * Float32Array.BYTES_PER_ELEMENT
    return this.set3x2FloatMatrix(byte, a, b, c, d, e, f)
  }

  push3x3FloatMatrix (
    a, b, c,
    d, e, f,
    g, h, i
  ) {
    const byte = this._size
    this.size += 9 * Float32Array.BYTES_PER_ELEMENT
    return this.set3x3FloatMatrix(byte, a, b, c, d, e, f, g, h, i)
  }

  push3x4FloatMatrix (
    a, b, c,
    d, e, f,
    g, h, i,
    j, k, l
  ) {
    const byte = this._size
    this.size += 12 * Float32Array.BYTES_PER_ELEMENT
    return this.set3x4FloatMatrix(byte, a, b, c, d, e, f, g, h, i, j, k, l)
  }

  push4x2FloatMatrix (
    a, b, c, d,
    e, f, g, h
  ) {
    const byte = this._size
    this.size += 8 * Float32Array.BYTES_PER_ELEMENT
    return this.set4x2FloatMatrix(byte, a, b, c, d, e, f, g, h)
  }

  push4x3FloatMatrix (
    a, b, c, d,
    e, f, g, h,
    i, j, k, l
  ) {
    const byte = this._size
    this.size += 12 * Float32Array.BYTES_PER_ELEMENT
    return this.set4x3FloatMatrix(byte, a, b, c, d, e, f, g, h, i, j, k, l)
  }

  push4x4FloatMatrix (
    a, b, c, d,
    e, f, g, h,
    i, j, k, l,
    m, n, o, p
  ) {
    const byte = this._size
    this.size += 16 * Float32Array.BYTES_PER_ELEMENT
    return this.set4x4FloatMatrix(
      byte, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p
    )
  }

  push2x2DoubleMatrix (
    a, b,
    c, d
  ) {
    const byte = this._size
    this.size += 4 * Float64Array.BYTES_PER_ELEMENT
    return this.set2x2DoubleMatrix(byte, a, b, c, d)
  }

  push2x3DoubleMatrix (
    a, b,
    c, d,
    e, f
  ) {
    const byte = this._size
    this.size += 6 * Float64Array.BYTES_PER_ELEMENT
    return this.set2x3DoubleMatrix(byte, a, b, c, d, e, f)
  }

  push2x4DoubleMatrix (
    a, b,
    c, d,
    e, f,
    g, h
  ) {
    const byte = this._size
    this.size += 8 * Float64Array.BYTES_PER_ELEMENT
    return this.set2x4DoubleMatrix(byte, a, b, c, d, e, f, g, h)
  }

  push3x2DoubleMatrix (
    a, b, c,
    d, e, f
  ) {
    const byte = this._size
    this.size += 6 * Float64Array.BYTES_PER_ELEMENT
    return this.set3x2DoubleMatrix(byte, a, b, c, d, e, f)
  }

  push3x3DoubleMatrix (
    a, b, c,
    d, e, f,
    g, h, i
  ) {
    const byte = this._size
    this.size += 9 * Float64Array.BYTES_PER_ELEMENT
    return this.set3x3DoubleMatrix(byte, a, b, c, d, e, f, g, h, i)
  }

  push3x4DoubleMatrix (
    a, b, c,
    d, e, f,
    g, h, i,
    j, k, l
  ) {
    const byte = this._size
    this.size += 12 * Float64Array.BYTES_PER_ELEMENT
    return this.set3x4DoubleMatrix(byte, a, b, c, d, e, f, g, h, i, j, k, l)
  }

  push4x2DoubleMatrix (
    a, b, c, d,
    e, f, g, h
  ) {
    const byte = this._size
    this.size += 8 * Float64Array.BYTES_PER_ELEMENT
    return this.set4x2DoubleMatrix(byte, a, b, c, d, e, f, g, h)
  }

  push4x3DoubleMatrix (
    a, b, c, d,
    e, f, g, h,
    i, j, k, l
  ) {
    const byte = this._size
    this.size += 12 * Float64Array.BYTES_PER_ELEMENT
    return this.set4x3DoubleMatrix(byte, a, b, c, d, e, f, g, h, i, j, k, l)
  }

  push4x4DoubleMatrix (
    a, b, c, d,
    e, f, g, h,
    i, j, k, l,
    m, n, o, p
  ) {
    const byte = this._size
    this.size += 16 * Float64Array.BYTES_PER_ELEMENT
    return this.set4x4DoubleMatrix(
      byte, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p
    )
  }

  deleteFloat (byte) {
    return this.delete(byte, Float32Array.BYTES_PER_ELEMENT)
  }

  deleteDouble (byte) {
    return this.delete(byte, Float64Array.BYTES_PER_ELEMENT)
  }

  deleteByte (byte) {
    return this.delete(byte, Int8Array.BYTES_PER_ELEMENT)
  }

  deleteUnsignedByte (byte) {
    return this.delete(byte, Uint8Array.BYTES_PER_ELEMENT)
  }

  deleteShort (byte) {
    return this.delete(byte, Int16Array.BYTES_PER_ELEMENT)
  }

  deleteUnsignedShort (byte) {
    return this.delete(byte, Uint16Array.BYTES_PER_ELEMENT)
  }

  deleteInt (byte) {
    return this.delete(byte, Int32Array.BYTES_PER_ELEMENT)
  }

  deleteUnsignedInt (byte) {
    return this.delete(byte, Uint32Array.BYTES_PER_ELEMENT)
  }

  delete2FloatVector (byte) {
    return this.delete(byte, 2 * Float32Array.BYTES_PER_ELEMENT)
  }

  delete3FloatVector (byte) {
    return this.delete(byte, 3 * Float32Array.BYTES_PER_ELEMENT)
  }

  delete4FloatVector (byte) {
    return this.delete(byte, 4 * Float32Array.BYTES_PER_ELEMENT)
  }

  delete2DoubleVector (byte) {
    return this.delete(byte, 2 * Float64Array.BYTES_PER_ELEMENT)
  }

  delete3DoubleVector (byte) {
    return this.delete(byte, 3 * Float64Array.BYTES_PER_ELEMENT)
  }

  delete4DoubleVector (byte) {
    return this.delete(byte, 4 * Float64Array.BYTES_PER_ELEMENT)
  }

  delete2ByteVector (byte) {
    return this.delete(byte, 2 * Int8Array.BYTES_PER_ELEMENT)
  }

  delete3ByteVector (byte) {
    return this.delete(byte, 3 * Int8Array.BYTES_PER_ELEMENT)
  }

  delete4ByteVector (byte) {
    return this.delete(byte, 4 * Int8Array.BYTES_PER_ELEMENT)
  }

  delete2UnsignedByteVector (byte) {
    return this.delete(byte, 2 * Uint8Array.BYTES_PER_ELEMENT)
  }

  delete3UnsignedByteVector (byte) {
    return this.delete(byte, 3 * Uint8Array.BYTES_PER_ELEMENT)
  }

  delete4UnsignedByteVector (byte) {
    return this.delete(byte, 4 * Uint8Array.BYTES_PER_ELEMENT)
  }

  delete2ShortVector (byte) {
    return this.delete(byte, 2 * Int16Array.BYTES_PER_ELEMENT)
  }

  delete3ShortVector (byte) {
    return this.delete(byte, 3 * Int16Array.BYTES_PER_ELEMENT)
  }

  delete4ShortVector (byte) {
    return this.delete(byte, 4 * Int16Array.BYTES_PER_ELEMENT)
  }

  delete2UnsignedShortVector (byte) {
    return this.delete(byte, 2 * Uint16Array.BYTES_PER_ELEMENT)
  }

  delete3UnsignedShortVector (byte) {
    return this.delete(byte, 3 * Uint16Array.BYTES_PER_ELEMENT)
  }

  delete4UnsignedShortVector (byte) {
    return this.delete(byte, 4 * Uint16Array.BYTES_PER_ELEMENT)
  }

  delete2IntVector (byte) {
    return this.delete(byte, 2 * Int32Array.BYTES_PER_ELEMENT)
  }

  delete3IntVector (byte) {
    return this.delete(byte, 3 * Int32Array.BYTES_PER_ELEMENT)
  }

  delete4IntVector (byte) {
    return this.delete(byte, 4 * Int32Array.BYTES_PER_ELEMENT)
  }

  delete2UnsignedIntVector (byte) {
    return this.delete(byte, 2 * Uint32Array.BYTES_PER_ELEMENT)
  }

  delete3UnsignedIntVector (byte) {
    return this.delete(byte, 3 * Uint32Array.BYTES_PER_ELEMENT)
  }

  delete4UnsignedIntVector (byte) {
    return this.delete(byte, 4 * Uint32Array.BYTES_PER_ELEMENT)
  }

  delete2x2FloatMatrix (byte) {
    return this.delete(byte, 4 * Float32Array.BYTES_PER_ELEMENT)
  }

  delete2x3FloatMatrix (byte) {
    return this.delete(byte, 6 * Float32Array.BYTES_PER_ELEMENT)
  }

  delete2x4FloatMatrix (byte) {
    return this.delete(byte, 8 * Float32Array.BYTES_PER_ELEMENT)
  }

  delete3x2FloatMatrix (byte) {
    return this.delete(byte, 6 * Float32Array.BYTES_PER_ELEMENT)
  }

  delete3x3FloatMatrix (byte) {
    return this.delete(byte, 9 * Float32Array.BYTES_PER_ELEMENT)
  }

  delete3x4FloatMatrix (byte) {
    return this.delete(byte, 12 * Float32Array.BYTES_PER_ELEMENT)
  }

  delete4x2FloatMatrix (byte) {
    return this.delete(byte, 8 * Float32Array.BYTES_PER_ELEMENT)
  }

  delete4x3FloatMatrix (byte) {
    return this.delete(byte, 12 * Float32Array.BYTES_PER_ELEMENT)
  }

  delete4x4FloatMatrix (byte) {
    return this.delete(byte, 16 * Float32Array.BYTES_PER_ELEMENT)
  }

  delete2x2DoubleMatrix (byte) {
    return this.delete(byte, 4 * Float64Array.BYTES_PER_ELEMENT)
  }

  delete2x3DoubleMatrix (byte) {
    return this.delete(byte, 6 * Float64Array.BYTES_PER_ELEMENT)
  }

  delete2x4DoubleMatrix (byte) {
    return this.delete(byte, 8 * Float64Array.BYTES_PER_ELEMENT)
  }

  delete3x2DoubleMatrix (byte) {
    return this.delete(byte, 6 * Float64Array.BYTES_PER_ELEMENT)
  }

  delete3x3DoubleMatrix (byte) {
    return this.delete(byte, 9 * Float64Array.BYTES_PER_ELEMENT)
  }

  delete3x4DoubleMatrix (byte) {
    return this.delete(byte, 12 * Float64Array.BYTES_PER_ELEMENT)
  }

  delete4x2DoubleMatrix (byte) {
    return this.delete(byte, 8 * Float64Array.BYTES_PER_ELEMENT)
  }

  delete4x3DoubleMatrix (byte) {
    return this.delete(byte, 12 * Float64Array.BYTES_PER_ELEMENT)
  }

  delete4x4DoubleMatrix (byte) {
    return this.delete(byte, 16 * Float64Array.BYTES_PER_ELEMENT)
  }

  /**
  * Copy a bunch of bytes from another buffer.
  *
  * @param {VertesBuffer} source - Buffer instance to copy.
  * @param {number} [sourceOffset = 0] - Offset to use when we read the buffer to copy.
  * @param {number} [destinationOffset = 0] - Offset to use when we write into this buffer.
  * @param {number} [size = source.size] - Number of bytes to copy.
  *
  * @return {VertexBuffer} The current instance for chaining purpose.
  */
  copy (source, sourceOffset = 0, destinationOffset = 0, size = source.size) {
    if (destinationOffset + size > this._size) this.size = destinationOffset + size

    this._buffer.set(
      source.buffer.slice(sourceOffset, size),
      destinationOffset
    )

    return this
  }

  /**
  * Append the content of other buffers at the end of this one.
  * @param {...VertexBuffer} others - Buffers to concat.
  *
  * @return {VertexBuffer} The current instance for chaining purpose.
  */
  concat (...others) {
    const nextCapacity = this._size + others.reduce((a, b) => a + b.size, 0)
    if (nextCapacity > this.capacity) this.capacity = nextCapacity

    for (const other of others) {
      this._buffer.set(
        other.buffer.slice(0, other.size),
        this._size
      )

      this._size += other.size
    }

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
  * @return {VertexBuffer} The current buffer instance for chaining purpose.
  */
  copyWithin (target, start = 0, end = this._size) {
    let ftarget = target >> 0
    let fstart = start >> 0
    let fend = end >> 0

    const size = this._size
    fstart = (fstart < 0) ? Math.max(fstart + size, 0) : Math.min(fstart, size)
    fend = (fend < 0) ? Math.max(fend + size, 0) : Math.min(fend, size)
    ftarget = (ftarget < 0) ? Math.max(ftarget + size, 0) : Math.min(ftarget, size)

    this._buffer.copyWithin(ftarget, fstart, fend)

    return this
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/fill
  */
  fill (value, start = 0, end = this._size) {
    this._buffer.fill(value, start, end)
    return this
  }

  /**
  * Delete one or multiple values from this buffer.
  *
  * @param {number} index - Index of the value to delete.
  * @param {number} [count = 1] - Count of value to delete.
  *
  * @return {VertexBuffer} The current buffer for chaining purpose.
  */
  delete (index, count = 1) {
    this._buffer.copyWithin(index, (index + count), this._buffer.length)
    this.size -= count
    return this
  }

  /**
  * Check if this buffer is similar to another (have same size, and equal content).
  *
  * @param {VertexBuffer} other - Other buffer to compare.
  *
  * @return {boolean} True if both buffer are similar.
  */
  equals (other) {
    if (other === this) return true
    if (other == null) return false

    if (other instanceof VertexBuffer && other.size === this.size) {
      const thisBuffer = this._buffer
      const otherBuffer = other._buffer

      for (let i = 0; i < this._size; ++i) {
        if (otherBuffer[i] !== thisBuffer[i]) {
          return false
        }
      }

      return true
    }

    return false
  }

  /**
  * Clone the current vertex buffer and return the result.
  *
  * @return {VertexBuffer} A clone of the current vertex buffer.
  */
  clone () {
    return VertexBuffer.clone(this)
  }

  /**
  * Clear this buffer.
  *
  * @return {VertexBuffer} The current buffer for chaining purpose.
  */
  clear () {
    this.size = 0
    return this
  }

  /**
  * @see Descriptor#contextualise
  */
  contextualise (context) {
    return new GLVertexBuffer(context, this)
  }
}
