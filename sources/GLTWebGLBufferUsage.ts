/**
 * 
 */
export type GLTWebGLBufferUsage = (
  GLTWebGLBufferUsage.STATIC_DRAW |
  GLTWebGLBufferUsage.STATIC_READ |
  GLTWebGLBufferUsage.STATIC_COPY |
  GLTWebGLBufferUsage.DYNAMIC_DRAW |
  GLTWebGLBufferUsage.DYNAMIC_READ |
  GLTWebGLBufferUsage.DYNAMIC_COPY |
  GLTWebGLBufferUsage.STREAM_DRAW |
  GLTWebGLBufferUsage.STREAM_READ |
  GLTWebGLBufferUsage.STREAM_COPY
)

/**
 * 
 */
export namespace GLTWebGLBufferUsage {
  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type STATIC_DRAW = 0x88E4

  /**
   * 
   */
  export const STATIC_DRAW: STATIC_DRAW = 0x88E4

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type STATIC_READ = 0x88E5

  /**
   * 
   */
  export const STATIC_READ: STATIC_READ = 0x88E5

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type STATIC_COPY = 0x88E6

  /**
   * 
   */
  export const STATIC_COPY: STATIC_COPY = 0x88E6

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type DYNAMIC_DRAW = 0x88E8

  /**
   * 
   */
  export const DYNAMIC_DRAW: DYNAMIC_DRAW = 0x88E8

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type DYNAMIC_READ = 0x88E9

  /**
   * 
   */
  export const DYNAMIC_READ: DYNAMIC_READ = 0x88E9

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type DYNAMIC_COPY = 0x88EA

  /**
   * 
   */
  export const DYNAMIC_COPY: DYNAMIC_COPY = 0x88EA

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type STREAM_DRAW = 0x88E0

  /**
   * 
   */
  export const STREAM_DRAW: STREAM_DRAW = 0x88E0

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type STREAM_READ = 0x88E1

  /**
   * 
   */
  export const STREAM_READ: STREAM_READ = 0x88E1

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type STREAM_COPY = 0x88E2

  /**
   * 
   */
  export const STREAM_COPY: STREAM_COPY = 0x88E2

  /**
   * 
   */
  export const ALL: readonly GLTWebGLBufferUsage[] = [
    STATIC_DRAW,
    STATIC_READ,
    STATIC_COPY,
    DYNAMIC_DRAW,
    DYNAMIC_READ,
    DYNAMIC_COPY,
    STREAM_DRAW,
    STREAM_READ,
    STREAM_COPY
  ]

  /**
   * Stringify the given constant.
   *
   * @param value - A constant.
   *
   * @return A stringified version of the given constant.
   */
  export function toString(value: GLTWebGLBufferUsage): string
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
      case STATIC_DRAW: return 'STATIC_DRAW'
      case STATIC_READ: return 'STATIC_READ'
      case STATIC_COPY: return 'STATIC_COPY'
      case STREAM_DRAW: return 'STREAM_DRAW'
      case STREAM_READ: return 'STREAM_READ'
      case STREAM_COPY: return 'STREAM_COPY'
      case DYNAMIC_DRAW: return 'DYNAMIC_DRAW'
      case DYNAMIC_READ: return 'DYNAMIC_READ'
      case DYNAMIC_COPY: return 'DYNAMIC_COPY'
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
    return `GLTWebGLBufferUsage #${value} (${toString(value) || 'undefined'})`
  }
}
