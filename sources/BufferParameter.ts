export type BufferParameter = number

export namespace BufferParameter {
  export const ELEMENT_ARRAY_BINDING : BufferParameter = 0x8895
  export const ARRAY_BINDING         : BufferParameter = 0x8894

  export const ALL                   : BufferParameter[] = [
    ELEMENT_ARRAY_BINDING,
    ARRAY_BINDING
  ]

  /**
  * Stringify the given constant.
  *
  * @param value - A constant.
  *
  * @return The label associated with the given constant.
  */
  export function toString (value : BufferParameter) : string {
    switch (value) {
      case ELEMENT_ARRAY_BINDING : return 'ELEMENT_ARRAY_BINDING'
      case ARRAY_BINDING         : return 'ARRAY_BINDING'
      default                    : return undefined
    }
  }
}
