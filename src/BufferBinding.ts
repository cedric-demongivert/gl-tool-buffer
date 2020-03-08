export type BufferBinding = number

export namespace BufferBinding {
  export const ELEMENT_ARRAY : BufferBinding   = 0x8893
  export const ARRAY         : BufferBinding   = 0x8892

  export const ALL           : BufferBinding[] = [
    ELEMENT_ARRAY,
    ARRAY
  ]

  /**
  * Stringify the given constant.
  *
  * @param value - A constant.
  *
  * @return The label associated with the given constant.
  */
  export function toString (value : BufferBinding) : string {
    switch (value) {
      case ELEMENT_ARRAY : return 'ELEMENT_ARRAY'
      case ARRAY         : return 'ARRAY'
      default           : return undefined
    }
  }
}
