/** eslint-env jest */

import { BufferUsage } from '@library'
import { createWebGLContext } from './createWebGLContext'

describe('BufferUsage', function () {
  describe('#toString', function () {
    it('return the label associated with the given value', function () {
      for (const key of [
        'STATIC_DRAW',
        'STATIC_READ',
        'STATIC_COPY',
        'DYNAMIC_DRAW',
        'DYNAMIC_READ',
        'DYNAMIC_COPY',
        'STREAM_DRAW',
        'STREAM_READ',
        'STREAM_COPY'
      ]) {
        expect(BufferUsage.toString(BufferUsage[key])).toBe(key)
      }
    })

    it('throw an error if an invalid constant was passed', function () {
      expect(_ => BufferUsage.toString('pwet')).toThrow()
    })
  })

  describe('#contextualise', function () {
    it('return the contextualized constant for the given context', function () {
      const context = createWebGLContext(jest)

      for (const key of [
        'STATIC_DRAW',
        'STATIC_READ',
        'STATIC_COPY',
        'DYNAMIC_DRAW',
        'DYNAMIC_READ',
        'DYNAMIC_COPY',
        'STREAM_DRAW',
        'STREAM_READ',
        'STREAM_COPY'
      ]) {
        expect(
          BufferUsage.contextualise(context, BufferUsage[key])
        ).toBe(context[key])
      }
    })
  })
})
