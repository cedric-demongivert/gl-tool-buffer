/**
 * A buffer that contain information related to polygon faces.
 */
export class GLTFaceBuffer {
  /**
  * Number of faces stored into this buffer.
  */
  private _size: number

  /**
  * Underlying buffer.
  */
  private _buffer: Uint16Array

  /**
  * Wrap the given uint16 array as an array of faces.
  *
  * @param buffer - Buffer to use as a face buffer.
  * @param [size = 0] - Initial number of faces into the given buffer.
  */
  public constructor(buffer: Uint16Array, size: number = 0) {
    this._buffer = buffer
    this._size = size
  }

  /**
  * @return The buffer behind this face buffer.
  */
  public get buffer(): Uint16Array {
    return this._buffer
  }

  /**
  * Return the current capacity of the buffer.
  *
  * @return The current capacity of the buffer.
  */
  public get capacity(): number {
    return this._buffer.length / 3
  }

  /**
  * @param capacity - The new capacity of the buffer.
  */
  public set capacity(capacity: number) {
    if (capacity < 0) {
      throw new Error('A GLTFaceBuffer capacity can\'t be negative.')
    }

    const byteCapacity: number = capacity * 3

    if (byteCapacity > this._buffer.length) {
      const next: Uint16Array = new Uint16Array(byteCapacity)
      next.set(this._buffer, 0)
      this._buffer = next
    } else if (byteCapacity < this._buffer.length) {
      const next: Uint16Array = new Uint16Array(byteCapacity)
      next.set(this._buffer.subarray(0, byteCapacity), 0)
      this._buffer = next
      if (this._size > capacity) this._size = capacity
    }
  }

  /**
  * Return the number of elements in the buffer.
  *
  * @return The number of elements in the buffer.
  */
  public get size(): number {
    return this._size
  }

  /**
  * Change the current size of the buffer.
  *
  * @param newSize - The new size of the buffer.
  */
  public set size(newSize: number) {
    if (newSize < 0) {
      throw new Error('A GLTFaceBuffer size can\'t be negative.')
    }

    if (newSize > this._size) {
      if (newSize > this._buffer.length / 3) {
        const next: Uint16Array = new Uint16Array(newSize * 3)
        next.set(this._buffer, 0)
        this._buffer = next
      }
      this._buffer.fill(0, this._size * 3, newSize * 3)
    }

    this._size = newSize
  }

  /**
  * Add a face into this buffer.
  *
  * @param f1 - First vertex identifier of the face to add.
  * @param f2 - Second vertex identifier of the face to add.
  * @param f3 - Third vertex identifier of the face to add.
  */
  public push(f1: number, f2: number, f3: number): void {
    const start = this._size * 3
    this.size += 1

    this._buffer[start] = f1
    this._buffer[start + 1] = f2
    this._buffer[start + 2] = f3
  }

  /**
  * Set a face of this buffer.
  *
  * @param index - Index of the face to set.
  * @param f1 - First vertex identifier of the face to set.
  * @param f2 - Second vertex identifier of the face to set.
  * @param f3 - Third vertex identifier of the face to set.
  */
  public set(index: number, f1: number, f2: number, f3: number): void {
    if (index + 1 > this._size) this.size = index + 1

    const offset = index * 3

    this._buffer[offset] = f1
    this._buffer[offset + 1] = f2
    this._buffer[offset + 2] = f3
  }

  /**
  * Concat this buffer with another.
  *
  * @param other - Buffer to concat.
  */
  public concat(other: GLTFaceBuffer): void {
    const nextCapacity: number = this._size + other.size

    if (nextCapacity > this.capacity) this.capacity = nextCapacity

    this._buffer.set(
      other._buffer.slice(0, other.size * 3),
      this._size * 3
    )

    this._size += other.size
  }

  /**
  * Copy the given face buffer.
  *
  * @param toCopy - A face buffer to copy.
  * @param [start = 0] - Number of faces to skip.
  * @param [size = toCopy.size - start] - Number of faces to copy.
  */
  public copy(toCopy: GLTFaceBuffer, start: number = 0, size: number = toCopy.size - start): void {
    const end: number = (start + size) * 3
    const offset: number = start * 3

    for (let index = offset; index < end; ++index) {
      this._buffer[index] = toCopy.buffer[index]
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
  public copyWithin(target: number, start: number = 0, end: number = this._size): void {
    let ftarget: number = target >> 0
    let fstart: number = start >> 0
    let fend: number = end >> 0

    const size: number = this._size
    fstart = (fstart < 0) ? Math.max(fstart + size, 0) : Math.min(fstart, size)
    fend = (fend < 0) ? Math.max(fend + size, 0) : Math.min(fend, size)
    ftarget = (ftarget < 0) ? Math.max(ftarget + size, 0) : Math.min(ftarget, size)

    const entrySize: number = 3
    this._buffer.copyWithin(ftarget * entrySize, fstart * entrySize, fend * entrySize)
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/fill
  */
  public fill(value: number, start = 0, end = this._size): void {
    start >>= 0
    end >>= 0

    const size: number = this._size
    const rstart: number = start < 0 ? Math.max(size + start, 0) : Math.min(start, size)
    const rend: number = end < 0 ? Math.max(size + end, 0) : Math.min(end, size)

    this._buffer.fill(value, rstart * 3, rend * 3)
  }

  /**
  * Check if a face was set at the given index.
  *
  * @param index - Index to check.
  *
  * @return True if a face exists at the given index.
  */
  public has(index: number): boolean {
    return index >= 0 && index < this._size
  }

  /**
  * Return a face of the buffer.
  *
  * @param index - Index of the face to get.
  * @param output - Array to use as an output.
  *
  * @return A face of this buffer.
  */
  public getFace(index: number, output: number[] = []): number[] {
    const buffer: Uint16Array = this._buffer
    const offset: number = index * 3

    output[0] = buffer[offset + 0]
    output[1] = buffer[offset + 1]
    output[2] = buffer[offset + 2]

    return output
  }

  /**
  * Return a vertex of a face of the buffer.
  *
  * @param faceIndex - Index of the face to get.
  * @param vertexIndex - Index of the vertex to get.
  *
  * @return The requested vertex.
  */
  public getVertex(faceIndex: number, vertexIndex: number): number {
    return this._buffer[faceIndex * 3 + vertexIndex]
  }

  /**
  * Delete one or multiple values from this buffer.
  *
  * @param index - Index of the value to delete.
  * @param [count = 1] - Count of value to delete.
  */
  public delete(index: number, count: number = 1): void {
    this._buffer.copyWithin(index * 3, (index + count) * 3, this._buffer.length)
    this.size -= count
  }

  /**
  * Update the underlying configuration in order to wrap the given buffer.
  *
  * @param buffer - The new buffer to wrap.
  * @param [size = 0] - The number of triangles into the buffer to wrap.
  */
  public wrap(buffer: Uint16Array, size: number = 0): void {
    this._buffer = buffer
    this._size = size
  }

  /**
  * Check if this buffer is similar to another (have same size, and same content).
  *
  * @param other - Other buffer to compare.
  *
  * @return True if both buffer are similar.
  */
  public equals(other: any): boolean {
    if (other === this) return true
    if (other == null) return false

    if (other instanceof GLTFaceBuffer && other.size === this._size) {
      const thisBuffer: Uint16Array = this._buffer
      const otherBuffer: Uint16Array = other.buffer
      const size: number = 3 * this._size

      for (let index = 0; index < size; ++index) {
        if (otherBuffer[index] !== thisBuffer[index]) {
          return false
        }
      }

      return true
    }

    return false
  }

  /**
  * Clone the current face buffer and return the result.
  *
  * @return A clone of the current face buffer.
  */
  public clone(): GLTFaceBuffer {
    const buffer: Uint16Array = new Uint16Array(this.buffer.length)
    buffer.set(this.buffer, 0)

    return new GLTFaceBuffer(buffer, this.size)
  }

  /**
  * Clear this buffer.
  */
  public clear(): void {
    this.size = 0
  }
}

/**
 * 
 */
export namespace GLTFaceBuffer {
  /**
   * 
   */
  export function equals(left: GLTFaceBuffer | null | undefined, right: GLTFaceBuffer | null | undefined): boolean {
    return left == null ? left === right : left.equals(right)
  }

  /**
  * Create a new empty face buffer with an initial capacity.
  *
  * @param [capacity = 16] - Initial capacity of the created buffer.
  *
  * @return The created buffer.
  */
  export function empty(capacity: number = 16): GLTFaceBuffer {
    return new GLTFaceBuffer(new Uint16Array(capacity * 3), 0)
  }

  /**
  * Wrap the given array buffer as a uint16 array of faces.
  *
  * @param buffer - The buffer to wrap.
  * @param [from = 0] - The number of bytes to skip into the buffer to wrap.
  * @param [length = buffer.byteLength - from] - The number of bytes to manage.
  *
  * @return The created buffer.
  */
  export function asUint16ArrayOfFaces(
    buffer: ArrayBuffer,
    from: number = 0,
    length: number = buffer.byteLength - from,
  ): Uint16Array {
    const faces: number = (length / (Uint16Array.BYTES_PER_ELEMENT * 3)) << 0

    return new Uint16Array(
      buffer,
      from,
      faces * Uint16Array.BYTES_PER_ELEMENT * 3
    )
  }

  /**
   * 
   */
  export function copy(toCopy: undefined): undefined
  /**
   * 
   */
  export function copy(toCopy: null): null
  /**
   * 
   */
  export function copy(toCopy: GLTFaceBuffer): GLTFaceBuffer
  /**
   * 
   */
  export function copy(toCopy: GLTFaceBuffer | undefined | null): GLTFaceBuffer | undefined | null
  export function copy(toCopy: GLTFaceBuffer | undefined | null): GLTFaceBuffer | undefined | null {
    return toCopy == null ? toCopy : toCopy.clone()
  }
}
