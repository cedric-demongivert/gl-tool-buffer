export type WebGLBufferState = number

export namespace WebGLBufferState {
  /**
  * When a buffer is declared but not instantiated into the current context.
  */
  export const BLANK : WebGLBufferState = 0

  /**
  * When a buffer is compiled and ready for use.
  */
  export const READY : WebGLBufferState = 1

  /**
  * When a buffer is instantiated but not compiled, or compiled but not
  * synchronized with it's description.
  */
  export const DIRTY : WebGLBufferState = 2

  /**
  * When a buffer failed it's last compilation attempt.
  */
  export const ERROR : WebGLBufferState = 3

  export const ALL   : WebGLBufferState[] = [
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
  export function toString (value : WebGLBufferState) : string {
    switch (value) {
      case BLANK : return 'BLANK'
      case READY : return 'READY'
      case DIRTY : return 'DIRTY'
      case ERROR : return 'ERROR'
      default    : return undefined
    }
  }
}
