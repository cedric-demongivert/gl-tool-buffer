import { GLTWebGLBufferType } from "./GLTWebGLBufferType"

/**
 * 
 */
export type GLTWebGLBufferBindingParameter = (
  GLTWebGLBufferBindingParameter.ELEMENT_ARRAY_BUFFER_BINDING |
  GLTWebGLBufferBindingParameter.ARRAY_BUFFER_BINDING |
  GLTWebGLBufferBindingParameter.COPY_READ_BUFFER_BINDING |
  GLTWebGLBufferBindingParameter.COPY_WRITE_BUFFER_BINDING |
  GLTWebGLBufferBindingParameter.TRANSFORM_FEEDBACK_BUFFER_BINDING |
  GLTWebGLBufferBindingParameter.UNIFORM_BUFFER_BINDING |
  GLTWebGLBufferBindingParameter.PIXEL_PACK_BUFFER_BINDING |
  GLTWebGLBufferBindingParameter.PIXEL_UNPACK_BUFFER_BINDING
)

/**
 * 
 */
export namespace GLTWebGLBufferBindingParameter {
  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type ELEMENT_ARRAY_BUFFER_BINDING = 0x8895

  /**
   * 
   */
  export const ELEMENT_ARRAY_BUFFER_BINDING: ELEMENT_ARRAY_BUFFER_BINDING = 0x8895

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type ARRAY_BUFFER_BINDING = 0x8894

  /**
   * 
   */
  export const ARRAY_BUFFER_BINDING: ARRAY_BUFFER_BINDING = 0x8894

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/#3.7
   */
  export type COPY_READ_BUFFER_BINDING = 0x8F36

  /**
   * 
   */
  export const COPY_READ_BUFFER_BINDING: COPY_READ_BUFFER_BINDING = 0x8F36

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/#3.7
   */
  export type COPY_WRITE_BUFFER_BINDING = 0x8F37

  /**
   * 
   */
  export const COPY_WRITE_BUFFER_BINDING: COPY_WRITE_BUFFER_BINDING = 0x8F37

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/#3.7
   */
  export type TRANSFORM_FEEDBACK_BUFFER_BINDING = 0x8C8F

  /**
   * 
   */
  export const TRANSFORM_FEEDBACK_BUFFER_BINDING: TRANSFORM_FEEDBACK_BUFFER_BINDING = 0x8C8F

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/#3.7
   */
  export type UNIFORM_BUFFER_BINDING = 0x8A28

  /**
   * 
   */
  export const UNIFORM_BUFFER_BINDING: UNIFORM_BUFFER_BINDING = 0x8A28

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/#3.7
   */
  export type PIXEL_PACK_BUFFER_BINDING = 0x88ED

  /**
   * 
   */
  export const PIXEL_PACK_BUFFER_BINDING: PIXEL_PACK_BUFFER_BINDING = 0x88ED

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/#3.7
   */
  export type PIXEL_UNPACK_BUFFER_BINDING = 0x88EF

  /**
   * 
   */
  export const PIXEL_UNPACK_BUFFER_BINDING: PIXEL_UNPACK_BUFFER_BINDING = 0x88EF

  /**
   * 
   */
  export const ALL: readonly GLTWebGLBufferBindingParameter[] = [
    ELEMENT_ARRAY_BUFFER_BINDING,
    ARRAY_BUFFER_BINDING,
    COPY_READ_BUFFER_BINDING,
    COPY_WRITE_BUFFER_BINDING,
    TRANSFORM_FEEDBACK_BUFFER_BINDING,
    UNIFORM_BUFFER_BINDING,
    PIXEL_PACK_BUFFER_BINDING,
    PIXEL_UNPACK_BUFFER_BINDING
  ]

  /**
   * 
   */
  export function fromType(binding: GLTWebGLBufferType): GLTWebGLBufferBindingParameter
  /**
   * 
   */
  export function fromType(binding: number): GLTWebGLBufferBindingParameter | undefined
  export function fromType(binding: number): GLTWebGLBufferBindingParameter | undefined {
    switch (binding) {
      case GLTWebGLBufferType.ELEMENT_ARRAY_BUFFER: return ELEMENT_ARRAY_BUFFER_BINDING
      case GLTWebGLBufferType.ARRAY_BUFFER: return ARRAY_BUFFER_BINDING
      case GLTWebGLBufferType.COPY_READ_BUFFER: return COPY_READ_BUFFER_BINDING
      case GLTWebGLBufferType.COPY_WRITE_BUFFER: return COPY_WRITE_BUFFER_BINDING
      case GLTWebGLBufferType.TRANSFORM_FEEDBACK_BUFFER: return TRANSFORM_FEEDBACK_BUFFER_BINDING
      case GLTWebGLBufferType.UNIFORM_BUFFER: return UNIFORM_BUFFER_BINDING
      case GLTWebGLBufferType.PIXEL_PACK_BUFFER: return PIXEL_PACK_BUFFER_BINDING
      case GLTWebGLBufferType.PIXEL_UNPACK_BUFFER: return PIXEL_UNPACK_BUFFER_BINDING
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
  export function toString(value: GLTWebGLBufferBindingParameter): string
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
      case ELEMENT_ARRAY_BUFFER_BINDING: return 'ELEMENT_ARRAY_BUFFER_BINDING'
      case ARRAY_BUFFER_BINDING: return 'ARRAY_BUFFER_BINDING'
      case COPY_READ_BUFFER_BINDING: return 'COPY_READ_BUFFER_BINDING'
      case COPY_WRITE_BUFFER_BINDING: return 'COPY_WRITE_BUFFER_BINDING'
      case TRANSFORM_FEEDBACK_BUFFER_BINDING: return 'TRANSFORM_FEEDBACK_BUFFER_BINDING'
      case UNIFORM_BUFFER_BINDING: return 'UNIFORM_BUFFER_BINDING'
      case PIXEL_PACK_BUFFER_BINDING: return 'PIXEL_PACK_BUFFER_BINDING'
      case PIXEL_UNPACK_BUFFER_BINDING: return 'PIXEL_UNPACK_BUFFER_BINDING'
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
    return `GLTWebGLBufferBindingParameter #${value} (${toString(value) || 'undefined'})`
  }
}
