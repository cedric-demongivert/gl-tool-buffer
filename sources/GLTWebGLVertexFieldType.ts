import { GLTVertexFieldType } from "./GLTVertexFieldType"

/**
 * 
 */
export type GLTWebGLVertexFieldType = (
  GLTWebGLVertexFieldType.BYTE |
  GLTWebGLVertexFieldType.UNSIGNED_BYTE |
  GLTWebGLVertexFieldType.SHORT |
  GLTWebGLVertexFieldType.UNSIGNED_SHORT |
  GLTWebGLVertexFieldType.INT |
  GLTWebGLVertexFieldType.UNSIGNED_INT |
  GLTWebGLVertexFieldType.BOOL |
  GLTWebGLVertexFieldType.FLOAT |
  GLTWebGLVertexFieldType.INT_VEC2 |
  GLTWebGLVertexFieldType.INT_VEC3 |
  GLTWebGLVertexFieldType.INT_VEC4 |
  GLTWebGLVertexFieldType.BOOL_VEC2 |
  GLTWebGLVertexFieldType.BOOL_VEC3 |
  GLTWebGLVertexFieldType.BOOL_VEC4 |
  GLTWebGLVertexFieldType.FLOAT_VEC2 |
  GLTWebGLVertexFieldType.FLOAT_VEC3 |
  GLTWebGLVertexFieldType.FLOAT_VEC4 |
  GLTWebGLVertexFieldType.FLOAT_MAT2 |
  GLTWebGLVertexFieldType.FLOAT_MAT3 |
  GLTWebGLVertexFieldType.FLOAT_MAT4
)

export namespace GLTWebGLVertexFieldType {
  /**
  * 
  */
  export type Scalar = (
    GLTWebGLVertexFieldType.BYTE |
    GLTWebGLVertexFieldType.UNSIGNED_BYTE |
    GLTWebGLVertexFieldType.SHORT |
    GLTWebGLVertexFieldType.UNSIGNED_SHORT |
    GLTWebGLVertexFieldType.INT |
    GLTWebGLVertexFieldType.UNSIGNED_INT |
    GLTWebGLVertexFieldType.BOOL |
    GLTWebGLVertexFieldType.FLOAT
  )

  /**
   * 
   */
  export type Tensor = (
    GLTWebGLVertexFieldType.INT_VEC2 |
    GLTWebGLVertexFieldType.INT_VEC3 |
    GLTWebGLVertexFieldType.INT_VEC4 |
    GLTWebGLVertexFieldType.BOOL_VEC2 |
    GLTWebGLVertexFieldType.BOOL_VEC3 |
    GLTWebGLVertexFieldType.BOOL_VEC4 |
    GLTWebGLVertexFieldType.FLOAT_VEC2 |
    GLTWebGLVertexFieldType.FLOAT_VEC3 |
    GLTWebGLVertexFieldType.FLOAT_VEC4 |
    GLTWebGLVertexFieldType.FLOAT_MAT2 |
    GLTWebGLVertexFieldType.FLOAT_MAT3 |
    GLTWebGLVertexFieldType.FLOAT_MAT4
  )

  /**
   * 
   */
  export type BYTE = 0x1400

  /**
   * 
   */
  export const BYTE: BYTE = 0x1400

  /**
   * 
   */
  export type UNSIGNED_BYTE = 0x1401

  /**
   * 
   */
  export const UNSIGNED_BYTE: UNSIGNED_BYTE = 0x1401

  /**
   * 
   */
  export type SHORT = 0x1402

  /**
   * 
   */
  export const SHORT: SHORT = 0x1402

  /**
   * 
   */
  export type UNSIGNED_SHORT = 0x1403

  /**
   * 
   */
  export const UNSIGNED_SHORT: UNSIGNED_SHORT = 0x1403

  /**
   * 
   */
  export type INT = 0x1404

  /**
   * 
   */
  export const INT: INT = 0x1404

  /**
   * 
   */
  export type UNSIGNED_INT = 0x1405

  /**
   * 
   */
  export const UNSIGNED_INT: UNSIGNED_INT = 0x1405

  /**
   * 
   */
  export type FLOAT = 0x1406

  /**
   * 
   */
  export const FLOAT: FLOAT = 0x1406

  /**
   * 
   */
  export type BOOL = 0x8B56

  /**
   * 
   */
  export const BOOL: BOOL = 0x8B56

  /**
   * 
   */
  export type INT_VEC2 = 0x8B53

  /**
   * 
   */
  export const INT_VEC2: INT_VEC2 = 0x8B53

  /**
   * 
   */
  export type INT_VEC3 = 0x8B54

  /**
   * 
   */
  export const INT_VEC3: INT_VEC3 = 0x8B54

  /**
   * 
   */
  export type INT_VEC4 = 0x8B55

  /**
   * 
   */
  export const INT_VEC4: INT_VEC4 = 0x8B55

  /**
   * 
   */
  export type BOOL_VEC2 = 0x8B57

  /**
   * 
   */
  export const BOOL_VEC2: BOOL_VEC2 = 0x8B57

  /**
   * 
   */
  export type BOOL_VEC3 = 0x8B58

  /**
   * 
   */
  export const BOOL_VEC3: BOOL_VEC3 = 0x8B58

  /**
   * 
   */
  export type BOOL_VEC4 = 0x8B59

  /**
   * 
   */
  export const BOOL_VEC4: BOOL_VEC4 = 0x8B59

  /**
   * 
   */
  export type FLOAT_VEC2 = 0x8B50

  /**
   * 
   */
  export const FLOAT_VEC2: FLOAT_VEC2 = 0x8B50

  /**
   * 
   */
  export type FLOAT_VEC3 = 0x8B51

  /**
   * 
   */
  export const FLOAT_VEC3: FLOAT_VEC3 = 0x8B51

  /**
   * 
   */
  export type FLOAT_VEC4 = 0x8B52

  /**
   * 
   */
  export const FLOAT_VEC4: FLOAT_VEC4 = 0x8B52

  /**
   * 
   */
  export type FLOAT_MAT2 = 0x8B5A

  /**
   * 
   */
  export const FLOAT_MAT2: FLOAT_MAT2 = 0x8B5A

  /**
   * 
   */
  export type FLOAT_MAT3 = 0x8B5B

  /**
   * 
   */
  export const FLOAT_MAT3: FLOAT_MAT3 = 0x8B5B

  /**
   * 
   */
  export type FLOAT_MAT4 = 0x8B5C

  /**
   * 
   */
  export const FLOAT_MAT4: FLOAT_MAT4 = 0x8B5C

  /**
   * 
   */
  export const ALL: readonly GLTWebGLVertexFieldType[] = [
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
  export function fromGLTType(value: GLTVertexFieldType): GLTWebGLVertexFieldType
  /**
   * Stringify the given constant.
   *
   * @param value - A constant.
   *
   * @return A stringified version of the given constant.
   */
  export function fromGLTType(value: number): GLTWebGLVertexFieldType | undefined
  export function fromGLTType(value: number): GLTWebGLVertexFieldType | undefined {
    switch (value) {
      case GLTVertexFieldType.BYTE: return BYTE
      case GLTVertexFieldType.UNSIGNED_BYTE: return UNSIGNED_BYTE
      case GLTVertexFieldType.SHORT: return SHORT
      case GLTVertexFieldType.UNSIGNED_SHORT: return UNSIGNED_SHORT
      case GLTVertexFieldType.INT: return INT
      case GLTVertexFieldType.UNSIGNED_INT: return UNSIGNED_INT
      case GLTVertexFieldType.FLOAT: return FLOAT
      case GLTVertexFieldType.BOOL: return BOOL
      case GLTVertexFieldType.INT_VEC2: return INT_VEC2
      case GLTVertexFieldType.INT_VEC3: return INT_VEC3
      case GLTVertexFieldType.INT_VEC4: return INT_VEC4
      case GLTVertexFieldType.BOOL_VEC2: return BOOL_VEC2
      case GLTVertexFieldType.BOOL_VEC3: return BOOL_VEC3
      case GLTVertexFieldType.BOOL_VEC4: return BOOL_VEC4
      case GLTVertexFieldType.FLOAT_VEC2: return FLOAT_VEC2
      case GLTVertexFieldType.FLOAT_VEC3: return FLOAT_VEC3
      case GLTVertexFieldType.FLOAT_VEC4: return FLOAT_VEC4
      case GLTVertexFieldType.FLOAT_MAT2: return FLOAT_MAT2
      case GLTVertexFieldType.FLOAT_MAT3: return FLOAT_MAT3
      case GLTVertexFieldType.FLOAT_MAT4: return FLOAT_MAT4
      default: return undefined
    }
  }

  /**
   * Stringify the given constant.
   *
   * @param value - A constant.
   *
   * @return A stringified version of the given constant.
   */
  export function toString(value: GLTWebGLVertexFieldType): string
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
    return `GLTWebGLVertexFieldType #${value} (${toString(value) || 'undefined'})`
  }

  /**
  * Return the number of scalars that compose the given type.
  *
  * @param value - Data type.
  *
  * @return The number of scalars that compose the given type.
  */
  export function elements(value: GLTWebGLVertexFieldType): number
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
  export function scalar(value: GLTWebGLVertexFieldType): GLTWebGLVertexFieldType.Scalar
  /**
   * Return the scalar type that compose the given type.
   *
   * @param value - Data type.
   *
   * @return The type of scalar that compose the given type.
   */
  export function scalar(value: number): GLTWebGLVertexFieldType.Scalar | undefined
  export function scalar(value: number): GLTWebGLVertexFieldType.Scalar | undefined {
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
  export function sizeof(type: GLTWebGLVertexFieldType): number
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
