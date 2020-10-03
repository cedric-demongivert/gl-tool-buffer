/**
* A generic vertex buffer.
*/
export class VertexBuffer {
  private _buffer : Uint8Array
  private _view   : DataView
  private _size   : number

  /**
  * Wrap the given buffer as a vertex buffer.
  *
  * @param buffer - Buffer to wrap.
  * @param [size] - The current number of elements in bytes.
  */
  public constructor (buffer : ArrayBuffer, size : number = 0) {
    this._buffer = new Uint8Array(buffer)
    this._view   = new DataView(buffer)
    this._size   = size
  }

  /**
  * @return The wrapped buffer.
  */
  public get buffer () : Uint8Array {
    return this._buffer
  }

  /**
  * Return the current capacity of the buffer in bytes.
  *
  * @return The current capacity of the buffer in bytes.
  */
  public get capacity () : number {
    return this._buffer.byteLength
  }

  /**
  * @param capacity - The new capacity of the buffer in bytes.
  */
  public set capacity (capacity : number) {
    if (capacity < 0) {
      throw new Error('A VertexBuffer capacity can\'t be negative.')
    }

    if (capacity > this._buffer.byteLength) {
      const old : ArrayBuffer = this._buffer
      const next : ArrayBuffer = new ArrayBuffer(capacity)

      for (let index = 0, size = old.byteLength; index < size; ++index) {
        next[index] = old[index]
      }

      this._buffer = new Uint8Array(next)
      this._view = new DataView(next)
    } else if (capacity < this._buffer.byteLength) {
      const next : ArrayBuffer = this._buffer.slice(0, capacity)
      this._buffer = new Uint8Array(next)
      if (this._size > capacity) this._size = capacity
      this._view = new DataView(next)
    }
  }

  /**
  * @return The size of the buffer in bytes.
  */
  public get size () : number {
    return this._size
  }

  /**
  * Change the current size of the buffer.
  *
  * @param newSize - The new size of the buffer.
  */
  public set size (newSize : number) {
    if (newSize < 0) {
      throw new Error('A VertexBuffer size can\'t be negative.')
    }

    if (newSize > this._size) {
      if (newSize > this._buffer.byteLength) {
        const old : ArrayBuffer = this._buffer
        const next : ArrayBuffer = new ArrayBuffer(newSize)

        for (let index = 0, size = old.byteLength; index < size; ++index) {
          next[index] = old[index]
        }

        this._buffer = new Uint8Array(next)
        this._view = new DataView(next)
      }

      const buffer : ArrayBuffer = this._buffer

      for (let index = this._size; index < newSize; ++index) {
        buffer[index] = 0
      }
    }

    this._size = newSize
  }

  public get (byte : number) : number {
    return this._buffer[byte]
  }

  public getFloat (byte : number) : number {
    return this._view.getFloat32(byte, true)
  }

  public getDouble (byte : number) : number {
    return this._view.getFloat64(byte, true)
  }

  public getByte (byte : number) : number {
    return this._view.getInt8(byte)
  }

  public getUnsignedByte (byte : number) : number {
    return this._view.getUint8(byte)
  }

  public getShort (byte : number) : number {
    return this._view.getInt16(byte, true)
  }

  public getUnsignedShort (byte : number) : number {
    return this._view.getUint16(byte, true)
  }

  public getInt (byte : number) : number {
    return this._view.getInt32(byte, true)
  }

  public getUnsignedInt (byte : number) : number {
    return this._view.getUint32(byte, true)
  }

  public getFloatVector (byte : number, index : number) : number {
    return this._view.getFloat32(byte + index * Float32Array.BYTES_PER_ELEMENT, true)
  }

  public getDoubleVector (byte : number, index : number) : number {
    return this._view.getFloat64(byte + index * Float64Array.BYTES_PER_ELEMENT, true)
  }

  public getByteVector (byte : number, index : number) : number {
    return this._view.getInt8(byte + index * Int8Array.BYTES_PER_ELEMENT)
  }

  public getUnsignedByteVector (byte : number, index : number) : number {
    return this._view.getUint8(byte + index * Uint8Array.BYTES_PER_ELEMENT)
  }

  public getShortVector (byte : number, index : number) : number {
    return this._view.getInt16(byte + index * Int16Array.BYTES_PER_ELEMENT, true)
  }

  public getUnsignedShortVector (byte : number, index : number) : number {
    return this._view.getUint16(byte + index * Uint16Array.BYTES_PER_ELEMENT, true)
  }

  public getIntVector (byte : number, index : number) : number {
    return this._view.getInt32(byte + index * Int32Array.BYTES_PER_ELEMENT, true)
  }

  public getUnsignedIntVector (byte : number, index : number) : number {
    return this._view.getUint32(byte + index * Uint32Array.BYTES_PER_ELEMENT, true)
  }

  public get2x2FloatMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat32(
      byte + (x * 2 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  public get2x3FloatMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat32(
      byte + (x * 3 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  public get2x4FloatMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat32(
      byte + (x * 4 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  public get3x2FloatMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat32(
      byte + (x * 2 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  public get3x3FloatMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat32(
      byte + (x * 3 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  public get3x4FloatMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat32(
      byte + (x * 4 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  public get4x2FloatMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat32(
      byte + (x * 2 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  public get4x3FloatMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat32(
      byte + (x * 3 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  public get4x4FloatMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat32(
      byte + (x * 4 + y) * Float32Array.BYTES_PER_ELEMENT, true
    )
  }

  public get2x2DoubleMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat64(
      byte + (x * 2 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  public get2x3DoubleMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat64(
      byte + (x * 3 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  public get2x4DoubleMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat64(
      byte + (x * 4 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  public get3x2DoubleMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat64(
      byte + (x * 2 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  public get3x3DoubleMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat64(
      byte + (x * 3 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  public get3x4DoubleMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat64(
      byte + (x * 4 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  public get4x2DoubleMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat64(
      byte + (x * 2 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  public get4x3DoubleMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat64(
      byte + (x * 3 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  public get4x4DoubleMatrix (byte : number, x : number, y : number) : number {
    return this._view.getFloat64(
      byte + (x * 4 + y) * Float64Array.BYTES_PER_ELEMENT, true
    )
  }

  public set (byte : number, value : number) : void {
    this._buffer[byte] = value
  }

  public setFloat (byte : number, value : number) : void {
    this._view.setFloat32(byte, value, true)
  }

  public setDouble (byte : number, value : number) : void {
    this._view.setFloat64(byte, value, true)
  }

  public setByte (byte : number, value : number) : void {
    this._view.setInt8(byte, value)
  }

  public setUnsignedByte (byte : number, value : number) : void {
    this._view.setUint8(byte, value)
  }

  public setShort (byte : number, value : number) : void {
    this._view.setInt16(byte, value, true)
  }

  public setUnsignedShort (byte : number, value : number) : void {
    this._view.setUint16(byte, value, true)
  }

  public setInt (byte : number, value : number) : void {
    this._view.setInt32(byte, value, true)
  }

  public setUnsignedInt (byte : number, value : number) : void {
    this._view.setUint32(byte, value, true)
  }

  public set2FloatVector (byte : number, x : number, y : number) : void {
    const view : DataView = this._view
    view.setFloat32(byte, x, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, y, true)
  }

  public set3FloatVector (byte : number, x : number, y : number, z : number) : void {
    const view : DataView = this._view
    view.setFloat32(byte, x, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, y, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, z, true)
  }

  public set4FloatVector (byte : number, r : number, g : number, b : number, a : number) : void {
    const view : DataView = this._view
    view.setFloat32(byte, r, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, a, true)
  }

  public set2DoubleVector (byte : number, x : number, y : number) : void {
    const view : DataView = this._view
    view.setFloat64(byte, x, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, y, true)
  }

  public set3DoubleVector (byte : number, x : number, y : number, z : number) : void {
    const view : DataView = this._view
    view.setFloat64(byte, x, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, y, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, z, true)
  }

  public set4DoubleVector (byte : number, r : number, g : number, b : number, a : number) : void {
    const view : DataView = this._view
    view.setFloat64(byte, r, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, a, true)
  }

  public set2ByteVector (byte : number, x : number, y : number) : void {
    const view : DataView = this._view
    view.setInt8(byte, x)
    view.setInt8(byte + Int8Array.BYTES_PER_ELEMENT, y)
  }

  public set3ByteVector (byte : number, x : number, y : number, z : number) : void {
    const view : DataView = this._view
    view.setInt8(byte, x)
    view.setInt8(byte + Int8Array.BYTES_PER_ELEMENT, y)
    view.setInt8(byte + 2 * Int8Array.BYTES_PER_ELEMENT, z)
  }

  public set4ByteVector (byte : number, r : number, g : number, b : number, a : number) : void {
    const view : DataView = this._view
    view.setInt8(byte, r)
    view.setInt8(byte + Int8Array.BYTES_PER_ELEMENT, g)
    view.setInt8(byte + 2 * Int8Array.BYTES_PER_ELEMENT, b)
    view.setInt8(byte + 3 * Int8Array.BYTES_PER_ELEMENT, a)
  }

  public set2UnsignedByteVector (byte : number, x : number, y : number) : void {
    const view : DataView = this._view
    view.setUint8(byte, x)
    view.setUint8(byte + Uint8Array.BYTES_PER_ELEMENT, y)
  }

  public set3UnsignedByteVector (byte : number, x : number, y : number, z : number) : void {
    const view : DataView = this._view
    view.setUint8(byte, x)
    view.setUint8(byte + Uint8Array.BYTES_PER_ELEMENT, y)
    view.setUint8(byte + 2 * Uint8Array.BYTES_PER_ELEMENT, z)
  }

  public set4UnsignedByteVector (byte : number, r : number, g : number, b : number, a : number) : void {
    const view : DataView = this._view
    view.setUint8(byte, r)
    view.setUint8(byte + Uint8Array.BYTES_PER_ELEMENT, g)
    view.setUint8(byte + 2 * Uint8Array.BYTES_PER_ELEMENT, b)
    view.setUint8(byte + 3 * Uint8Array.BYTES_PER_ELEMENT, a)
  }

  public set2ShortVector (byte : number, x : number, y : number) : void {
    const view : DataView = this._view
    view.setInt16(byte, x, true)
    view.setInt16(byte + Int16Array.BYTES_PER_ELEMENT, y, true)
  }

  public set3ShortVector (byte : number, x : number, y : number, z : number) : void {
    const view : DataView = this._view
    view.setInt16(byte, x, true)
    view.setInt16(byte + Int16Array.BYTES_PER_ELEMENT, y, true)
    view.setInt16(byte + 2 * Int16Array.BYTES_PER_ELEMENT, z, true)
  }

  public set4ShortVector (byte : number, r : number, g : number, b : number, a : number) : void {
    const view : DataView = this._view
    view.setInt16(byte, r, true)
    view.setInt16(byte + Int16Array.BYTES_PER_ELEMENT, g, true)
    view.setInt16(byte + 2 * Int16Array.BYTES_PER_ELEMENT, b, true)
    view.setInt16(byte + 3 * Int16Array.BYTES_PER_ELEMENT, a, true)
  }

  public set2UnsignedShortVector (byte : number, x : number, y : number) : void {
    const view : DataView = this._view
    view.setUint16(byte, x, true)
    view.setUint16(byte + Uint16Array.BYTES_PER_ELEMENT, y, true)
  }

  public set3UnsignedShortVector (byte : number, x : number, y : number, z : number) : void {
    const view : DataView = this._view
    view.setUint16(byte, x, true)
    view.setUint16(byte + Uint16Array.BYTES_PER_ELEMENT, y, true)
    view.setUint16(byte + 2 * Uint16Array.BYTES_PER_ELEMENT, z, true)
  }

  public set4UnsignedShortVector (byte : number, r : number, g : number, b : number, a : number) : void {
    const view : DataView = this._view
    view.setUint16(byte, r, true)
    view.setUint16(byte + Uint16Array.BYTES_PER_ELEMENT, g, true)
    view.setUint16(byte + 2 * Uint16Array.BYTES_PER_ELEMENT, b, true)
    view.setUint16(byte + 3 * Uint16Array.BYTES_PER_ELEMENT, a, true)
  }

  public set2IntVector (byte : number, x : number, y : number) : void {
    const view : DataView = this._view
    view.setInt32(byte, x, true)
    view.setInt32(byte + Int32Array.BYTES_PER_ELEMENT, y, true)
  }

  public set3IntVector (byte : number, x : number, y : number, z : number) : void {
    const view : DataView = this._view
    view.setInt32(byte, x, true)
    view.setInt32(byte + Int32Array.BYTES_PER_ELEMENT, y, true)
    view.setInt32(byte + 2 * Int32Array.BYTES_PER_ELEMENT, z, true)
  }

  public set4IntVector (byte : number, r : number, g : number, b : number, a : number) : void {
    const view : DataView = this._view
    view.setInt32(byte, r, true)
    view.setInt32(byte + Int32Array.BYTES_PER_ELEMENT, g, true)
    view.setInt32(byte + 2 * Int32Array.BYTES_PER_ELEMENT, b, true)
    view.setInt32(byte + 3 * Int32Array.BYTES_PER_ELEMENT, a, true)
  }

  public set2UnsignedIntVector (byte : number, x : number, y : number) : void {
    const view : DataView = this._view
    view.setUint32(byte, x, true)
    view.setUint32(byte + Uint32Array.BYTES_PER_ELEMENT, y, true)
  }

  public set3UnsignedIntVector (byte : number, x : number, y : number, z : number) : void {
    const view : DataView = this._view
    view.setUint32(byte, x, true)
    view.setUint32(byte + Uint32Array.BYTES_PER_ELEMENT, y, true)
    view.setUint32(byte + 2 * Uint32Array.BYTES_PER_ELEMENT, z, true)
  }

  public set4UnsignedIntVector (byte : number, r : number, g : number, b : number, a : number) : void {
    const view : DataView = this._view
    view.setUint32(byte, r, true)
    view.setUint32(byte + Uint32Array.BYTES_PER_ELEMENT, g, true)
    view.setUint32(byte + 2 * Uint32Array.BYTES_PER_ELEMENT, b, true)
    view.setUint32(byte + 3 * Uint32Array.BYTES_PER_ELEMENT, a, true)
  }

  public set2x2FloatMatrix (
    byte : number,
    a : number, b : number,
    c : number, d : number
  ) : void {
    const view : DataView = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, d, true)
  }

  public set2x3FloatMatrix (
    byte : number,
    a : number, b : number,
    c : number, d : number,
    e : number, f : number
  ) : void {
    const view : DataView = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 4 * Float32Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat32(byte + 5 * Float32Array.BYTES_PER_ELEMENT, f, true)
  }

  public set2x4FloatMatrix (
    byte : number,
    a : number, b : number,
    c : number, d : number,
    e : number, f : number,
    g : number, h : number
  ) : void {
    const view : DataView = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat32(byte + 4 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 5 * Float32Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat32(byte + 6 * Float32Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat32(byte + 7 * Float32Array.BYTES_PER_ELEMENT, h, true)
  }

  public set3x2FloatMatrix (
    byte : number,
    a : number, b : number, c : number,
    d : number, e : number, f : number
  ) : void {
    const view : DataView = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat32(byte + 4 * Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 5 * Float32Array.BYTES_PER_ELEMENT, f, true)
  }

  public set3x3FloatMatrix (
    byte : number,
    a : number, b : number, c : number,
    d : number, e : number, f : number,
    g : number, h : number, i : number
  ) : void {
    const view : DataView = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 4 * Float32Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat32(byte + 5 * Float32Array.BYTES_PER_ELEMENT, h, true)
    view.setFloat32(byte + 6 * Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 7 * Float32Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat32(byte + 8 * Float32Array.BYTES_PER_ELEMENT, i, true)
  }

  public set3x4FloatMatrix (
    byte : number,
    a : number, b : number, c : number,
    d : number, e : number, f : number,
    g : number, h : number, i : number,
    j : number, k : number, l : number
  ) : void {
    const view : DataView = this._view
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
  }

  public set4x2FloatMatrix (
    byte : number,
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number
  ) : void {
    const view : DataView = this._view
    view.setFloat32(byte, a, true)
    view.setFloat32(byte + Float32Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat32(byte + 2 * Float32Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat32(byte + 3 * Float32Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat32(byte + 4 * Float32Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat32(byte + 5 * Float32Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat32(byte + 6 * Float32Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat32(byte + 7 * Float32Array.BYTES_PER_ELEMENT, h, true)
  }

  public set4x3FloatMatrix (
    byte : number,
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number,
    i : number, j : number, k : number, l : number
  ) : void {
    const view : DataView = this._view
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
  }

  public set4x4FloatMatrix (
    byte : number,
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number,
    i : number, j : number, k : number, l : number,
    m : number, n : number, o : number, p : number
  ) : void {
    const view : DataView = this._view
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
  }

  public set2x2DoubleMatrix (
    byte : number,
    a : number, b : number,
    c : number, d : number
  ) : void {
    const view : DataView = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, d, true)
  }

  public set2x3DoubleMatrix (
    byte : number,
    a : number, b : number,
    c : number, d : number,
    e : number, f : number
  ) : void {
    const view : DataView = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 4 * Float64Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat64(byte + 5 * Float64Array.BYTES_PER_ELEMENT, f, true)
  }

  public set2x4DoubleMatrix (
    byte : number,
    a : number, b : number,
    c : number, d : number,
    e : number, f : number,
    g : number, h : number
  ) : void {
    const view : DataView = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat64(byte + 4 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 5 * Float64Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat64(byte + 6 * Float64Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat64(byte + 7 * Float64Array.BYTES_PER_ELEMENT, h, true)
  }

  public set3x2DoubleMatrix (
    byte : number,
    a : number, b : number, c : number,
    d : number, e : number, f : number
  ) : void {
    const view : DataView = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat64(byte + 4 * Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 5 * Float64Array.BYTES_PER_ELEMENT, f, true)
  }

  public set3x3DoubleMatrix (
    byte : number,
    a : number, b : number, c : number,
    d : number, e : number, f : number,
    g : number, h : number, i : number
  ) : void {
    const view : DataView = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 4 * Float64Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat64(byte + 5 * Float64Array.BYTES_PER_ELEMENT, h, true)
    view.setFloat64(byte + 6 * Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 7 * Float64Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat64(byte + 8 * Float64Array.BYTES_PER_ELEMENT, i, true)
  }

  public set3x4DoubleMatrix (
    byte : number,
    a : number, b : number, c : number,
    d : number, e : number, f : number,
    g : number, h : number, i : number,
    j : number, k : number, l : number
  ) : void {
    const view : DataView = this._view
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
  }

  public set4x2DoubleMatrix (
    byte : number,
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number
  ) : void {
    const view : DataView = this._view
    view.setFloat64(byte, a, true)
    view.setFloat64(byte + Float64Array.BYTES_PER_ELEMENT, e, true)
    view.setFloat64(byte + 2 * Float64Array.BYTES_PER_ELEMENT, b, true)
    view.setFloat64(byte + 3 * Float64Array.BYTES_PER_ELEMENT, f, true)
    view.setFloat64(byte + 4 * Float64Array.BYTES_PER_ELEMENT, c, true)
    view.setFloat64(byte + 5 * Float64Array.BYTES_PER_ELEMENT, g, true)
    view.setFloat64(byte + 6 * Float64Array.BYTES_PER_ELEMENT, d, true)
    view.setFloat64(byte + 7 * Float64Array.BYTES_PER_ELEMENT, h, true)
  }

  public set4x3DoubleMatrix (
    byte : number,
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number,
    i : number, j : number, k : number, l : number
  ) : void {
    const view : DataView = this._view
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
  }

  public set4x4DoubleMatrix (
    byte : number,
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number,
    i : number, j : number, k : number, l : number,
    m : number, n : number, o : number, p : number
  ) : void {
    const view : DataView = this._view
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
  }

  public push (value : number) : void {
    const byte : number = this._size
    this.size += 1
    this.set(byte, value)
  }

  public pushFloat (value : number) : void {
    const byte : number = this._size
    this.size += Float32Array.BYTES_PER_ELEMENT
    this.setFloat(byte, value)
  }

  public pushDouble (value : number) : void {
    const byte : number = this._size
    this.size += Float64Array.BYTES_PER_ELEMENT
    this.setDouble(byte, value)
  }

  public pushByte (value : number) : void {
    const byte : number = this._size
    this.size += Int8Array.BYTES_PER_ELEMENT
    this.setByte(byte, value)
  }

  public pushUnsignedByte (value : number) : void {
    const byte : number = this._size
    this.size += Uint8Array.BYTES_PER_ELEMENT
    this.setUnsignedByte(byte, value)
  }

  public pushShort (value : number) : void {
    const byte : number = this._size
    this.size += Int16Array.BYTES_PER_ELEMENT
    this.setShort(byte, value)
  }

  public pushUnsignedShort (value : number) : void {
    const byte : number = this._size
    this.size += Uint16Array.BYTES_PER_ELEMENT
    this.setUnsignedShort(byte, value)
  }

  public pushInt (value : number) : void {
    const byte : number = this._size
    this.size += Int32Array.BYTES_PER_ELEMENT
    this.setInt(byte, value)
  }

  public pushUnsignedInt (value : number) : void {
    const byte : number = this._size
    this.size += Uint32Array.BYTES_PER_ELEMENT
    this.setUnsignedInt(byte, value)
  }

  public push2FloatVector (x : number, y : number) : void {
    const byte : number = this._size
    this.size += 2 * Float32Array.BYTES_PER_ELEMENT
    this.set2FloatVector(byte, x, y)
  }

  public push3FloatVector (x : number, y : number, z : number) : void {
    const byte : number = this._size
    this.size += 3 * Float32Array.BYTES_PER_ELEMENT
    this.set3FloatVector(byte, x, y, z)
  }

  public push4FloatVector (r : number, g : number, b : number, a : number) : void {
    const byte : number = this._size
    this.size += 4 * Float32Array.BYTES_PER_ELEMENT
    this.set4FloatVector(byte, r, g, b, a)
  }

  public push2DoubleVector (x : number, y : number) : void {
    const byte : number = this._size
    this.size += 2 * Float64Array.BYTES_PER_ELEMENT
    this.set2DoubleVector(byte, x, y)
  }

  public push3DoubleVector (x : number, y : number, z : number) : void {
    const byte : number = this._size
    this.size += 3 * Float64Array.BYTES_PER_ELEMENT
    this.set3DoubleVector(byte, x, y, z)
  }

  public push4DoubleVector (r : number, g : number, b : number, a : number) : void {
    const byte : number = this._size
    this.size += 4 * Float64Array.BYTES_PER_ELEMENT
     this.set4DoubleVector(byte, r, g, b, a)
  }

  public push2ByteVector (x : number, y : number) : void {
    const byte : number = this._size
    this.size += 2 * Int8Array.BYTES_PER_ELEMENT
    this.set2ByteVector(byte, x, y)
  }

  public push3ByteVector (x : number, y : number, z : number) : void {
    const byte : number = this._size
    this.size += 3 * Int8Array.BYTES_PER_ELEMENT
    this.set3ByteVector(byte, x, y, z)
  }

  public push4ByteVector (r : number, g : number, b : number, a : number) : void {
    const byte : number = this._size
    this.size += 4 * Int8Array.BYTES_PER_ELEMENT
    this.set4ByteVector(byte, r, g, b, a)
  }

  public push2UnsignedByteVector (x : number, y : number) : void {
    const byte : number = this._size
    this.size += 2 * Uint8Array.BYTES_PER_ELEMENT
    this.set2UnsignedByteVector(byte, x, y)
  }

  public push3UnsignedByteVector (x : number, y : number, z : number) : void {
    const byte : number = this._size
    this.size += 3 * Uint8Array.BYTES_PER_ELEMENT
    this.set3UnsignedByteVector(byte, x, y, z)
  }

  public push4UnsignedByteVector (r : number, g : number, b : number, a : number) : void {
    const byte : number = this._size
    this.size += 4 * Uint8Array.BYTES_PER_ELEMENT
    this.set4UnsignedByteVector(byte, r, g, b, a)
  }

  public push2ShortVector (x : number, y : number) : void {
    const byte : number = this._size
    this.size += 2 * Int16Array.BYTES_PER_ELEMENT
    this.set2ShortVector(byte, x, y)
  }

  public push3ShortVector (x : number, y : number, z : number) : void {
    const byte : number = this._size
    this.size += 3 * Int16Array.BYTES_PER_ELEMENT
    this.set3ShortVector(byte, x, y, z)
  }

  public push4ShortVector (r : number, g : number, b : number, a : number) : void {
    const byte : number = this._size
    this.size += 4 * Int16Array.BYTES_PER_ELEMENT
    this.set4ShortVector(byte, r, g, b, a)
  }

  public push2UnsignedShortVector (x : number, y : number) : void {
    const byte : number = this._size
    this.size += 2 * Uint16Array.BYTES_PER_ELEMENT
    this.set2UnsignedShortVector(byte, x, y)
  }

  public push3UnsignedShortVector (x : number, y : number, z : number) : void {
    const byte : number = this._size
    this.size += 3 * Uint16Array.BYTES_PER_ELEMENT
    this.set3UnsignedShortVector(byte, x, y, z)
  }

  public push4UnsignedShortVector (r : number, g : number, b : number, a : number) : void {
    const byte : number = this._size
    this.size += 4 * Uint16Array.BYTES_PER_ELEMENT
    this.set4UnsignedShortVector(byte, r, g, b, a)
  }

  public push2IntVector (x : number, y : number) : void {
    const byte : number = this._size
    this.size += 2 * Int32Array.BYTES_PER_ELEMENT
    this.set2IntVector(byte, x, y)
  }

  public push3IntVector (x : number, y : number, z : number) : void {
    const byte : number = this._size
    this.size += 3 * Int32Array.BYTES_PER_ELEMENT
    this.set3IntVector(byte, x, y, z)
  }

  public push4IntVector (r : number, g : number, b : number, a : number) : void {
    const byte : number = this._size
    this.size += 4 * Int32Array.BYTES_PER_ELEMENT
    this.set4IntVector(byte, r, g, b, a)
  }

  public push2UnsignedIntVector (x : number, y : number) : void {
    const byte : number = this._size
    this.size += 2 * Uint32Array.BYTES_PER_ELEMENT
    this.set2UnsignedIntVector(byte, x, y)
  }

  public push3UnsignedIntVector (x : number, y : number, z : number) : void {
    const byte : number = this._size
    this.size += 3 * Uint32Array.BYTES_PER_ELEMENT
    this.set3UnsignedIntVector(byte, x, y, z)
  }

  public push4UnsignedIntVector (r : number, g : number, b : number, a : number) : void {
    const byte : number = this._size
    this.size += 4 * Uint32Array.BYTES_PER_ELEMENT
    this.set4UnsignedIntVector(byte, r, g, b, a)
  }

  public push2x2FloatMatrix (
    a : number, b : number,
    c : number, d : number
  ) : void {
    const byte : number = this._size
    this.size += 4 * Float32Array.BYTES_PER_ELEMENT
    this.set2x2FloatMatrix(byte, a, b, c, d)
  }

  public push2x3FloatMatrix (
    a : number, b : number,
    c : number, d : number,
    e : number, f : number
  ) : void {
    const byte : number = this._size
    this.size += 6 * Float32Array.BYTES_PER_ELEMENT
    this.set2x3FloatMatrix(byte, a, b, c, d, e, f)
  }

  public push2x4FloatMatrix (
    a : number, b : number,
    c : number, d : number,
    e : number, f : number,
    g : number, h : number
  ) : void {
    const byte : number = this._size
    this.size += 8 * Float32Array.BYTES_PER_ELEMENT
    this.set2x4FloatMatrix(byte, a, b, c, d, e, f, g, h)
  }

  public push3x2FloatMatrix (
    a : number, b : number, c : number,
    d : number, e : number, f : number
  ) : void {
    const byte : number = this._size
    this.size += 6 * Float32Array.BYTES_PER_ELEMENT
    this.set3x2FloatMatrix(byte, a, b, c, d, e, f)
  }

  public push3x3FloatMatrix (
    a : number, b : number, c : number,
    d : number, e : number, f : number,
    g : number, h : number, i : number
  ) : void {
    const byte : number = this._size
    this.size += 9 * Float32Array.BYTES_PER_ELEMENT
    this.set3x3FloatMatrix(byte, a, b, c, d, e, f, g, h, i)
  }

  public push3x4FloatMatrix (
    a : number, b : number, c : number,
    d : number, e : number, f : number,
    g : number, h : number, i : number,
    j : number, k : number, l : number
  ) : void {
    const byte : number = this._size
    this.size += 12 * Float32Array.BYTES_PER_ELEMENT
    this.set3x4FloatMatrix(byte, a, b, c, d, e, f, g, h, i, j, k, l)
  }

  public push4x2FloatMatrix (
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number
  ) : void {
    const byte : number = this._size
    this.size += 8 * Float32Array.BYTES_PER_ELEMENT
    this.set4x2FloatMatrix(byte, a, b, c, d, e, f, g, h)
  }

  public push4x3FloatMatrix (
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number,
    i : number, j : number, k : number, l : number
  ) : void {
    const byte : number = this._size
    this.size += 12 * Float32Array.BYTES_PER_ELEMENT
    this.set4x3FloatMatrix(byte, a, b, c, d, e, f, g, h, i, j, k, l)
  }

  public push4x4FloatMatrix (
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number,
    i : number, j : number, k : number, l : number,
    m : number, n : number, o : number, p : number
  ) : void {
    const byte : number = this._size
    this.size += 16 * Float32Array.BYTES_PER_ELEMENT
    this.set4x4FloatMatrix(
      byte, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p
    )
  }

  public push2x2DoubleMatrix (
    a : number, b : number,
    c : number, d : number
  ) : void {
    const byte : number = this._size
    this.size += 4 * Float64Array.BYTES_PER_ELEMENT
    this.set2x2DoubleMatrix(byte, a, b, c, d)
  }

  public push2x3DoubleMatrix (
    a : number, b : number,
    c : number, d : number,
    e : number, f : number
  ) : void {
    const byte : number = this._size
    this.size += 6 * Float64Array.BYTES_PER_ELEMENT
    this.set2x3DoubleMatrix(byte, a, b, c, d, e, f)
  }

  public push2x4DoubleMatrix (
    a : number, b : number,
    c : number, d : number,
    e : number, f : number,
    g : number, h : number
  ) : void {
    const byte : number = this._size
    this.size += 8 * Float64Array.BYTES_PER_ELEMENT
    this.set2x4DoubleMatrix(byte, a, b, c, d, e, f, g, h)
  }

  public push3x2DoubleMatrix (
    a : number, b : number, c : number,
    d : number, e : number, f : number
  ) : void {
    const byte : number = this._size
    this.size += 6 * Float64Array.BYTES_PER_ELEMENT
    this.set3x2DoubleMatrix(byte, a, b, c, d, e, f)
  }

  public push3x3DoubleMatrix (
    a : number, b : number, c : number,
    d : number, e : number, f : number,
    g : number, h : number, i : number
  ) : void {
    const byte : number = this._size
    this.size += 9 * Float64Array.BYTES_PER_ELEMENT
    this.set3x3DoubleMatrix(byte, a, b, c, d, e, f, g, h, i)
  }

  public push3x4DoubleMatrix (
    a : number, b : number, c : number,
    d : number, e : number, f : number,
    g : number, h : number, i : number,
    j : number, k : number, l : number
  ) : void {
    const byte : number = this._size
    this.size += 12 * Float64Array.BYTES_PER_ELEMENT
    this.set3x4DoubleMatrix(byte, a, b, c, d, e, f, g, h, i, j, k, l)
  }

  public push4x2DoubleMatrix (
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number
  ) : void {
    const byte : number = this._size
    this.size += 8 * Float64Array.BYTES_PER_ELEMENT
    this.set4x2DoubleMatrix(byte, a, b, c, d, e, f, g, h)
  }

  public push4x3DoubleMatrix (
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number,
    i : number, j : number, k : number, l : number
  ) : void {
    const byte : number = this._size
    this.size += 12 * Float64Array.BYTES_PER_ELEMENT
    this.set4x3DoubleMatrix(byte, a, b, c, d, e, f, g, h, i, j, k, l)
  }

  public push4x4DoubleMatrix (
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number,
    i : number, j : number, k : number, l : number,
    m : number, n : number, o : number, p : number
  ) : void {
    const byte : number = this._size
    this.size += 16 * Float64Array.BYTES_PER_ELEMENT
    this.set4x4DoubleMatrix(
      byte, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p
    )
  }

  public deleteFloat (byte : number) : void {
    this.delete(byte, Float32Array.BYTES_PER_ELEMENT)
  }

  public deleteDouble (byte : number) : void {
    this.delete(byte, Float64Array.BYTES_PER_ELEMENT)
  }

  public deleteByte (byte : number) : void {
    this.delete(byte, Int8Array.BYTES_PER_ELEMENT)
  }

  public deleteUnsignedByte (byte : number) : void {
    this.delete(byte, Uint8Array.BYTES_PER_ELEMENT)
  }

  public deleteShort (byte : number) : void {
    this.delete(byte, Int16Array.BYTES_PER_ELEMENT)
  }

  public deleteUnsignedShort (byte : number) : void {
    this.delete(byte, Uint16Array.BYTES_PER_ELEMENT)
  }

  public deleteInt (byte : number) : void {
    this.delete(byte, Int32Array.BYTES_PER_ELEMENT)
  }

  public deleteUnsignedInt (byte : number) : void {
    this.delete(byte, Uint32Array.BYTES_PER_ELEMENT)
  }

  public delete2FloatVector (byte : number) : void {
    this.delete(byte, 2 * Float32Array.BYTES_PER_ELEMENT)
  }

  public delete3FloatVector (byte : number) : void {
    this.delete(byte, 3 * Float32Array.BYTES_PER_ELEMENT)
  }

  public delete4FloatVector (byte : number) : void {
    this.delete(byte, 4 * Float32Array.BYTES_PER_ELEMENT)
  }

  public delete2DoubleVector (byte : number) : void {
    this.delete(byte, 2 * Float64Array.BYTES_PER_ELEMENT)
  }

  public delete3DoubleVector (byte : number) : void {
    this.delete(byte, 3 * Float64Array.BYTES_PER_ELEMENT)
  }

  public delete4DoubleVector (byte : number) : void {
    this.delete(byte, 4 * Float64Array.BYTES_PER_ELEMENT)
  }

  public delete2ByteVector (byte : number) : void {
    this.delete(byte, 2 * Int8Array.BYTES_PER_ELEMENT)
  }

  public delete3ByteVector (byte : number) : void {
    this.delete(byte, 3 * Int8Array.BYTES_PER_ELEMENT)
  }

  public delete4ByteVector (byte : number) : void {
    this.delete(byte, 4 * Int8Array.BYTES_PER_ELEMENT)
  }

  public delete2UnsignedByteVector (byte : number) : void {
    this.delete(byte, 2 * Uint8Array.BYTES_PER_ELEMENT)
  }

  public delete3UnsignedByteVector (byte : number) : void {
    this.delete(byte, 3 * Uint8Array.BYTES_PER_ELEMENT)
  }

  public delete4UnsignedByteVector (byte : number) : void {
    this.delete(byte, 4 * Uint8Array.BYTES_PER_ELEMENT)
  }

  public delete2ShortVector (byte : number) : void {
    this.delete(byte, 2 * Int16Array.BYTES_PER_ELEMENT)
  }

  public delete3ShortVector (byte : number) : void {
    this.delete(byte, 3 * Int16Array.BYTES_PER_ELEMENT)
  }

  public delete4ShortVector (byte : number) : void {
    this.delete(byte, 4 * Int16Array.BYTES_PER_ELEMENT)
  }

  public delete2UnsignedShortVector (byte : number) : void {
    this.delete(byte, 2 * Uint16Array.BYTES_PER_ELEMENT)
  }

  public delete3UnsignedShortVector (byte : number) : void {
    this.delete(byte, 3 * Uint16Array.BYTES_PER_ELEMENT)
  }

  public delete4UnsignedShortVector (byte : number) : void {
    this.delete(byte, 4 * Uint16Array.BYTES_PER_ELEMENT)
  }

  public delete2IntVector (byte : number) : void {
    this.delete(byte, 2 * Int32Array.BYTES_PER_ELEMENT)
  }

  public delete3IntVector (byte : number) : void {
    this.delete(byte, 3 * Int32Array.BYTES_PER_ELEMENT)
  }

  public delete4IntVector (byte : number) : void {
    this.delete(byte, 4 * Int32Array.BYTES_PER_ELEMENT)
  }

  public delete2UnsignedIntVector (byte : number) : void {
    this.delete(byte, 2 * Uint32Array.BYTES_PER_ELEMENT)
  }

  public delete3UnsignedIntVector (byte : number) : void {
    this.delete(byte, 3 * Uint32Array.BYTES_PER_ELEMENT)
  }

  public delete4UnsignedIntVector (byte : number) : void {
    this.delete(byte, 4 * Uint32Array.BYTES_PER_ELEMENT)
  }

  public delete2x2FloatMatrix (byte : number) : void {
    this.delete(byte, 4 * Float32Array.BYTES_PER_ELEMENT)
  }

  public delete2x3FloatMatrix (byte : number) : void {
    this.delete(byte, 6 * Float32Array.BYTES_PER_ELEMENT)
  }

  public delete2x4FloatMatrix (byte : number) : void {
    this.delete(byte, 8 * Float32Array.BYTES_PER_ELEMENT)
  }

  public delete3x2FloatMatrix (byte : number) : void {
    this.delete(byte, 6 * Float32Array.BYTES_PER_ELEMENT)
  }

  public delete3x3FloatMatrix (byte : number) : void {
    this.delete(byte, 9 * Float32Array.BYTES_PER_ELEMENT)
  }

  public delete3x4FloatMatrix (byte : number) : void {
    this.delete(byte, 12 * Float32Array.BYTES_PER_ELEMENT)
  }

  public delete4x2FloatMatrix (byte : number) : void {
    this.delete(byte, 8 * Float32Array.BYTES_PER_ELEMENT)
  }

  public delete4x3FloatMatrix (byte : number) : void {
    this.delete(byte, 12 * Float32Array.BYTES_PER_ELEMENT)
  }

  public delete4x4FloatMatrix (byte : number) : void {
    this.delete(byte, 16 * Float32Array.BYTES_PER_ELEMENT)
  }

  public delete2x2DoubleMatrix (byte : number) : void {
    this.delete(byte, 4 * Float64Array.BYTES_PER_ELEMENT)
  }

  public delete2x3DoubleMatrix (byte : number) : void {
    this.delete(byte, 6 * Float64Array.BYTES_PER_ELEMENT)
  }

  public delete2x4DoubleMatrix (byte : number) : void {
    this.delete(byte, 8 * Float64Array.BYTES_PER_ELEMENT)
  }

  public delete3x2DoubleMatrix (byte : number) : void {
    this.delete(byte, 6 * Float64Array.BYTES_PER_ELEMENT)
  }

  public delete3x3DoubleMatrix (byte : number) : void {
    this.delete(byte, 9 * Float64Array.BYTES_PER_ELEMENT)
  }

  public delete3x4DoubleMatrix (byte : number) : void {
    this.delete(byte, 12 * Float64Array.BYTES_PER_ELEMENT)
  }

  public delete4x2DoubleMatrix (byte : number) : void {
    this.delete(byte, 8 * Float64Array.BYTES_PER_ELEMENT)
  }

  public delete4x3DoubleMatrix (byte : number) : void {
    this.delete(byte, 12 * Float64Array.BYTES_PER_ELEMENT)
  }

  public delete4x4DoubleMatrix (byte : number) : void {
    this.delete(byte, 16 * Float64Array.BYTES_PER_ELEMENT)
  }

  /**
  * Copy a bunch of bytes from another buffer.
  *
  * @param source - Buffer instance to copy.
  * @param [sourceOffset = 0] - Offset to use when we read the buffer to copy.
  * @param [destinationOffset = 0] - Offset to use when we write into this buffer.
  * @param [size = source.size] - Number of bytes to copy.
  */
  public copy (source : VertexBuffer, sourceOffset : number = 0, destinationOffset : number = 0, size : number = source.size) : void {
    if (destinationOffset + size > this._size) this.size = destinationOffset + size

    const other : ArrayBuffer = source._buffer
    const buffer : ArrayBuffer = this._buffer

    for (let index = 0; index < size; ++index) {
      buffer[destinationOffset + index] = other[index + sourceOffset]
    }
  }

  /**
  * Append the content of other buffers at the end of this one.

  * @param others - Buffers to concat.
  */
  public concat (...others : VertexBuffer[]) : void {
    const nextCapacity = this._size + others.reduce((a, b) => a + b.size, 0)
    if (nextCapacity > this.capacity) this.capacity = nextCapacity

    const buffer : ArrayBuffer = this._buffer

    for (const other of others) {
      const otherBuffer : ArrayBuffer = other._buffer

      for (let index = 0, size = other._size; index < size; ++index) {
        buffer[this._size + index] = otherBuffer[index]
      }

      this._size += other.size
    }
  }

  /**
  * Copy some content within this buffer. It will not change the current buffer size.
  *
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/copyWithin
  *
  * @param target
  * @param start
  * @param end
  */
  public copyWithin (target : number, start : number = 0, end : number = this._size) : void {
    let ftarget : number = target >> 0
    let fstart  : number = start >> 0
    let fend    : number = end >> 0

    const size  : number = this._size

    fstart = (fstart < 0) ? Math.max(fstart + size, 0) : Math.min(fstart, size)
    fend = (fend < 0) ? Math.max(fend + size, 0) : Math.min(fend, size)
    ftarget = (ftarget < 0) ? Math.max(ftarget + size, 0) : Math.min(ftarget, size)

    const buffer : ArrayBuffer = this._buffer

    for (let index = 0, size = fend - fstart; index < size; ++index) {
      buffer[ftarget + index] = buffer[fstart + index]
    }
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/fill
  */
  public fill (value : number, start : number = 0, end : number = this._size - start) : void {
    const buffer : ArrayBuffer = this._buffer

    for (let index = start; index < end; ++index) {
      buffer[index] = value
    }
  }

  /**
  * Delete one or multiple values from this buffer.
  *
  * @param index - Index of the value to delete.
  * @param [count = 1] - Count of value to delete.
  */
  public delete (index : number, count : number = 1) : void {
    this.copyWithin(index, (index + count), this._buffer.byteLength)
    this.size -= count
  }

  /**
  * Update the underlying configuration in order to wrap the given buffer.
  *
  * @param buffer - The new buffer to wrap.
  * @param [size = 0] - The number of triangles into the buffer to wrap.
  */
  public wrap (buffer : ArrayBuffer, size : number = 0) : void {
    this._buffer = new Uint8Array(buffer)
    this._view = new DataView(buffer)
    this._size = size
  }

  /**
  * Check if this buffer is similar to another (have same size, and equal content).
  *
  * @param other - Other buffer to compare.
  *
  * @return True if both buffer are similar.
  */
  public equals (other : any) : boolean {
    if (other === this) return true
    if (other == null) return false

    if (other instanceof VertexBuffer && other.size === this.size) {
      const thisBuffer  : ArrayBuffer = this._buffer
      const otherBuffer : ArrayBuffer = other._buffer

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
  * @return A clone of the current vertex buffer.
  */
  public clone () : VertexBuffer {
    return new VertexBuffer(this._buffer.slice(0), this._size)
  }

  /**
  * Clear this buffer.
  */
  public clear () : void {
    this.size = 0
  }
}

export namespace VertexBuffer {
  /**
  * Create a new empty vertex buffer with an initial capacity.
  *
  * @param [capacity = 16] - Initial capacity of the created buffer.
  *
  * @return The created buffer.
  */
  export function empty (capacity = 16) {
    return new VertexBuffer(new ArrayBuffer(capacity), 0)
  }

  export function copy (toCopy : undefined) : undefined
  export function copy (toCopy : null) : null
  export function copy (toCopy : VertexBuffer) : VertexBuffer
  export function copy (toCopy : VertexBuffer | undefined | null) : VertexBuffer | undefined | null {
    return toCopy == null ? toCopy : toCopy.clone()
  }
}
