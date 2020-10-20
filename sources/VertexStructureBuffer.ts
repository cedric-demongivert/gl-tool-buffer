import { VertexStructure } from './VertexStructure'
import { VertexBuffer } from './VertexBuffer'

import { endianess } from './endianess'
import { GroupedVertexStructureBuffer } from './GroupedVertexStructureBuffer'
import { InterleavedVertexStructureBuffer } from './InterleavedVertexStructureBuffer'

/**
* A vertex buffer based on a given vertex structure.
*/
export interface VertexStructureBuffer {
  /**
  * Support of additional methods related to this buffer's format.
  */
  [key : string] : any

  /**
  * Underlying vertex buffer.
  */
  readonly buffer : VertexBuffer

  /**
  * Format of each vertex stored into the underlying buffer.
  */
  readonly format : VertexStructure

  /**
  * Return the current capacity of the buffer.
  *
  * @return The current capacity of the buffer.
  */
  capacity : number

  /**
  * Return the number of elements in the buffer.
  *
  * @return The number of elements in the buffer.
  */
  size : number

  /**
  * Concat other buffers into this one.
  *
  * @param {...VertexStructureBuffer} others - Buffers to concat.
  *
  * @return {VertexStructureBuffer} The current instance for chaining purpose.
  */
  concat (...others : VertexStructureBuffer[]) : void

  /**
  * Copy some content within this buffer. It will not change the current buffer size.
  *
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/copyWithin
  *
  * @param target
  * @param start
  * @param end
  */
  copyWithin (target : number, start : number, end : number) : void

  get (vertex : number, identifier : string) : number

  get (vertex : number, identifier : string, index : number) : number

  get (vertex : number, identifier : string, x : number, y : number) : number

  get (vertex : number, identifier : number) : number

  get (vertex : number, identifier : number, index : number) : number

  get (vertex : number, identifier : number, x : number, y : number) : number

  set (vertex : number, identifier : string, value : number) : void

  set (vertex : number, identifier : string, x : number, y : number) : void

  set (vertex : number, identifier : string, x : number, y : number, z : number) : void

  set (vertex : number, identifier : string, x : number, y : number, z : number, w : number) : void

  set (
    vertex : number, identifier : string,
    a : number, b : number,
    c : number, d : number
  ) : void

  set (
    vertex : number, identifier : string,
    a : number, b : number, c : number,
    d : number, e : number, f : number,
    g : number, h : number, i : number
  ) : void

  set (
    vertex : number, identifier : string,
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number,
    i : number, j : number, k : number, l : number,
    m : number, n : number, o : number, p : number
  ) : void

  set (vertex : number, identifier : number, value : number) : void

  set (vertex : number, identifier : number, x : number, y : number) : void

  set (vertex : number, identifier : number, x : number, y : number, z : number) : void

  set (vertex : number, identifier : number, x : number, y : number, z : number, w : number) : void

  set (
    vertex : number, identifier : number,
    a : number, b : number,
    c : number, d : number
  ) : void

  set (
    vertex : number, identifier : number,
    a : number, b : number, c : number,
    d : number, e : number, f : number,
    g : number, h : number, i : number
  ) : void

  set (
    vertex : number, identifier : number,
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number,
    i : number, j : number, k : number, l : number,
    m : number, n : number, o : number, p : number
  ) : void

  /**
  * Delete one or multiple values from this buffer.
  *
  * @param index - Index of the value to delete.
  * @param [count = 1] - Count of value to delete.
  */
  delete (index : number, count : number) : void

  /**
  * Push another empty vertex structure into this buffer.
  */
  push () : void

  /**
  * @see Object.equals
  */
  equals (other : any) : boolean

  /**
  * Clone the current vertex buffer and return the result.
  *
  * @return A clone of the current vertex buffer.
  */
  clone () : VertexStructureBuffer

  /**
  * Clear this buffer.
  */
  clear () : void
}

export namespace VertexStructureBuffer {
  export function equals (left : VertexStructureBuffer | null | undefined, right : VertexStructureBuffer | null | undefined) : boolean {
    return left == null ? left === right : left.equals(right)
  }

  export function grouped (format : VertexStructure, capacity : number = 16, littleEndian : boolean = endianess.IS_LITTLE_ENDIAN) : VertexStructureBuffer {
    return new GroupedVertexStructureBuffer(format, capacity, littleEndian)
  }

  export function interleaved (format : VertexStructure, capacity : number = 16, littleEndian : boolean = endianess.IS_LITTLE_ENDIAN) : VertexStructureBuffer {
    return new InterleavedVertexStructureBuffer(format, capacity, littleEndian)
  }
}
