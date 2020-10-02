import { BufferType } from '../BufferType'

export type WebGLBufferBinding = number

export namespace WebGLBufferBinding {
  export const ELEMENT_ARRAY             : WebGLBufferBinding = 0x8893
  export const ARRAY                     : WebGLBufferBinding = 0x8892
  export const COPY_READ_BUFFER          : WebGLBufferBinding = 0x8F36
  export const COPY_WRITE_BUFFER         : WebGLBufferBinding = 0x8F37
  export const TRANSFORM_FEEDBACK_BUFFER : WebGLBufferBinding = 0x8C8E
  export const UNIFORM_BUFFER            : WebGLBufferBinding = 0x8A11
  export const PIXEL_PACK_BUFFER         : WebGLBufferBinding = 0x88EB
  export const PIXEL_UNPACK_BUFFER       : WebGLBufferBinding = 0x88EC

  export const ALL                       : WebGLBufferBinding[] = [
    ELEMENT_ARRAY,
    ARRAY,
    COPY_READ_BUFFER,
    COPY_WRITE_BUFFER,
    TRANSFORM_FEEDBACK_BUFFER,
    UNIFORM_BUFFER,
    PIXEL_PACK_BUFFER,
    PIXEL_UNPACK_BUFFER
  ]

  /**
  * Stringify the given constant.
  *
  * @param value - A constant.
  *
  * @return The label associated with the given constant.
  */
  export function toString (value : WebGLBufferBinding) : string {
    switch (value) {
      case ELEMENT_ARRAY             : return 'ELEMENT_ARRAY'
      case ARRAY                     : return 'ARRAY'
      case COPY_READ_BUFFER          : return 'COPY_READ_BUFFER'
      case COPY_WRITE_BUFFER         : return 'COPY_WRITE_BUFFER'
      case TRANSFORM_FEEDBACK_BUFFER : return 'TRANSFORM_FEEDBACK_BUFFER'
      case UNIFORM_BUFFER            : return 'UNIFORM_BUFFER'
      case PIXEL_PACK_BUFFER         : return 'PIXEL_PACK_BUFFER'
      case PIXEL_UNPACK_BUFFER       : return 'PIXEL_UNPACK_BUFFER'
      default                        : return undefined
    }
  }

  export function fromType (value : BufferType) : WebGLBufferBinding {
    switch (value) {
      case BufferType.VERTEX : return ARRAY
      case BufferType.INDEX  : return ELEMENT_ARRAY
      default                :
        throw new Error(
          'Unable to map buffer type #' + value + ' "' +
          BufferType.toString(value) + '" to a WebGLBufferBinding because no ' +
          'mapping exists for the given type.'
        )
    }
  }
}
