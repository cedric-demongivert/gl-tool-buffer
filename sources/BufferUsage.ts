export type BufferUsage = GLenum

export namespace BufferUsage {
  export const STATIC_DRAW  : BufferUsage   = 0x88E4
  export const STATIC_READ  : BufferUsage   = 0x88E5
  export const STATIC_COPY  : BufferUsage   = 0x88E6
  export const DYNAMIC_DRAW : BufferUsage   = 0x88E8
  export const DYNAMIC_READ : BufferUsage   = 0x88E9
  export const DYNAMIC_COPY : BufferUsage   = 0x88EA
  export const STREAM_DRAW  : BufferUsage   = 0x88E0
  export const STREAM_READ  : BufferUsage   = 0x88E1
  export const STREAM_COPY  : BufferUsage   = 0x88E2 

  export const ALL          : BufferUsage[] = [
    STATIC_DRAW, STATIC_READ, STATIC_COPY,
    DYNAMIC_DRAW, DYNAMIC_READ, DYNAMIC_COPY,
    STREAM_DRAW, STREAM_READ, STREAM_COPY
  ]

  /**
  * Stringify the given constant.
  *
  * @param value - A constant.
  *
  * @return The label associated with the given constant.
  */
  export function toString (value : BufferUsage) : string {
    switch (value) {
      case STATIC_DRAW  : return 'STATIC_DRAW'
      case STATIC_READ  : return 'STATIC_READ'
      case STATIC_COPY  : return 'STATIC_COPY'
      case STREAM_DRAW  : return 'STREAM_DRAW'
      case STREAM_READ  : return 'STREAM_READ'
      case STREAM_COPY  : return 'STREAM_COPY'
      case DYNAMIC_DRAW : return 'DYNAMIC_DRAW'
      case DYNAMIC_READ : return 'DYNAMIC_READ'
      case DYNAMIC_COPY : return 'DYNAMIC_COPY'
      default           : return undefined
    }
  }
}
