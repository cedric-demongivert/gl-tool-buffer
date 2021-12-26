/**
 * 
 */
export type GLTWebGLElementType = (
  GLTWebGLElementType.UNSIGNED_BYTE |
  GLTWebGLElementType.UNSIGNED_SHORT |
  GLTWebGLElementType.UNSIGNED_INT
)

/**
 * 
 */
export namespace GLTWebGLElementType {
  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type UNSIGNED_BYTE = 0x1401

  /**
   * 
   */
  export const UNSIGNED_BYTE: UNSIGNED_BYTE = 0x1401

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type UNSIGNED_SHORT = 0x1403

  /**
   * 
   */
  export const UNSIGNED_SHORT: UNSIGNED_SHORT = 0x1403

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type UNSIGNED_INT = 0x1405

  /**
   * 
   */
  export const UNSIGNED_INT: UNSIGNED_INT = 0x1405

  /**
   * 
   */
  export const ALL: readonly GLTWebGLElementType[] = [
    UNSIGNED_BYTE,
    UNSIGNED_SHORT,
    UNSIGNED_INT
  ]

  /**
   * Stringify the given constant.
   *
   * @param value - A constant.
   *
   * @return A stringified version of the given constant.
   */
  export function toString(value: GLTWebGLElementType): string
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
      case UNSIGNED_BYTE: return 'UNSIGNED_BYTE'
      case UNSIGNED_SHORT: return 'UNSIGNED_SHORT'
      case UNSIGNED_INT: return 'UNSIGNED_INT'
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
    return `GLTWebGLElementType #${value} (${toString(value) || 'undefined'})`
  }
}
