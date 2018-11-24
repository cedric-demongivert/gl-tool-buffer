import { GLContext } from '@cedric-demongivert/gl-tool-core'

export const STATIC_DRAW = 0
export const STATIC_READ = 1
export const STATIC_COPY = 2

export const DYNAMIC_DRAW = 3
export const DYNAMIC_READ = 4
export const DYNAMIC_COPY = 5

export const STREAM_DRAW = 6
export const STREAM_READ = 7
export const STREAM_COPY = 8

/**
* Return the label of the given constant.
*
* @param {number} value - A constant.
* @return {string} The label associated with the given constant.
*/
export function toString (value) {
  switch (value) {
    case STATIC_DRAW: return 'STATIC_DRAW'
    case STATIC_READ: return 'STATIC_READ'
    case STATIC_COPY: return 'STATIC_COPY'
    case STREAM_DRAW: return 'STREAM_DRAW'
    case STREAM_READ: return 'STREAM_READ'
    case STREAM_COPY: return 'STREAM_COPY'
    case DYNAMIC_DRAW: return 'DYNAMIC_DRAW'
    case DYNAMIC_READ: return 'DYNAMIC_READ'
    case DYNAMIC_COPY: return 'DYNAMIC_COPY'
  }

  throw new Error(`'${value}' is not a valid BufferUsage constant.`)
}

/**
* contextualise the given constant.
*
* @param {GLContext|WebGLRenderingContext} context - A context.
* @param {number} value - A constant.
* @return {GLEnum} The associated constant in the given context.
*/
export function contextualise (context, value) {
  const rawContext = GLContext.of(context).context

  switch (value) {
    case STATIC_DRAW: return rawContext.STATIC_DRAW
    case STATIC_READ: return rawContext.STATIC_READ
    case STATIC_COPY: return rawContext.STATIC_COPY
    case STREAM_DRAW: return rawContext.STREAM_DRAW
    case STREAM_READ: return rawContext.STREAM_READ
    case STREAM_COPY: return rawContext.STREAM_COPY
    case DYNAMIC_DRAW: return rawContext.DYNAMIC_DRAW
    case DYNAMIC_READ: return rawContext.DYNAMIC_READ
    case DYNAMIC_COPY: return rawContext.DYNAMIC_COPY
  }

  throw new Error(`'${value}' is not a valid BufferUsage constant.`)
}
