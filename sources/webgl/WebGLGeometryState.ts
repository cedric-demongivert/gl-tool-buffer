export type WebGLGeometryState = number

export namespace WebGLGeometryState {
  /**
  * When a buffer is declared but not instantiated into the current context.
  */
  export const BLANK : WebGLGeometryState = 0

  /**
  * When a buffer is compiled and ready for use.
  */
  export const READY : WebGLGeometryState = 1

  /**
  * When a buffer is instantiated but not compiled, or compiled but not
  * synchronized with it's description.
  */
  export const DIRTY : WebGLGeometryState = 2

  /**
  * When a buffer failed it's last compilation attempt.
  */
  export const ERROR : WebGLGeometryState = 3

  export const ALL   : WebGLGeometryState[] = [
    BLANK,
    READY,
    DIRTY,
    ERROR
  ]

  /**
  * Stringify the given constant.
  *
  * @param value - A constant.
  *
  * @return The label associated with the given constant.
  */
  export function toString (value : WebGLGeometryState) : string {
    switch (value) {
      case BLANK : return 'BLANK'
      case READY : return 'READY'
      case DIRTY : return 'DIRTY'
      case ERROR : return 'ERROR'
      default    : return undefined
    }
  }
}
