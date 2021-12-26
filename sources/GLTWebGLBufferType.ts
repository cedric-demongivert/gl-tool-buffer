/**
 * 
 */
export type GLTWebGLBufferType = (
  GLTWebGLBufferType.ELEMENT_ARRAY_BUFFER |
  GLTWebGLBufferType.ARRAY_BUFFER |
  GLTWebGLBufferType.COPY_READ_BUFFER |
  GLTWebGLBufferType.COPY_WRITE_BUFFER |
  GLTWebGLBufferType.TRANSFORM_FEEDBACK_BUFFER |
  GLTWebGLBufferType.UNIFORM_BUFFER |
  GLTWebGLBufferType.PIXEL_PACK_BUFFER |
  GLTWebGLBufferType.PIXEL_UNPACK_BUFFER
)

/**
 * 
 */
export namespace GLTWebGLBufferType {
  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type ELEMENT_ARRAY_BUFFER = 0x8893

  /**
   * 
   */
  export const ELEMENT_ARRAY_BUFFER: ELEMENT_ARRAY_BUFFER = 0x8893

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type ARRAY_BUFFER = 0x8892

  /**
   * 
   */
  export const ARRAY_BUFFER: ARRAY_BUFFER = 0x8892

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/#3.7
   */
  export type COPY_READ_BUFFER = 0x8F36

  /**
   * 
   */
  export const COPY_READ_BUFFER: COPY_READ_BUFFER = 0x8F36

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/#3.7
   */
  export type COPY_WRITE_BUFFER = 0x8F37

  /**
   * 
   */
  export const COPY_WRITE_BUFFER: COPY_WRITE_BUFFER = 0x8F37

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/#3.7
   */
  export type TRANSFORM_FEEDBACK_BUFFER = 0x8C8E

  /**
   * 
   */
  export const TRANSFORM_FEEDBACK_BUFFER: TRANSFORM_FEEDBACK_BUFFER = 0x8C8E

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/#3.7
   */
  export type UNIFORM_BUFFER = 0x8A11

  /**
   * 
   */
  export const UNIFORM_BUFFER: UNIFORM_BUFFER = 0x8A11

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/#3.7
   */
  export type PIXEL_PACK_BUFFER = 0x88EB

  /**
   * 
   */
  export const PIXEL_PACK_BUFFER: PIXEL_PACK_BUFFER = 0x88EB

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/#3.7
   */
  export type PIXEL_UNPACK_BUFFER = 0x88EC

  /**
   * 
   */
  export const PIXEL_UNPACK_BUFFER: PIXEL_UNPACK_BUFFER = 0x88EC

  /**
   * 
   */
  export const ALL: readonly GLTWebGLBufferType[] = [
    ELEMENT_ARRAY_BUFFER,
    ARRAY_BUFFER,
    COPY_READ_BUFFER,
    COPY_WRITE_BUFFER,
    TRANSFORM_FEEDBACK_BUFFER,
    UNIFORM_BUFFER,
    PIXEL_PACK_BUFFER,
    PIXEL_UNPACK_BUFFER
  ]

  /**
   * Stringify the given constant.
   *
   * @param value - A constant.
   *
   * @return A stringified version of the given constant.
   */
  export function toString(value: GLTWebGLBufferType): string
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
      case ELEMENT_ARRAY_BUFFER: return 'ELEMENT_ARRAY_BUFFER'
      case ARRAY_BUFFER: return 'ARRAY_BUFFER'
      case COPY_READ_BUFFER: return 'COPY_READ_BUFFER'
      case COPY_WRITE_BUFFER: return 'COPY_WRITE_BUFFER'
      case TRANSFORM_FEEDBACK_BUFFER: return 'TRANSFORM_FEEDBACK_BUFFER'
      case UNIFORM_BUFFER: return 'UNIFORM_BUFFER'
      case PIXEL_PACK_BUFFER: return 'PIXEL_PACK_BUFFER'
      case PIXEL_UNPACK_BUFFER: return 'PIXEL_UNPACK_BUFFER'
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
    return `GLTWebGLBufferBinding #${value} (${toString(value) || 'undefined'})`
  }
}
