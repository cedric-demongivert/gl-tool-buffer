/**
 * 
 */
export type GLTVertexFieldType = (
  GLTVertexFieldType.BYTE |
  GLTVertexFieldType.UNSIGNED_BYTE |
  GLTVertexFieldType.SHORT |
  GLTVertexFieldType.UNSIGNED_SHORT |
  GLTVertexFieldType.INT |
  GLTVertexFieldType.UNSIGNED_INT |
  GLTVertexFieldType.BOOL |
  GLTVertexFieldType.FLOAT |
  GLTVertexFieldType.INT_VEC2 |
  GLTVertexFieldType.INT_VEC3 |
  GLTVertexFieldType.INT_VEC4 |
  GLTVertexFieldType.BOOL_VEC2 |
  GLTVertexFieldType.BOOL_VEC3 |
  GLTVertexFieldType.BOOL_VEC4 |
  GLTVertexFieldType.FLOAT_VEC2 |
  GLTVertexFieldType.FLOAT_VEC3 |
  GLTVertexFieldType.FLOAT_VEC4 |
  GLTVertexFieldType.FLOAT_MAT2 |
  GLTVertexFieldType.FLOAT_MAT3 |
  GLTVertexFieldType.FLOAT_MAT4
)

export namespace GLTVertexFieldType {
  /**
  * 
  */
  export type Scalar = (
    GLTVertexFieldType.BYTE |
    GLTVertexFieldType.UNSIGNED_BYTE |
    GLTVertexFieldType.SHORT |
    GLTVertexFieldType.UNSIGNED_SHORT |
    GLTVertexFieldType.INT |
    GLTVertexFieldType.UNSIGNED_INT |
    GLTVertexFieldType.BOOL |
    GLTVertexFieldType.FLOAT
  )

  /**
   * 
   */
  export type Tensor = (
    GLTVertexFieldType.INT_VEC2 |
    GLTVertexFieldType.INT_VEC3 |
    GLTVertexFieldType.INT_VEC4 |
    GLTVertexFieldType.BOOL_VEC2 |
    GLTVertexFieldType.BOOL_VEC3 |
    GLTVertexFieldType.BOOL_VEC4 |
    GLTVertexFieldType.FLOAT_VEC2 |
    GLTVertexFieldType.FLOAT_VEC3 |
    GLTVertexFieldType.FLOAT_VEC4 |
    GLTVertexFieldType.FLOAT_MAT2 |
    GLTVertexFieldType.FLOAT_MAT3 |
    GLTVertexFieldType.FLOAT_MAT4
  )

  /**
   * 
   */
  export type BYTE = 0

  /**
   * 
   */
  export const BYTE: BYTE = 0

  /**
   * 
   */
  export type UNSIGNED_BYTE = 1

  /**
   * 
   */
  export const UNSIGNED_BYTE: UNSIGNED_BYTE = 1

  /**
   * 
   */
  export type SHORT = 2

  /**
   * 
   */
  export const SHORT: SHORT = 2

  /**
   * 
   */
  export type UNSIGNED_SHORT = 3

  /**
   * 
   */
  export const UNSIGNED_SHORT: UNSIGNED_SHORT = 3

  /**
   * 
   */
  export type INT = 4

  /**
   * 
   */
  export const INT: INT = 4

  /**
   * 
   */
  export type UNSIGNED_INT = 5

  /**
   * 
   */
  export const UNSIGNED_INT: UNSIGNED_INT = 5

  /**
   * 
   */
  export type FLOAT = 6

  /**
   * 
   */
  export const FLOAT: FLOAT = 6

  /**
   * 
   */
  export type BOOL = 7

  /**
   * 
   */
  export const BOOL: BOOL = 7

  /**
   * 
   */
  export type INT_VEC2 = 8

  /**
   * 
   */
  export const INT_VEC2: INT_VEC2 = 8

  /**
   * 
   */
  export type INT_VEC3 = 9

  /**
   * 
   */
  export const INT_VEC3: INT_VEC3 = 9

  /**
   * 
   */
  export type INT_VEC4 = 10

  /**
   * 
   */
  export const INT_VEC4: INT_VEC4 = 10

  /**
   * 
   */
  export type BOOL_VEC2 = 11

  /**
   * 
   */
  export const BOOL_VEC2: BOOL_VEC2 = 11

  /**
   * 
   */
  export type BOOL_VEC3 = 12

  /**
   * 
   */
  export const BOOL_VEC3: BOOL_VEC3 = 12

  /**
   * 
   */
  export type BOOL_VEC4 = 13

  /**
   * 
   */
  export const BOOL_VEC4: BOOL_VEC4 = 13

  /**
   * 
   */
  export type FLOAT_VEC2 = 14

  /**
   * 
   */
  export const FLOAT_VEC2: FLOAT_VEC2 = 14

  /**
   * 
   */
  export type FLOAT_VEC3 = 15

  /**
   * 
   */
  export const FLOAT_VEC3: FLOAT_VEC3 = 15

  /**
   * 
   */
  export type FLOAT_VEC4 = 16

  /**
   * 
   */
  export const FLOAT_VEC4: FLOAT_VEC4 = 16

  /**
   * 
   */
  export type FLOAT_MAT2 = 17

  /**
   * 
   */
  export const FLOAT_MAT2: FLOAT_MAT2 = 17

  /**
   * 
   */
  export type FLOAT_MAT3 = 18

  /**
   * 
   */
  export const FLOAT_MAT3: FLOAT_MAT3 = 18

  /**
   * 
   */
  export type FLOAT_MAT4 = 19

  /**
   * 
   */
  export const FLOAT_MAT4: FLOAT_MAT4 = 19

  /**
   * 
   */
  export const ALL: readonly GLTVertexFieldType[] = [
    BYTE,
    UNSIGNED_BYTE,
    SHORT,
    UNSIGNED_SHORT,
    INT,
    UNSIGNED_INT,
    FLOAT,
    BOOL,
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
   * @return A stringified version of the given constant.
   */
  export function toString(value: GLTVertexFieldType): string
  /**
   * Stringify the given constant.
   *
   * @param value - A constant.
   *
   * @return A stringified version of the given constant.
   */
  export function toString(value: number): string | undefined
  export function toString(value: number): string | undefined {
    switch (value) {
      case BYTE: return 'BYTE'
      case UNSIGNED_BYTE: return 'UNSIGNED_BYTE'
      case SHORT: return 'SHORT'
      case UNSIGNED_SHORT: return 'UNSIGNED_SHORT'
      case INT: return 'INT'
      case UNSIGNED_INT: return 'UNSIGNED_INT'
      case FLOAT: return 'FLOAT'
      case BOOL: return 'BOOL'
      case INT_VEC2: return 'INT_VEC2'
      case INT_VEC3: return 'INT_VEC3'
      case INT_VEC4: return 'INT_VEC4'
      case BOOL_VEC2: return 'BOOL_VEC2'
      case BOOL_VEC3: return 'BOOL_VEC3'
      case BOOL_VEC4: return 'BOOL_VEC4'
      case FLOAT_VEC2: return 'FLOAT_VEC2'
      case FLOAT_VEC3: return 'FLOAT_VEC3'
      case FLOAT_VEC4: return 'FLOAT_VEC4'
      case FLOAT_MAT2: return 'FLOAT_MAT2'
      case FLOAT_MAT3: return 'FLOAT_MAT3'
      case FLOAT_MAT4: return 'FLOAT_MAT4'
      default: return undefined
    }
  }

  /**
   * Stringify the given constant with debugging information.
   *
   * @param value - A constant.
   *
   * @return A stringified version of the constant with debugging information.
   */
  export function toDebugString(value: number): string {
    return `GLTVertexFieldType #${value} (${toString(value) || 'undefined'})`
  }

  /**
  * Return the number of scalars that compose the given type.
  *
  * @param value - Data type.
  *
  * @return The number of scalars that compose the given type.
  */
  export function elements(value: GLTVertexFieldType): number
  /**
  * Return the number of scalars that compose the given type.
  *
  * @param value - Data type.
  *
  * @return The number of scalars that compose the given type.
  */
  export function elements(value: number): number | undefined
  export function elements(value: number): number | undefined {
    switch (value) {
      case BYTE:
      case SHORT:
      case INT:
      case BOOL:
      case FLOAT:
      case UNSIGNED_BYTE:
      case UNSIGNED_INT:
      case UNSIGNED_SHORT:
        return 1
      case INT_VEC2:
      case FLOAT_VEC2:
      case BOOL_VEC2:
        return 2
      case INT_VEC3:
      case FLOAT_VEC3:
      case BOOL_VEC3:
        return 3
      case INT_VEC4:
      case FLOAT_VEC4:
      case BOOL_VEC4:
      case FLOAT_MAT2:
        return 4
      case FLOAT_MAT3:
        return 9
      case FLOAT_MAT4:
        return 16
      default:
        return undefined
    }
  }

  /**
   * Return the scalar type that compose the given type.
   *
   * @param value - Data type.
   *
   * @return The type of scalar that compose the given type.
   */
  export function scalar(value: GLTVertexFieldType): GLTVertexFieldType.Scalar
  /**
   * Return the scalar type that compose the given type.
   *
   * @param value - Data type.
   *
   * @return The type of scalar that compose the given type.
   */
  export function scalar(value: number): GLTVertexFieldType.Scalar | undefined
  export function scalar(value: number): GLTVertexFieldType.Scalar | undefined {
    switch (value) {
      case BYTE:
        return BYTE
      case UNSIGNED_BYTE:
        return UNSIGNED_BYTE
      case UNSIGNED_SHORT:
        return UNSIGNED_SHORT
      case INT:
      case INT_VEC2:
      case INT_VEC3:
      case INT_VEC4:
        return INT
      case UNSIGNED_INT:
        return UNSIGNED_INT
      case SHORT:
        return SHORT
      case FLOAT:
      case FLOAT_VEC2:
      case FLOAT_VEC3:
      case FLOAT_VEC4:
      case FLOAT_MAT2:
      case FLOAT_MAT3:
      case FLOAT_MAT4:
        return FLOAT
      case BOOL:
      case BOOL_VEC2:
      case BOOL_VEC3:
      case BOOL_VEC4:
        return BOOL
      default:
        return undefined
    }
  }

  /**
  * Return the size of the given type in byte.
  *
  * @param type - A constant.
  *
  * @return The size of an object of the given type in byte.
  */
  export function sizeof(type: GLTVertexFieldType): number
  /**
  * Return the size of the given type in byte.
  *
  * @param type - A constant.
  *
  * @return The size of an object of the given type in byte.
  */
  export function sizeof(type: number): number | undefined
  export function sizeof(type: number): number | undefined {
    switch (type) {
      case BYTE: return Int8Array.BYTES_PER_ELEMENT
      case UNSIGNED_BYTE: return Uint8Array.BYTES_PER_ELEMENT
      case SHORT: return Int16Array.BYTES_PER_ELEMENT
      case UNSIGNED_SHORT: return Uint16Array.BYTES_PER_ELEMENT
      case INT: return Int32Array.BYTES_PER_ELEMENT
      case UNSIGNED_INT: return Uint32Array.BYTES_PER_ELEMENT
      case FLOAT: return Float32Array.BYTES_PER_ELEMENT
      case BOOL: return Int8Array.BYTES_PER_ELEMENT
      case INT_VEC2: return Int32Array.BYTES_PER_ELEMENT * 2
      case INT_VEC3: return Int32Array.BYTES_PER_ELEMENT * 3
      case INT_VEC4: return Int32Array.BYTES_PER_ELEMENT * 4
      case BOOL_VEC2: return Int8Array.BYTES_PER_ELEMENT * 2
      case BOOL_VEC3: return Int8Array.BYTES_PER_ELEMENT * 3
      case BOOL_VEC4: return Int8Array.BYTES_PER_ELEMENT * 4
      case FLOAT_VEC2: return Float32Array.BYTES_PER_ELEMENT * 2
      case FLOAT_VEC3: return Float32Array.BYTES_PER_ELEMENT * 3
      case FLOAT_VEC4: return Float32Array.BYTES_PER_ELEMENT * 4
      case FLOAT_MAT2: return Float32Array.BYTES_PER_ELEMENT * 4
      case FLOAT_MAT3: return Float32Array.BYTES_PER_ELEMENT * 9
      case FLOAT_MAT4: return Float32Array.BYTES_PER_ELEMENT * 16
      default: return undefined
    }
  }
}
