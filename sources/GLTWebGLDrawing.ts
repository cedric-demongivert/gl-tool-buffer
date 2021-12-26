/**
 * 
 */
export type GLTWebGLDrawing = (
  GLTWebGLDrawing.POINTS |
  GLTWebGLDrawing.LINES |
  GLTWebGLDrawing.LINE_LOOP |
  GLTWebGLDrawing.LINE_STRIP |
  GLTWebGLDrawing.TRIANGLES |
  GLTWebGLDrawing.TRIANGLE_STRIP |
  GLTWebGLDrawing.TRIANGLE_FAN
)

/**
 * 
 */
export namespace GLTWebGLDrawing {
  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type POINTS = 0x0000

  /**
   * 
   */
  export const POINTS: POINTS = 0x0000

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type LINES = 0x0001

  /**
   * 
   */
  export const LINES: LINES = 0x0001

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type LINE_LOOP = 0x0002

  /**
   * 
   */
  export const LINE_LOOP: LINE_LOOP = 0x0002

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type LINE_STRIP = 0x0003

  /**
   * 
   */
  export const LINE_STRIP: LINE_STRIP = 0x0003

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type TRIANGLES = 0x0004

  /**
   * 
   */
  export const TRIANGLES: TRIANGLES = 0x0004

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type TRIANGLE_STRIP = 0x0005

  /**
   * 
   */
  export const TRIANGLE_STRIP: TRIANGLE_STRIP = 0x0005

  /**
   * @see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   */
  export type TRIANGLE_FAN = 0x0006

  /**
   * 
   */
  export const TRIANGLE_FAN: TRIANGLE_FAN = 0x0006

  /**
   * 
   */
  export const ALL: readonly GLTWebGLDrawing[] = [
    POINTS,
    LINES,
    LINE_LOOP,
    LINE_STRIP,
    TRIANGLES,
    TRIANGLE_STRIP,
    TRIANGLE_FAN
  ]

  /**
   * Stringify the given constant.
   *
   * @param value - A constant.
   *
   * @return A stringified version of the given constant.
   */
  export function toString(value: GLTWebGLDrawing): string
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
      case POINTS: return 'POINTS'
      case LINES: return 'LINES'
      case LINE_LOOP: return 'LINE_LOOP'
      case LINE_STRIP: return 'LINE_STRIP'
      case TRIANGLES: return 'TRIANGLES'
      case TRIANGLE_STRIP: return 'TRIANGLE_STRIP'
      case TRIANGLE_FAN: return 'TRIANGLE_FAN'
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
    return `GLTWebGLDrawing #${value} (${toString(value) || 'undefined'})`
  }
}
