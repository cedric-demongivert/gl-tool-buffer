import { GLContext } from '@cedric-demongivert/gl-tool-core'

export const BYTE = 0
export const UNSIGNED_BYTE = 1
export const INT = 2
export const INT_VEC2 = 3
export const INT_VEC3 = 4
export const INT_VEC4 = 5
export const UNSIGNED_INT = 6
export const SHORT = 7
export const FLOAT = 8
export const FLOAT_VEC2 = 9
export const FLOAT_VEC3 = 10
export const FLOAT_VEC4 = 11
export const FLOAT_MAT2 = 12
export const FLOAT_MAT3 = 13
export const FLOAT_MAT4 = 14

/**
* Return the label of the given constant.
*
* @param {VertexFieldType} type - A constant.
* @return {string} The label associated with the given constant.
*/
export function toString (type) {
  switch (type) {
    case BYTE: return 'BYTE'
    case UNSIGNED_BYTE: return 'UNSIGNED_BYTE'
    case INT: return 'INT'
    case INT_VEC2: return 'INT_VEC2'
    case INT_VEC3: return 'INT_VEC3'
    case INT_VEC4: return 'INT_VEC4'
    case UNSIGNED_INT: return 'UNSIGNED_INT'
    case SHORT: return 'SHORT'
    case FLOAT: return 'FLOAT'
    case FLOAT_VEC2: return 'FLOAT_VEC2'
    case FLOAT_VEC3: return 'FLOAT_VEC3'
    case FLOAT_VEC4: return 'FLOAT_VEC4'
    case FLOAT_MAT2: return 'FLOAT_MAT2'
    case FLOAT_MAT3: return 'FLOAT_MAT3'
    case FLOAT_MAT4: return 'FLOAT_MAT4'
  }

  throw new Error(`'${type}' is not a valid VertexFieldType constant.`)
}

/**
* Return the size of the given type in byte.
*
* @param {VertexFieldType} type - A constant.
* @return {number} The size of an object of the given type in byte.
*/
export function sizeof (type) {
  switch (type) {
    case BYTE: return Int8Array.BYTES_PER_ELEMENT
    case UNSIGNED_BYTE: return Uint8Array.BYTES_PER_ELEMENT
    case INT: return Int32Array.BYTES_PER_ELEMENT
    case INT_VEC2: return Int32Array.BYTES_PER_ELEMENT * 2
    case INT_VEC3: return Int32Array.BYTES_PER_ELEMENT * 3
    case INT_VEC4: return Int32Array.BYTES_PER_ELEMENT * 4
    case UNSIGNED_INT: return Uint32Array.BYTES_PER_ELEMENT
    case SHORT: return Int16Array.BYTES_PER_ELEMENT
    case FLOAT: return Float32Array.BYTES_PER_ELEMENT
    case FLOAT_VEC2: return Float32Array.BYTES_PER_ELEMENT * 2
    case FLOAT_VEC3: return Float32Array.BYTES_PER_ELEMENT * 3
    case FLOAT_VEC4: return Float32Array.BYTES_PER_ELEMENT * 4
    case FLOAT_MAT2: return Float32Array.BYTES_PER_ELEMENT * 4
    case FLOAT_MAT3: return Float32Array.BYTES_PER_ELEMENT * 9
    case FLOAT_MAT4: return Float32Array.BYTES_PER_ELEMENT * 16
  }

  throw new Error(`'${type}' is not a valid VertexFieldType constant.`)
}

/**
* contextualise the given constant.
*
* @param {GLContext|WebGLRenderingContext} context - A context.
* @param {VertexFieldType} type - A constant.
* @return {GLEnum} The associated constant in the given context.
*/
export function contextualise (context, type) {
  const rawContext = GLContext.of(context).context

  switch (type) {
    case BYTE: return rawContext.BYTE
    case UNSIGNED_BYTE: return rawContext.UNSIGNED_BYTE
    case INT: return rawContext.INT
    case INT_VEC2: return rawContext.INT_VEC2
    case INT_VEC3: return rawContext.INT_VEC3
    case INT_VEC4: return rawContext.INT_VEC4
    case UNSIGNED_INT: return rawContext.UNSIGNED_INT
    case SHORT: return rawContext.SHORT
    case FLOAT: return rawContext.FLOAT
    case FLOAT_VEC2: return rawContext.FLOAT_VEC2
    case FLOAT_VEC3: return rawContext.FLOAT_VEC3
    case FLOAT_VEC4: return rawContext.FLOAT_VEC4
    case FLOAT_MAT2: return rawContext.FLOAT_MAT2
    case FLOAT_MAT3: return rawContext.FLOAT_MAT3
    case FLOAT_MAT4: return rawContext.FLOAT_MAT4
  }

  throw new Error(`'${type}' is not a valid VertexFieldType constant.`)
}
