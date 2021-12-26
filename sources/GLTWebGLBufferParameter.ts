/**
 * 
 */
export type GLTWebGLBufferParameter = (
  GLTWebGLBufferParameter.BUFFER_SIZE |
  GLTWebGLBufferParameter.BUFFER_USAGE
)

/**
 * 
 */
export namespace GLTWebGLBufferParameter {
  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type BUFFER_SIZE = 0x8764

  /**
   * 
   */
  export const BUFFER_SIZE: BUFFER_SIZE = 0x8764

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type BUFFER_USAGE = 0x8765

  /**
   * 
   */
  export const BUFFER_USAGE: BUFFER_USAGE = 0x8765

  /**
   * 
   */
  export const ALL: readonly GLTWebGLBufferParameter[] = [
    BUFFER_SIZE,
    BUFFER_USAGE
  ]

  /**
   * Stringify the given constant.
   *
   * @param value - A constant.
   *
   * @return A stringified version of the given constant.
   */
  export function toString(value: GLTWebGLBufferParameter): string
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
      case BUFFER_SIZE: return 'BUFFER_SIZE'
      case BUFFER_USAGE: return 'BUFFER_USAGE'
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
    return `GLTWebGLBufferParameter #${value} (${toString(value) || 'undefined'})`
  }
}
