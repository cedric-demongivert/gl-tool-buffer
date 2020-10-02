export type BufferType = number

export namespace BufferType {
  export const VERTEX : BufferType = 0
  export const INDEX : BufferType = 1

  export const DEFAULT : BufferType = VERTEX

  export const ALL : BufferType[] = [
    VERTEX, INDEX
  ]

  export function toString (value : BufferType) : string {
    switch (value) {
      case VERTEX : return 'VERTEX'
      case INDEX  : return 'INDEX'
      default     : return undefined
    }
  }
}
