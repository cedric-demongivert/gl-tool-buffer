import { BufferIdentifier } from '../BufferIdentifier'
import { BufferType } from '../BufferType'

export class Buffer {
  /**
  * Application identifier of this buffer.
  */
  public identifier : BufferIdentifier

  /**
  * Type of this buffer.
  */
  public type : BufferType

  /**
  * The raw binary data that this buffer contain.
  */
  public data : ArrayBuffer

  /**
  * Instantiate a new buffer.
  *
  * @param [data = new ArrayBuffer(1024)] - The underlying array buffer.
  * @param [type = BufferType.DEFAULT] - The type of buffer to instantiate.
  * @param [identifier = BufferIdentifier.UNDEFINED] - Identifier of the buffer to instantiate.
  */
  public constructor (data : ArrayBuffer = new ArrayBuffer(1024), type : BufferType = BufferType.DEFAULT, identifier : BufferIdentifier = BufferIdentifier.UNDEFINED) {
    this.identifier = identifier
    this.data = data
    this.type = type
  }

  /**
  * Copy the state of the given buffer component.
  *
  * @param toCopy - A buffer component instance to copy.
  */
  public copy (toCopy : Buffer) : void {
    this.identifier = toCopy.identifier
    this.data = toCopy.data.slice(0)
  }

  /**
  * Reset the state of this buffer.
  */
  public clear () : void {
    const data : ArrayBuffer = this.data

    this.identifier = BufferIdentifier.UNDEFINED

    for (let index = 0, size = data.byteLength; index < size; ++index) {
      data[index] = 0
    }
  }

  /**
  * @return An instance of buffer equals to this one.
  */
  public clone () : Buffer {
    return new Buffer(this.data.slice(0), this.identifier)
  }

  /**
  * @see Object.equals
  */
  public equals (other : any) : boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Buffer) {
      if (other.identifier !== this.identifier) {
        return false
      }

      const data : ArrayBuffer = this.data
      const otherData : ArrayBuffer = other.data

      if (data.byteLength !== otherData.byteLength) {
        return false
      }

      for (let index = 0, size = data.byteLength; index < size; ++index) {
        if (data[index] !== otherData[index]) {
          return false
        }
      }

      return false
    }

    return false
  }
}

export namespace Buffer {
  export function copy (toCopy : undefined) : undefined
  export function copy (toCopy : null) : null
  export function copy (toCopy : Buffer) : Buffer
  export function copy (toCopy : Buffer | undefined | null) : Buffer | undefined | null {
    return toCopy == null ? toCopy : toCopy.clone()
  }
}
