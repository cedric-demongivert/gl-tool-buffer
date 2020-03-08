export type VertexFieldType = GLenum

export namespace VertexFieldType {
  export const BYTE           : VertexFieldType   = 0x1400
  export const SHORT          : VertexFieldType   = 0x1402
  export const INT            : VertexFieldType   = 0x1404
  export const BOOL           : VertexFieldType   = 0x8B56
  export const FLOAT          : VertexFieldType   = 0x1406
  export const UNSIGNED_BYTE  : VertexFieldType   = 0x1401
  export const UNSIGNED_INT   : VertexFieldType   = 0x1405
  export const UNSIGNED_SHORT : VertexFieldType   = 0x1402
  export const INT_VEC2       : VertexFieldType   = 0x8B53
  export const INT_VEC3       : VertexFieldType   = 0x8B54
  export const INT_VEC4       : VertexFieldType   = 0x8B55
  export const BOOL_VEC2      : VertexFieldType   = 0x8B57
  export const BOOL_VEC3      : VertexFieldType   = 0x8B58
  export const BOOL_VEC4      : VertexFieldType   = 0x8B59
  export const FLOAT_VEC2     : VertexFieldType   = 0x8B50
  export const FLOAT_VEC3     : VertexFieldType   = 0x8B51
  export const FLOAT_VEC4     : VertexFieldType   = 0x8B52
  export const FLOAT_MAT2     : VertexFieldType   = 0x8B5A
  export const FLOAT_MAT3     : VertexFieldType   = 0x8B5B
  export const FLOAT_MAT4     : VertexFieldType   = 0x8B5C

  export const ALL           : VertexFieldType[] = [
    BYTE,
    SHORT,
    INT,
    BOOL,
    FLOAT,
    UNSIGNED_BYTE,
    UNSIGNED_INT,
    UNSIGNED_SHORT,
    INT_VEC2,
    INT_VEC3,
    INT_VEC4,
    BOOL_VEC2,
    BOOL_VEC3,
    BOOL_VEC4,
    FLOAT_VEC2,
    FLOAT_VEC3,
    FLOAT_VEC4,
    FLOAT_MAT2,
    FLOAT_MAT3,
    FLOAT_MAT4
  ]

  /**
  * Stringify the given constant.
  *
  * @param value - A constant.
  *
  * @return The label associated with the given constant.
  */
  export function toString (type : VertexFieldType) : string {
    switch (type) {
      case BYTE           : return 'BYTE'
      case SHORT          : return 'SHORT'
      case INT            : return 'INT'
      case BOOL           : return 'BOOL'
      case FLOAT          : return 'FLOAT'
      case UNSIGNED_BYTE  : return 'UNSIGNED_BYTE'
      case UNSIGNED_INT   : return 'UNSIGNED_INT'
      case UNSIGNED_SHORT : return 'UNSIGNED_SHORT'
      case INT_VEC2       : return 'INT_VEC2'
      case INT_VEC3       : return 'INT_VEC3'
      case INT_VEC4       : return 'INT_VEC4'
      case BOOL_VEC2      : return 'BOOL_VEC2'
      case BOOL_VEC3      : return 'BOOL_VEC3'
      case BOOL_VEC4      : return 'BOOL_VEC4'
      case FLOAT_VEC2     : return 'FLOAT_VEC2'
      case FLOAT_VEC3     : return 'FLOAT_VEC3'
      case FLOAT_VEC4     : return 'FLOAT_VEC4'
      case FLOAT_MAT2     : return 'FLOAT_MAT2'
      case FLOAT_MAT3     : return 'FLOAT_MAT3'
      case FLOAT_MAT4     : return 'FLOAT_MAT4'
      default             : return undefined
    }
  }

  /**
  * Return the size of the given type in byte.
  *
  * @param type - A constant.

  * @return The size of an object of the given type in byte.
  */
  export function sizeof (type : VertexFieldType) : number {
    switch (type) {
      case BYTE           : return Int8Array.BYTES_PER_ELEMENT
      case SHORT          : return Int16Array.BYTES_PER_ELEMENT
      case INT            : return Int32Array.BYTES_PER_ELEMENT
      case BOOL           : return Int8Array.BYTES_PER_ELEMENT
      case FLOAT          : return Float32Array.BYTES_PER_ELEMENT
      case UNSIGNED_BYTE  : return Uint8Array.BYTES_PER_ELEMENT
      case UNSIGNED_INT   : return Uint32Array.BYTES_PER_ELEMENT
      case UNSIGNED_SHORT : return Uint16Array.BYTES_PER_ELEMENT
      case INT_VEC2       : return Int32Array.BYTES_PER_ELEMENT * 2
      case INT_VEC3       : return Int32Array.BYTES_PER_ELEMENT * 3
      case INT_VEC4       : return Int32Array.BYTES_PER_ELEMENT * 4
      case BOOL_VEC2      : return Int8Array.BYTES_PER_ELEMENT * 2
      case BOOL_VEC3      : return Int8Array.BYTES_PER_ELEMENT * 3
      case BOOL_VEC4      : return Int8Array.BYTES_PER_ELEMENT * 4
      case FLOAT_VEC2     : return Float32Array.BYTES_PER_ELEMENT * 2
      case FLOAT_VEC3     : return Float32Array.BYTES_PER_ELEMENT * 3
      case FLOAT_VEC4     : return Float32Array.BYTES_PER_ELEMENT * 4
      case FLOAT_MAT2     : return Float32Array.BYTES_PER_ELEMENT * 4
      case FLOAT_MAT3     : return Float32Array.BYTES_PER_ELEMENT * 9
      case FLOAT_MAT4     : return Float32Array.BYTES_PER_ELEMENT * 16
      default             : return undefined
    }
  }
}
