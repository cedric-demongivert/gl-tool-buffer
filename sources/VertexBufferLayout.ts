export type VertexBufferLayout = number

export namespace VertexBufferLayout {
  export const INTERLEAVED : VertexBufferLayout = 0
  export const GROUPED : VertexBufferLayout = 1

  export const DEFAULT : VertexBufferLayout = INTERLEAVED

  export const ALL : VertexBufferLayout[] = [
    INTERLEAVED,
    GROUPED
  ]

  export function toString (value : VertexBufferLayout) : string {
    switch (value) {
      case INTERLEAVED : return 'INTERLEAVED'
      case GROUPED     : return 'GROUPED'
      default          : return undefined
    }
  }
}
